import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { ResourceService } from "./ResourceService";
import toast from "react-hot-toast";
import { Specification, ResourceSummary } from "../types";
import { StackReferenceArgs } from "@pulumi/pulumi";

const simpleToast = (bgColor: string) => (message: string) => {
    toast.custom((t) => {
        return (
            <div
                className={`${bgColor} shadow-lg mx-auto w-96 max-w-full text-sm pointer-events-auto bg-clip-padding rounded-lg block mb-3`}
                id="static-example"
                role="alert"
                aria-live="assertive"
                aria-atomic="true"
                data-mdb-autohide="false"
            >
                <div className={`p-3 ${bgColor} rounded-lg break-words text-white`}>
                    {message}
                </div>
            </div>
        );
    });
};

const infoToast = (message: string) => simpleToast("bg-blue-600")(message);
const successToast = (message: string) => simpleToast("bg-green-600")(message);
const errorToast = (message: string) => simpleToast("bg-red-600")(message);

export interface ResourceController<T extends Specification> {
    resource: T;
    setResource: (resource: T) => void;
    setValue: (key: string, value: any) => void;
    saveResource: () => Promise<void>;
    resources: ResourceSummary[];
    deleteResource: (stackName: string) => Promise<void>;
    resourcesAreLoading: boolean;
    isSaving: boolean;
    isDeleting: { [stackName: string]: boolean };
}

export function useResourceController<TSpec extends Specification>(
    defaultResource: TSpec,
    resourceService: ResourceService<TSpec>,
    resourceName: string
) {
    const [resource, setResource] = useState(defaultResource);
    const [isSaving, setIsSaving] = useState(false);
    const [isDeleting, setIsDeleting] = useState<{ [stackName: string]: boolean }>({});
    const [resourceGroups, setResourceGroups] = useState<ResourceSummary[]>([]);
    const queryClient = useQueryClient();
    const getResourcesQueryName = `get-${resourceName}`;
    const { isLoading } = useQuery(
        getResourcesQueryName,
        () => {
            return resourceService.getResources();
        }, {
            onSuccess: (data) => {
                setResourceGroups(data);
            }
        }
    );
    const saveResourceMutation = useMutation(
        (specification: TSpec) => {
            infoToast("Saving...");
            setIsSaving(true);
            return resourceService.saveResource(specification);
        },
        {
            onSuccess: async (data) => {
                console.log("Saved: ", data);
                setResource(defaultResource);
                await queryClient.invalidateQueries(getResourcesQueryName);
                successToast("Saved!")
            },
            onError: (error) => {
                console.log("Error: ", error);
                errorToast("Error saving resource");
            },
            onSettled: () => {
                setIsSaving(false);
            }
        }
    );
    const setValue = (key: string, value: any) => {
        if (key === "name") {
            setResource((resource) => ({
                ...resource,
                [key]: value,
                stackName: value,
            }));
        } else {
            setResource((resource) => ({
                ...resource,
                [key]: value,
            }));
        }
    };
    const handleDelete = async (stackName: string) => {
        infoToast(`Deleting ${stackName}...`);
        try {
            setIsDeleting((isDeleting) => ({...isDeleting, [stackName]: true}));
            await resourceService.deleteResource(stackName);
            successToast(`Deleted ${stackName}`);
            setResourceGroups((resources) => [...resources.filter((r) => r.stackName !== stackName)]);
        }
        catch (e)
        {
            console.log("Delete error: ", e);
            errorToast(`Error deleting ${stackName}`);
        }
        finally {
            setIsDeleting((isDeleting) => ({
                ...isDeleting,
                [stackName]: false,
            }));
        }
    };

    return {
        resource,
        setResource,
        setValue,
        resources: resourceGroups || [],
        resourcesAreLoading: isLoading,
        deleteResource: handleDelete,
        isDeleting: isDeleting,
        saveResource: async (evt: React.FormEvent<HTMLFormElement>) => {
            evt.preventDefault();
            await saveResourceMutation.mutateAsync(resource);
            setResource(defaultResource);
        },
        isSaving: isSaving,
    } as ResourceController<TSpec>;
}

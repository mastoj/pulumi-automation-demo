import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { ResourceSummary, Specification } from "../common/types";
import { ResourceService } from "./ResourceService";
import toast from "react-hot-toast";

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

const savingToast = () => simpleToast("bg-blue-600")("Saving...");
const successToast = (message: string) => simpleToast("bg-green-600")(message);

export interface ResourceController<T extends Specification> {
    resource: T;
    setResource: (resource: T) => void;
    setValue: (key: string, value: any) => void;
    saveResource: () => Promise<void>;
    resources: ResourceSummary[];
    deleteResource: (stackName: string) => Promise<void>;
    resourcesAreLoading: boolean;
    isSaving: boolean;
}

export function useResourceController<TSpec extends Specification>(
    defaultResource: TSpec,
    resourceService: ResourceService<TSpec>,
    resourceName: string
) {
    const [resource, setResource] = useState(defaultResource);
    const [isSaving, setIsSaving] = useState(false);
    const queryClient = useQueryClient();
    const getResourcesQueryName = `get-${resourceName}`;
    const { isLoading, data: resourceGroups } = useQuery(
        getResourcesQueryName,
        () => {
            return resourceService.getResources();
        }
    );
    const saveResourceMutation = useMutation(
        (specification: TSpec) => {
            savingToast();
            setIsSaving(true);
            return resourceService.saveResource(specification);
        },
        {
            onSuccess: (data) => {
                console.log("Saved: ", data);
                setResource(defaultResource);
                setIsSaving(false);
                queryClient.invalidateQueries(getResourcesQueryName);
                successToast("Saved!")
            },
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
    return {
        resource,
        setResource,
        setValue,
        resources: resourceGroups || [],
        resourcesAreLoading: isLoading,
        deleteResource: resourceService.deleteResource,
        saveResource: async (evt: React.FormEvent<HTMLFormElement>) => {
            evt.preventDefault();
            await saveResourceMutation.mutateAsync(resource);
            setResource(defaultResource);
        },
        isSaving: isSaving,
    } as ResourceController<TSpec>;
}

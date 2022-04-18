import { useContext, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { ResourceGroupService } from "./ResourceGroupService";
import { ResourceGroupSpecification, ResourceSummary } from "./types";

export interface ResourceGroupController {
    resource: ResourceGroupSpecification;
    setResource: (resource: ResourceGroupSpecification) => void;
    saveResource: () => Promise<void>;
    resources: ResourceSummary[];
    deleteResource: (stackName: string) => Promise<void>;
    resourceGroupsIsLoading: boolean;
}

const defaultResource: ResourceGroupSpecification = {
    name: "",
    stackName: "",
};

export const useResourceGroupController = () => {
    const [resource, setResource] = useState(defaultResource);
    const resourceGroupService = useContext(ResourceGroupService);
    const queryClient = useQueryClient();
    const { isLoading, data: resourceGroups } = useQuery(
        "get-resourceGroups",
        () => {
            return resourceGroupService.getResources();
        }
    );
    const saveResourceMutation = useMutation(
        (specification: ResourceGroupSpecification) => {
            return resourceGroupService.saveResourceGroup(specification);
        },
        {
            onSuccess: (data) => {
                console.log("Saved: ", data);
                setResource(defaultResource);
                queryClient.invalidateQueries("get-resourceGroups");
            },
        }
    );
    return {
        resource,
        setResource,
        resources: resourceGroups || [],
        resourceGroupsIsLoading: isLoading,
        deleteResource: resourceGroupService.deleteResource,
        saveResource: async (evt: React.FormEvent<HTMLFormElement>) => {
            evt.preventDefault();
            await saveResourceMutation.mutateAsync(resource);
            setResource(defaultResource);
        },
    } as ResourceGroupController;
};

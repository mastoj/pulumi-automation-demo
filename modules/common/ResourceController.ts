import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { ResourceSummary, Specification } from "../common/types";
import { ResourceService } from "./ResourceService";

export interface ResourceController<T extends Specification> {
    resource: T;
    setResource: (resource: T) => void;
    setValue: (key: string, value: any) => void;
    saveResource: () => Promise<void>;
    resources: ResourceSummary[];
    deleteResource: (stackName: string) => Promise<void>;
    resourcesAreLoading: boolean;
}

export function useResourceController<TSpec extends Specification>(
    defaultResource: TSpec,
    resourceService: ResourceService<TSpec>,
    resourceName: string
    ) {
        const [resource, setResource] = useState(defaultResource);
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
                return resourceService.saveResource(specification);
            },
            {
                onSuccess: (data) => {
                    console.log("Saved: ", data);
                    setResource(defaultResource);
                    queryClient.invalidateQueries(getResourcesQueryName);
                },
            }
        );
        const setValue = (key: string, value: any) => {
            if(key === "name") {
                setResource(resource => ({
                    ...resource,
                    [key]: value,
                    stackName: value
                }));
            }
            else {
                setResource(resource => ({
                    ...resource,
                    [key]: value
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
        } as ResourceController<TSpec>;    
};

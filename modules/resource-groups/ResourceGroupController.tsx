import { useState } from "react";
import { useQuery } from "react-query";
import { ResourceGroupService } from "./ResourceGroupService";
import { ResourceSummary } from "./types";

export interface ResourceGroupController {
    resourceGroups: ResourceSummary[];
    resourceGroupsIsLoading: boolean;
}

export const useResourceGroupController = (resourceGroupService: ResourceGroupService) => {
    const {isLoading, data: resourceGroups} = useQuery('get-resourceGroups', () => {
        return resourceGroupService.getResources();
    });
    return {
        resourceGroups: resourceGroups || [],
        resourceGroupsIsLoading: isLoading
    } as ResourceGroupController; 
}
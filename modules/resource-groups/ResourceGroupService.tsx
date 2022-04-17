import React from "react";
import { ResourceService } from "../common/ResourceService";
import { ResourceGroupSpecification } from "./types";
import axios from "axios";

export interface ResourceGroupService extends ResourceService {
    saveResourceGroup: (resourceGroup: ResourceGroupSpecification) => Promise<void>;
};

const controller: ResourceGroupService = {
    getResources: async () => {
        const response = await axios.get("/api/resource-groups");
        return response.data;
    },
    saveResourceGroup: async (resourceGroup: ResourceGroupSpecification) => {
        console.log("Saving: ", resourceGroup);
    },
    deleteResource: async (stackName: string) => {
        console.log("Deleting: ", stackName);
    }
};

export const ResourceGroupService = React.createContext(controller);

export interface ResourceGroupProviderProps {
    children: React.ReactNode;
}
export const ResourceGroupProvider = ({ children }: ResourceGroupProviderProps) => {
    return (
        <ResourceService.Provider value={controller}>
            <ResourceGroupService.Provider value={controller}>
                {children}
            </ResourceGroupService.Provider>
        </ResourceService.Provider>
    )
};
import React from "react";
import { ResourceController } from "../common/ResourceController";
import { ResourceGroupSpecification } from "./types";

export interface ResourceGroupController extends ResourceController {
    saveResourceGroup: (resourceGroup: ResourceGroupSpecification) => Promise<void>;
};

const controller: ResourceGroupController = {
    getResources: async () => {
        return [
            {
                name: "tomas",
                stackName: "tomas",
                resourceCount: 100,
            },
        ];
    },
    saveResourceGroup: async (resourceGroup: ResourceGroupSpecification) => {
        console.log("Saving: ", resourceGroup);
    },
    deleteResource: async (stackName: string) => {
        console.log("Deleting: ", stackName);
    }
};

export const ResourceGroupController = React.createContext(controller);

export interface ResourceGroupProviderProps {
    children: React.ReactNode;
}
export const ResourceGroupProvider = ({ children }: ResourceGroupProviderProps) => {
    return (
        <ResourceController.Provider value={controller}>
            <ResourceGroupController.Provider value={controller}>
                {children}
            </ResourceGroupController.Provider>
        </ResourceController.Provider>
    )
};
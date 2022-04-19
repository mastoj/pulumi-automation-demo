import React from "react";
import { createService, ResourceService } from "../../common/ResourceService";
import { ResourceGroupSpecification } from "../common/types";

export interface ResourceGroupService extends ResourceService<ResourceGroupSpecification> {};

const controller: ResourceGroupService = createService<ResourceGroupSpecification>("resource-groups");

export const ResourceGroupService = React.createContext(controller);

export interface ResourceGroupProviderProps {
    children: React.ReactNode;
};

export const ResourceGroupProvider = ({ children }: ResourceGroupProviderProps) => {
    return (
        <ResourceGroupService.Provider value={controller}>
            {children}
        </ResourceGroupService.Provider>
    );
};
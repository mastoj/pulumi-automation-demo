import React from "react";
import { ResourceService, createService } from "../../common/client/ResourceService";
import { ResourceGroupSpecification } from "../common/types";

export interface ResourceGroupService extends ResourceService<ResourceGroupSpecification> {};

const service: ResourceGroupService = createService<ResourceGroupSpecification>("resource-groups");

export const ResourceGroupService = React.createContext(service);

export interface ResourceGroupProviderProps {
    children: React.ReactNode;
};

export const ResourceGroupProvider = ({ children }: ResourceGroupProviderProps) => {
    return (
        <ResourceGroupService.Provider value={service}>
            {children}
        </ResourceGroupService.Provider>
    );
};
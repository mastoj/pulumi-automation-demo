import React from "react";
import { createService, ResourceService } from "../../common/client/ResourceService";
import { RepositorySpecification } from "../common/types";

export interface RepositoryService extends ResourceService<RepositorySpecification> {};

const service: RepositoryService = createService<RepositorySpecification>("repositories");

export const RepositoryService = React.createContext(service);

export interface RepositoryProviderProps {
    children: React.ReactNode;
};

export const RepositoryProvider = ({ children }: RepositoryProviderProps) => {
    return (
        <RepositoryService.Provider value={service}>
            {children}
        </RepositoryService.Provider>
    );
};
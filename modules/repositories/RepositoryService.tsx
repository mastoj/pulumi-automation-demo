import React from "react";
import { createService, ResourceService } from "../common/ResourceService";
import { RepositorySpecification } from "./types";

export interface RepositoryService extends ResourceService<RepositorySpecification> {};

const controller: RepositoryService = createService<RepositorySpecification>("resource-groups");

export const RepositoryService = React.createContext(controller);

export interface RepositoryProviderProps {
    children: React.ReactNode;
};

export const RepositoryProvider = ({ children }: RepositoryProviderProps) => {
    return (
        <RepositoryService.Provider value={controller}>
            {children}
        </RepositoryService.Provider>
    );
};
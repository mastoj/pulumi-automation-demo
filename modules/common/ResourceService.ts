import React from "react";
import { ResourceSummary } from "../resource-groups/types";

export interface ResourceService {
    getResources: () => Promise<ResourceSummary[]>;
    deleteResource: (stackName: string) => Promise<void>;
}

export const ResourceService = React.createContext({} as ResourceService);
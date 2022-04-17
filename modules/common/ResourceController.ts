import React from "react";
import { ResourceSummary } from "../resource-groups/types";

export interface ResourceController {
    getResources: () => Promise<ResourceSummary[]>;
    deleteResource: (stackName: string) => Promise<void>;
}

export const ResourceController = React.createContext({} as ResourceController);
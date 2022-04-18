import axios from "axios";
import { ResourceSummary, Specification } from "./types";

export interface ResourceService<T extends Specification> {
    getResources: () => Promise<ResourceSummary[]>;
    deleteResource: (stackName: string) => Promise<void>;
    saveResource: (resource: T) => Promise<void>;
}

export function createService<T extends Specification>(relativeLocation: string):ResourceService<T> {
    const baseLocation = `/api/${relativeLocation}`;
    return {
        getResources: async () => {
            const response = await axios.get(baseLocation);
            return response.data;
        },
        saveResource: async (resource: T) => {
            const response = await axios.post(baseLocation, resource);
            return response.data;
        },
        deleteResource: async (stackName: string) => {
            const response = await axios.delete(`${baseLocation}/${stackName}`);
        }
    }
}
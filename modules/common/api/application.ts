import { Specification, ResourceSummary } from "../types";
import { createResourceHandler } from "./resourceHandler";
import { createRepository } from "../../repositories/api/createRepository";
import { createResourceGroup } from "../../resource-groups/api/createResourceGroup";

export interface Application {
    createResource: (resourceName: string, spec: Specification) => Promise<void>;
    deleteResource: (resourceName: string, stackName: string) => Promise<void>;
    getResources: (resourceName: string) => Promise<ResourceSummary[]>;
}

export const createApplication = (): Application => {
    const resourceHandlerMap: { [key: string]: any } = {
        repositories: createResourceHandler("pu-repositories", createRepository),
        "resource-groups": createResourceHandler("pu-resourceGroups", createResourceGroup),
    };
    
    const getResourceHandler = (resourceName: string) => {
        const handler = resourceHandlerMap[resourceName];
        if (!handler) {
            throw new Error(`Unknown resource: ${resourceName}`);
        }
        return handler;
    };

    const createResource = async (resourceName: string, spec: Specification) => {
        const handler = getResourceHandler(resourceName);
        await handler.saveResource(spec);
    };
    const deleteResource = async (resourceName: string, stackName: string) => {
        const handler = getResourceHandler(resourceName);
        await handler.deleteResource(stackName);
    }
    const getResources = async (resourceName: string) => {
        const handler = getResourceHandler(resourceName);
        return handler.getResources();
    }
    return {
        createResource,
        deleteResource,
        getResources,
    }
}

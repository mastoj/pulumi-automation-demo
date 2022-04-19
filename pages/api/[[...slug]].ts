// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { ResourceSummary, Specification } from "../../modules/common/types";
import { RepositorySpecification } from "../../modules/repositories/common/types";
import { ResourceGroupSpecification } from "../../modules/resource-groups/common/types";
import { LocalWorkspace, PulumiFn } from "@pulumi/pulumi/automation";
import { ResourceGroup } from "@pulumi/azure-native/resources";

interface ResourceHandler<TSpec extends Specification> {
    saveResource: (spec: TSpec) => Promise<void>;
    deleteResource: (stackName: string) => Promise<void>;
    getResources: () => Promise<ResourceSummary[]>;
}

function createResourceHandler<TSpec extends Specification>(
    projectName: string,
    program: (spec: TSpec) => PulumiFn
): ResourceHandler<TSpec> {
    const saveResource = async (spec: TSpec) => {
        try {
            console.info("==> Creating: ", spec.stackName, spec);
            const stack = await LocalWorkspace.createOrSelectStack({
                stackName: spec.stackName,
                projectName: projectName,
                program: program(spec),
            });
            const result = await stack.up({ onOutput: console.info });
            console.info("==> Created: ", spec, result);
        } catch (e) {
            console.error("==> Failed to create: ", JSON.stringify(spec), e);
            throw e;
        }
    };
    const deleteResource = async (stackName: string) => {
        const stack = await LocalWorkspace.selectStack({
            stackName: stackName,
            projectName: projectName,
            program: async () => {},
        });
        try {
            console.log("==> Destroying stack: ", stackName);
            const destroyRes = await stack.destroy();
            console.log("==> Deleting stack: ", stackName);
            const ws = await LocalWorkspace.create({
                projectSettings: { name: projectName, runtime: "nodejs" },
            });
            ws.removeStack(stackName);
        } catch (e) {
            console.error("==> Error: " + JSON.stringify(e));
            throw e;
        }
    };

    const getResources = async () => {
        try {
            const ws = await LocalWorkspace.create({ projectSettings: { name: projectName, runtime: "nodejs" }});
            const stacks = await ws.listStacks();
            const response = stacks.map<ResourceSummary>(s => (
                {stackName: s.name.split("/")[0], resourceCount: s.resourceCount}));
            return response;
        } catch(e) {
            console.error("List resources error", e);
            throw e;
        }
    };
    return {
        saveResource, getResources, deleteResource
    };
}

const createRepository = (spec: RepositorySpecification) => {
    return async () => {
        console.log("Creating repo: ", spec);
    };
};

const createResourceGroup = (spec: ResourceGroupSpecification) => {
    return async () => {
        const resourceGroup = new ResourceGroup(spec.name, {
            location: "westeurope",
        });
        console.log("Creating resource group: ", spec);
    };
};

const resourceHandlerMap: { [key: string]: any } = {
    repositories: createResourceHandler("pu-repositories", createRepository),
    "resource-groups": createResourceHandler("pu-resourceGroups", createResourceGroup),
};

const createHandler = async (req: NextApiRequest, res: NextApiResponse) => {
        if (req.method === "POST") {
            const { slug } = req.query;
            const [route] = slug as string[];
            const resourceHandler = resourceHandlerMap[route];
            const spec = req.body;
            await resourceHandler.saveResource(spec);
            res.status(200).json(spec);
        }
        else if(req.method === "GET") {
            const { slug } = req.query;
            const [route] = slug as string[];
            console.log("==> GET: ", route);
            const resourceHandler = resourceHandlerMap[route];
            const resources = await resourceHandler.getResources();
            res.status(200).json(resources);
        }
        else if(req.method === "DELETE") {
            const { slug } = req.query;
            const [route, stack] = slug as string[];
            console.log("==> DELETE: ", route, stack);
            const resourceHandler = resourceHandlerMap[route];
            const resources = await resourceHandler.deleteResource(stack);
            res.status(200).json(resources);
        }
    };

export default createHandler;

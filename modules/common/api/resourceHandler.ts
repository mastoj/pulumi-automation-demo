import { PulumiFn, LocalWorkspace } from "@pulumi/pulumi/automation";
import { Specification, ResourceSummary } from "../types";

export interface ResourceHandler<TSpec extends Specification> {
    saveResource: (spec: TSpec) => Promise<void>;
    deleteResource: (stackName: string) => Promise<void>;
    getResources: () => Promise<ResourceSummary[]>;
}

export function createResourceHandler<TSpec extends Specification>(
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
                {stackName: s.name.split("/")[0], resourceCount: s.resourceCount, lastUpdate: s.lastUpdate != undefined ? new Date(s.lastUpdate) : undefined}
            ));
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

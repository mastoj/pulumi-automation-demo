import { PulumiFn, LocalWorkspace } from "@pulumi/pulumi/automation";
import { Specification, ResourceSummary } from "../types";

export interface ResourceHandler<TSpec extends Specification> {
    saveResource: (spec: TSpec) => Promise<void>;
    deleteResource: (stackName: string) => Promise<void>;
    getResources: () => Promise<ResourceSummary[]>;
}

export interface Program<TSpec extends Specification> {
    (spec: TSpec): Promise<Record<string, any>>
}

export function createResourceHandler<TSpec extends Specification>(
    projectName: string,
    program: Program<TSpec>
): ResourceHandler<TSpec> {
    const saveResource = async (spec: TSpec) => {
        const modifiedProgram = async () => {
            console.log("Running program for: ", spec);
            const result = await program(spec);
            return { 
                ...result,
                specification: spec 
            };
        };
        try {
            console.info("==> Creating: ", spec.stackName, spec);
            const stack = await LocalWorkspace.createOrSelectStack({
                stackName: spec.stackName,
                projectName: projectName,
                program: modifiedProgram,
            });
            const result = await stack.up({ onOutput: console.info });
            console.info("==> Created: ", spec);
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

import { ActionsSecret } from "@pulumi/github";
import { Repository } from "@pulumi/github/repository";
import { StackReference } from "@pulumi/pulumi";
import * as pulumi from "@pulumi/pulumi";
import { RepositorySpecification } from "../common/types";

export const createRepository = async (spec: RepositorySpecification) => {
    console.log("Creating repo: ", spec);
    const resourceGroupStackRef = new StackReference(`tomasja/pu-resourceGroups/${spec.resourceGroupStack}`);
    const clientId = await resourceGroupStackRef.requireOutput("clientId");
    const clientSecret = await resourceGroupStackRef.requireOutput("clientSecret");
    const resourceGroupName = await resourceGroupStackRef.requireOutput("resourceGroupName");
    const subscriptionId = await resourceGroupStackRef.requireOutput("subscriptionId");

    const repository = new Repository(spec.name, {
        name: spec.name
    });

    const createSecretName = (name: string) => name.toUpperCase().replaceAll("-", "_");
    const secretName = createSecretName(`RG_${spec.resourceGroupStack}`);
    const secretString =
        pulumi.all([clientId, clientSecret, resourceGroupName, subscriptionId])
            .apply(([clientId, clientSecret, resourceGroupName, subscriptionId]) => { 
                return JSON.stringify({
                    clientId: clientId,
                    clientSecret: clientSecret,
                    resourceGroupName: resourceGroupName,
                    subscriptionId: subscriptionId,
                })
            });

    const resourceGroupSecret = new ActionsSecret(`${spec.name}-secret`, {
        secretName: secretName,
        plaintextValue: secretString,
        repository: repository.name,
    })

    return {};
};
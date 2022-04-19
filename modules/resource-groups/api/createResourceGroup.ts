import * as pulumi from "@pulumi/pulumi";
import * as azure from "@pulumi/azure-native";
import { ResourceGroup } from "@pulumi/azure-native/resources/resourceGroup";
import { ResourceGroupSpecification } from "../common/types";
import { RandomPassword, RandomUuid } from "@pulumi/random";
import { Application, ServicePrincipal, ServicePrincipalPassword } from "@pulumi/azuread";

export const createResourceGroup = async (spec: ResourceGroupSpecification) => {
    console.log("Creating resource group: ", spec);

    const subscriptionId = (await azure.authorization.getClientConfig()).subscriptionId;
    const resourceGroup = new ResourceGroup(spec.name, {
        resourceGroupName: `pu-${spec.name}`,
        location: "westeurope",
    });
    const password = new RandomPassword("password", {
        length: 50,
    });
    const adApp = new Application("app", { displayName: resourceGroup.name });
    const adSp = new ServicePrincipal("sp", { applicationId: adApp.applicationId });
    const adSpPassword = new ServicePrincipalPassword("spPassword", {
        servicePrincipalId: adSp.id,
    });
    const resourceGroupNameUrn = resourceGroup.name.apply(name => {
        return `/subscriptions/${ subscriptionId }/resourcegroups/${ name }`;
    });

    const contributorRoleDefinitionId = `/subscriptions/${ subscriptionId }/providers/Microsoft.Authorization/roleDefinitions/b24988ac-6180-42a0-ab88-20f7382dd24c`;
    const spRoleAssignmentId = new RandomUuid("spRoleAssignmentId", undefined);
    const spRoleAssignment = new azure.authorization.RoleAssignment("spRoleAssignment", {
        principalType: "ServicePrincipal",
        roleAssignmentName: spRoleAssignmentId.result,
        principalId: adSp.id,
        roleDefinitionId: contributorRoleDefinitionId,
        scope: resourceGroupNameUrn
    }, { dependsOn: [adSp] });

    return {
        resourceGroupName: resourceGroup.name,
        clientId: adSp.applicationId,
        clientSecret: pulumi.secret(adSpPassword.value),
        subscriptionId: subscriptionId,
    };
};

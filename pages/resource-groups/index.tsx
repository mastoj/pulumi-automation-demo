import { NextPage } from "next";
import { useContext } from "react";
import { ResourcePage } from "../../modules/common/ResourcePage";
import { NewResourceGroupForm } from "../../modules/resource-groups/NewResourceGroupForm";
import { useResourceGroupController } from "../../modules/resource-groups/ResourceGroupController";
import { ResourceGroupService, ResourceGroupProvider } from "../../modules/resource-groups/ResourceGroupService";

const Index: NextPage = () => {
    const resourceGroupService = useContext(ResourceGroupService);
    const resourceGroupController = useResourceGroupController(resourceGroupService);
    console.log("ResourceGroupController: ", resourceGroupController);
    return (
        <ResourceGroupProvider>
            <ResourcePage 
                typeNamePlural="resource groups" 
                createNewResource={<NewResourceGroupForm />}
                resources={resourceGroupController.resourceGroups}
            />
        </ResourceGroupProvider>
    );
};

export default Index;

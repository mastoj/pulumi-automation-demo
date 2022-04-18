import { NextPage } from "next";
import { ResourcePage } from "../../modules/common/ResourcePage";
import { NewResourceGroupForm } from "../../modules/resource-groups/NewResourceGroupForm";
import { useResourceGroupController } from "../../modules/resource-groups/ResourceGroupController";
import { ResourceGroupProvider } from "../../modules/resource-groups/ResourceGroupService";

const Index: NextPage = () => {
    const resourceGroupController = useResourceGroupController();
    return (
        <ResourceGroupProvider>
            <ResourcePage 
                typeNamePlural="resource groups" 
                createNewResource={<NewResourceGroupForm {...resourceGroupController}/>}
                resources={resourceGroupController.resources}
                onDelete={resourceGroupController.deleteResource}
                onSave={resourceGroupController.saveResource}
            />
        </ResourceGroupProvider>
    );
};

export default Index;

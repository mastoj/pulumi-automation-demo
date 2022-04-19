import { NextPage } from "next";
import { ResourcePage } from "../../modules/common/client/ResourcePage";
import { NewResourceGroupForm } from "../../modules/resource-groups/client/NewResourceGroupForm";
import { useResourceGroupController } from "../../modules/resource-groups/client/ResourceGroupController";
import { ResourceGroupProvider } from "../../modules/resource-groups/client/ResourceGroupService";

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
                isSaving={resourceGroupController.isSaving}
                isDeleting={resourceGroupController.isDeleting}
            />
        </ResourceGroupProvider>
    );
};

export default Index;

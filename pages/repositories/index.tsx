import { NextPage } from "next";
import { ResourcePage } from "../../modules/common/client/ResourcePage";
import { NewRepositoryForm } from "../../modules/repositories/client/NewRepositoryForm";
import { useRepositoryController } from "../../modules/repositories/client/RepositoryController";
import { RepositoryProvider } from "../../modules/repositories/client/RepositoryService";
import { useResourceGroupController } from "../../modules/resource-groups/client/ResourceGroupController";

const Index: NextPage = () => {
    const repositoriesController = useRepositoryController();
    const resourceGroupController = useResourceGroupController();
    const formController = {...repositoriesController, resourceGroups: resourceGroupController.resources};
    return (
        <RepositoryProvider>
            <ResourcePage 
                typeNamePlural="repositories" 
                createNewResource={
                    <NewRepositoryForm {...formController} />
                }
                resources={repositoriesController.resources}
                onDelete={repositoriesController.deleteResource}
                onSave={repositoriesController.saveResource}
                isSaving={repositoriesController.isSaving}
                isDeleting={repositoriesController.isDeleting}
            />
        </RepositoryProvider>
    );
};

export default Index;

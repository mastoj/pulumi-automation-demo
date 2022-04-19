import { NextPage } from "next";
import { ResourcePage } from "../../modules/common/ResourcePage";
import { NewRepositoryForm } from "../../modules/repositories/client/NewRepositoryForm";
import { useRepositoryController } from "../../modules/repositories/client/RepositoryController";
import { RepositoryProvider } from "../../modules/repositories/client/RepositoryService";
import { useResourceGroupController } from "../../modules/resource-groups/client/ResourceGroupController";

const Index: NextPage = () => {
    const repositoriesController = useRepositoryController();
    const resourceGroupController = useResourceGroupController();
    return (
        <RepositoryProvider>
            <ResourcePage 
                typeNamePlural="repositories" 
                createNewResource={
                    <NewRepositoryForm 
                        setValue={repositoriesController.setValue}
                        resource={repositoriesController.resource}
                        resourceGroups={resourceGroupController.resources}
                    />}
                resources={repositoriesController.resources}
                onDelete={repositoriesController.deleteResource}
                onSave={repositoriesController.saveResource}
                isSaving={repositoriesController.isSaving}
            />
        </RepositoryProvider>
    );
};

export default Index;

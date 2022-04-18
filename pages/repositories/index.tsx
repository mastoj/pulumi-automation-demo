import { NextPage } from "next";
import { ResourcePage } from "../../modules/common/ResourcePage";
import { NewRepositoryForm } from "../../modules/repositories/NewRepositoryForm";
import { useRepositoryController } from "../../modules/repositories/RepositoryController";
import { RepositoryProvider } from "../../modules/repositories/RepositoryService";
import { useResourceGroupController } from "../../modules/resource-groups/ResourceGroupController";

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
            />
        </RepositoryProvider>
    );
};

export default Index;

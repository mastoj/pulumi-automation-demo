import { NextPage } from "next";
import { ResourcePage } from "../../modules/common/ResourcePage";
import { NewRepositoryForm } from "../../modules/repositories/NewRepositoryForm";
import { ResourceGroupController, ResourceGroupProvider } from "../../modules/resource-groups/ResourceGroupController";

const Index: NextPage = () => {
    return (
        <ResourceGroupProvider>
            <ResourcePage 
                typeNamePlural="repositories" 
                createNewResource={<NewRepositoryForm />}                />
        </ResourceGroupProvider>
    );
};

export default Index;

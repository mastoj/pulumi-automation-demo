import { NextPage } from "next";
import { ResourcePage } from "../../modules/common/ResourcePage";
import { NewRepositoryForm } from "../../modules/repositories/NewRepositoryForm";
import { ResourceGroupService, ResourceGroupProvider } from "../../modules/resource-groups/ResourceGroupService";

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

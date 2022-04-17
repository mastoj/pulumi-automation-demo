import { NextPage } from "next";
import { ResourcePage } from "../../modules/common/ResourcePage";
import { NewResourceGroupForm } from "../../modules/resource-groups/NewResourceGroupForm";
import { ResourceGroupController, ResourceGroupProvider } from "../../modules/resource-groups/ResourceGroupController";

const Index: NextPage = () => {
    return (
        <ResourceGroupProvider>
            <ResourcePage 
                typeNamePlural="resource groups" 
                createNewResource={<NewResourceGroupForm />}                />
        </ResourceGroupProvider>
    );
};

export default Index;

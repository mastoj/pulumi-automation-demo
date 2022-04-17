import { NextPage } from "next";
import { ResourcePage } from "../../modules/common/ResourcePage";
import { NewResourceGroupForm } from "../../modules/resource-groups/NewResourceGroupForm";
import { ResourceGroupService, ResourceGroupProvider } from "../../modules/resource-groups/ResourceGroupService";

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

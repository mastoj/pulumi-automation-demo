import { useContext } from "react";
import { ResourceController, useResourceController } from "../common/ResourceController";
import { ResourceGroupService } from "./ResourceGroupService";
import { ResourceGroupSpecification } from "./common/types";

export interface ResourceGroupController extends ResourceController<ResourceGroupSpecification> {};

const defaultResource: ResourceGroupSpecification = {
    name: "",
    stackName: "",
};

export const useResourceGroupController = () => {
    const resourceGroupService = useContext(ResourceGroupService);
    return useResourceController<ResourceGroupSpecification>(defaultResource, resourceGroupService, "resourceGroups") as ResourceGroupController;
};

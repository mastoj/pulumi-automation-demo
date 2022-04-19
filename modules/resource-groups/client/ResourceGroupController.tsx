import { useContext } from "react";
import { ResourceController, useResourceController } from "../../common/client/ResourceController";
import { ResourceGroupSpecification } from "../common/types";
import { ResourceGroupService } from "./ResourceGroupService";

export interface ResourceGroupController extends ResourceController<ResourceGroupSpecification> {};

const defaultResource: ResourceGroupSpecification = {
    name: "",
    stackName: "",
};

export const useResourceGroupController = () => {
    const resourceGroupService = useContext(ResourceGroupService);
    return useResourceController<ResourceGroupSpecification>(defaultResource, resourceGroupService, "resourceGroups") as ResourceGroupController;
};

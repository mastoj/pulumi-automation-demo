import { useContext } from "react";
import { ResourceController, useResourceController } from "../../common/ResourceController";
import { RepositorySpecification } from "../common/types";
import { RepositoryService } from "./RepositoryService";

export interface RepositoryController extends ResourceController<RepositorySpecification> {};

const defaultResource: RepositorySpecification = {
    name: "",
    stackName: "",
    resourceGroupStack: "",
};

export const useRepositoryController = () => {
    const repositoryService = useContext(RepositoryService);
    return useResourceController<RepositorySpecification>(defaultResource, repositoryService, "repositories") as RepositoryController;
};

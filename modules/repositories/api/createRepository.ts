import { RepositorySpecification } from "../common/types";

export const createRepository = (spec: RepositorySpecification) => {
    return async () => {
        console.log("Creating repo: ", spec);
    };
};
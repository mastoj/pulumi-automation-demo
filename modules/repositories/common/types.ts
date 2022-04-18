import { Specification } from "../../common/types";

export interface RepositorySpecification extends Specification {
    name: string;
    resourceGroupStack: string;
}
export interface ResourceSummary {
    stackName: string;
    resourceCount: number;
}

export interface Specification {
    stackName: string;
}

export interface ResourceGroupSpecification extends Specification {
    name: string;
}
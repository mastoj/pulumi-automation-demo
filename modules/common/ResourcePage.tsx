import { useContext } from "react";
import { ResourceSummary } from "../resource-groups/types";
import { List } from "./List";
import { ResourceService } from "./ResourceService";

export interface ResourcePageProps {
    typeNamePlural: string;
    createNewResource: React.ReactNode;
    resources: ResourceSummary[]
}
export const ResourcePage = ({ typeNamePlural, createNewResource, resources }: ResourcePageProps) => {
    const resourceService = useContext(ResourceService);
    const handleDelete = async (stackName: string) => {
        await resourceService.deleteResource(stackName);
    };
    console.log("ResourcePage: ", { typeNamePlural, createNewResource, resources });
    return(
        <div className="flex flex-col gap-2">
            <div className="flex flex-col">
                <h2 className="text-xl font-bold">Create new</h2>
                {createNewResource}
            </div>
            <div className="flex flex-col gap-2">
                <h2 className="text-xl font-bold">Existing {typeNamePlural}</h2>
                <div className="flex flex-col">
                    <List
                        items={resources}
                        onDelete={handleDelete}
                    />
                </div>
            </div>
        </div>
    );
};


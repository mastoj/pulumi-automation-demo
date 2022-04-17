import { useContext } from "react";
import { List } from "./List";
import { ResourceController } from "./ResourceController";

export interface ResourcePageProps {
    typeNamePlural: string;
    createNewResource: React.ReactNode;
}
export const ResourcePage = ({ typeNamePlural, createNewResource }: ResourcePageProps) => {
    const controller = useContext(ResourceController);
    const handleDelete = async (stackName: string) => {
        await controller.deleteResource(stackName);
    };
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
                        items={[{ stackName: "tomas", resourceCount: 100 }]}
                        onDelete={handleDelete}
                    />
                </div>
            </div>
        </div>
    );
};

import { ResourceSummary } from "../common/types";
import { List } from "./List";
import { NewResourceForm } from "./NewResourceForm";

export interface ResourcePageProps {
    typeNamePlural: string;
    createNewResource: React.ReactNode;
    onDelete: (stackName: string) => Promise<void>;
    onSave: () => Promise<void>;
    resources: ResourceSummary[];
}
export const ResourcePage = ({
    typeNamePlural,
    createNewResource,
    resources,
    onDelete,
    onSave,
}: ResourcePageProps) => {
    return (
        <div className="flex flex-col gap-2">
            <div className="flex flex-col">
                <h2 className="text-xl font-bold">Create new</h2>
                <NewResourceForm onSave={onSave}>
                    {createNewResource}
                </NewResourceForm>
            </div>
            <div className="flex flex-col gap-2">
                <h2 className="text-xl font-bold">Existing {typeNamePlural}</h2>
                <div className="flex flex-col">
                    <List items={resources} onDelete={onDelete} />
                </div>
            </div>
        </div>
    );
};

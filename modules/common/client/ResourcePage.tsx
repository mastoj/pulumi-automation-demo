import { ResourceSummary } from "../types";
import { List } from "./List";
import { NewResourceForm } from "./NewResourceForm";

export interface ResourcePageProps {
    typeNamePlural: string;
    createNewResource: React.ReactNode;
    onDelete: (stackName: string) => Promise<void>;
    onSave: () => Promise<void>;
    isSaving: boolean;
    resources: ResourceSummary[];
    isDeleting: { [stackName: string]: boolean };
}
export const ResourcePage = ({
    typeNamePlural,
    createNewResource,
    resources,
    onDelete,
    onSave,
    isSaving,
    isDeleting,
}: ResourcePageProps) => {
    return (
        <div className="flex flex-col gap-2">
            <div className="flex flex-col">
                <h2 className="text-xl font-bold">Create new</h2>
                <NewResourceForm onSave={onSave} isSaving={isSaving}>
                    {createNewResource}
                </NewResourceForm>
            </div>
            <div className="flex flex-col gap-2">
                <h2 className="text-xl font-bold">Existing {typeNamePlural}</h2>
                <div className="flex flex-col">
                    <List items={resources} onDelete={onDelete} isDeleting={isDeleting}/>
                </div>
            </div>
        </div>
    );
};

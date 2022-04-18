import { useContext, useState } from "react";
import { Combobox, Input } from "../../components/form";
import { ResourceSummary } from "../common/types";
import { ResourceGroupController } from "../resource-groups/ResourceGroupController";
import { ResourceGroupService } from "../resource-groups/ResourceGroupService";
import { RepositoryController } from "./RepositoryController";
import { RepositorySpecification } from "./types";

export interface NewRepositoryFormProps {
    setValue: (key: string, value: any) => void;
    resource: RepositorySpecification,
    resourceGroups: ResourceSummary[]
};
export const NewRepositoryForm = (
    { setValue, resource, resourceGroups }: NewRepositoryFormProps
) => {
    const options = resourceGroups.map(resourceGroup => ({
        value: resourceGroup.stackName,
        label: resourceGroup.stackName,
    }));
    return (
        <>
            <Input
                type="text"
                onChange={(e) => {
                    return setValue("name", e.target.value);
                }}
                value={resource.name}
                label="Repository name"
                id="repositoryName"
                name="repositoryName"
                placeholder="pulumi-up-demo"
            />
            <Combobox
                options={options}
                value={resource.resourceGroupStack}
                onChange={(value: string) =>
                    setValue("resourceGroupStack", value)
                }
                label="Resource group"
            />
        </>
    );
};

export const NewRepositoryForm2 = () => {
    const [value, setValue] = useState("start value");
    const [resourceGroup, setResourceGroup] = useState<string | undefined>(
        undefined
    );
    const resourceGroupService = useContext(ResourceGroupService);
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        resourceGroupService.saveResource({
            name: value,
            stackName: value,
        });
    };
    return (
        <form
            className="flex flex-col md:flex-row gap-2"
            onSubmit={handleSubmit}
        >
            <Input
                type="text"
                onChange={(e) => {
                    return setValue(e.target.value);
                }}
                value={value}
                label="Repository name"
                id="repositoryName"
                name="repositoryName"
                placeholder="pulumi-up-demo"
            />
            <Combobox
                options={[
                    { value: "hello", label: "hello label" },
                    { value: "yolo", label: "yolo label" },
                ]}
                value={resourceGroup}
                onChange={(value: string) => setResourceGroup(value)}
                label="Resource group"
            />
            <div className="flex-1 flex justify-end items-end">
                <button className="bg-success rounded-md px-4 py-2 h-9">
                    Create
                </button>
            </div>
        </form>
    );
};

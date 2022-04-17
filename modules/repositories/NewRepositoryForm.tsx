import { useContext, useState } from "react";
import { Combobox, Input } from "../../components/form";
import { ResourceGroupController } from "../resource-groups/ResourceGroupController";

export const NewRepositoryForm = () => {
    const [value, setValue] = useState("start value");
    const [resourceGroup, setResourceGroup] = useState<string | undefined>(undefined);
    const resourceGroupController = useContext(ResourceGroupController);
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        resourceGroupController.saveResourceGroup({
            name: value,
            stackName: value,
        });
    }
    return (
        <form 
            className="flex flex-col md:flex-row gap-2"
            onSubmit={handleSubmit}>
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
                    {value: "hello", label: "hello label"},
                    {value: "yolo", label: "yolo label"}
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

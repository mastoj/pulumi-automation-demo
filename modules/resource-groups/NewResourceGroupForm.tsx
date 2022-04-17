import { useContext, useState } from "react";
import { Input } from "../../components/form";
import { ResourceGroupController } from "./ResourceGroupController";

export const NewResourceGroupForm = () => {
    const [value, setValue] = useState("start value");
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
                label="Resource group name"
                id="resourceGroup"
                name="resourceGroup"
                placeholder="pulumi-up-demo"
            />
            <Input
                type="text"
                onChange={(e) => {
                    return setValue(e.target.value);
                }}
                value={value}
                label="Resource group name"
                id="resourceGroup"
                name="resourceGroup"
                placeholder="pulumi-up-demo"
            />
            <div className="flex-1 flex justify-end items-end">
                <button className="bg-green-500 rounded-md px-4 py-2 h-9">
                    Create
                </button>
            </div>
        </form>
    );
};

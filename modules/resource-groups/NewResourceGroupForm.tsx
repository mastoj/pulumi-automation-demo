import { useContext, useState } from "react";
import { Input } from "../../components/form";
import { ResourceGroupController } from "./ResourceGroupController";
import { ResourceGroupService } from "./ResourceGroupService";
import { ResourceGroupSpecification } from "./types";

export interface NewResourceGroupFormProps {
    controller: ResourceGroupController;
}

export const NewResourceGroupForm = ({controller: {setResource, resource, saveResource}}: NewResourceGroupFormProps) => {
    return (
        <form 
            className="flex flex-col md:flex-row gap-2"
            onSubmit={saveResource}>
            <Input
                type="text"
                onChange={(e) => {
                    return setResource({stackName: e.target.value, name: e.target.value});
                }}
                value={resource.name}
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

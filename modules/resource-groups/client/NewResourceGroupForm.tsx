import { Input } from "../../../components/form";
import { ResourceGroupController } from "./ResourceGroupController";

export const NewResourceGroupForm = ({setResource, resource}: ResourceGroupController) => {
    return (
        <Input
            type="text"
            onChange={(e) => {
                return setResource({stackName: e.target.value, name: e.target.value});
            }}
            value={resource.name}
            label="Resource group name"
            id="resourceGroup"
            name="resourceGroup"
            placeholder="Enter resource group name"
        />
    );
};

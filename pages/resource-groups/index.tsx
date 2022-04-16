import { NextPage } from "next";
import { useState } from "react";
import { Input } from "../../components/form";

function Example() {
    return (
        <div>
            <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
            >
                Email
            </label>
            <div className="mt-1">
                <input
                    type="email"
                    name="email"
                    id="email"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="you@example.com"
                />
            </div>
        </div>
    );
}

const Index: NextPage = () => {
    const [value, setValue] = useState("start value");
    return (
        <div>
            <form>
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
            </form>
            <h1 className="text-3xl font-bold underline">Resource groups</h1>
        </div>
    );
};

export default Index;

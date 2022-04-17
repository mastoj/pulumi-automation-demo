import React, { useState } from "react";
import { HiCheck, HiSelector } from "react-icons/hi";
import { Combobox as HeadlessCombobox } from "@headlessui/react";

export interface FormFieldProps {
    id?: string;
    label: string;
    children: React.ReactNode;
}
export const FormField = ({ label, id, children }: FormFieldProps) => {
    return (
        <div>
            <label
                htmlFor={id}
                className="block text-sm font-medium text-primary"
            >
                {label}
            </label>
            <div className="mt-1">{children}</div>
        </div>
    );
};

export interface InputProps
    extends React.DetailedHTMLProps<
        React.InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
    > {
    label: string;
    type: "text" | "email" | "password";
}
export const Input = (inputProps: InputProps) => {
    const props = {
        ...inputProps,
        className:
            "shadow-sm focus:ring-brand-light focus:border-brand-light block w-full sm:text-sm border-primary-extra-light rounded-md",
    };
    return (
        <FormField label={inputProps.label} id={inputProps.id}>
            <input {...props} />
        </FormField>
    );
};

const classNames = (...classes: string[]) => classes.filter(Boolean).join(" ");

export interface Option {
    value: string;
    label: string;
}
export interface ComboxboxProps {
    label: string;
    options: Option[];
    value?: string;
    onChange: (value: string) => void;
}

export const Combobox = ({label, options, value, onChange}: ComboxboxProps) => {
    const [query, setQuery] = useState("");

    const filteredOptions =
        query === ""
            ? options
            : options.filter((option) => {
                  return option.value
                      .toLowerCase()
                      .includes(query.toLowerCase());
              });

    return (
        <HeadlessCombobox
            as="div"
            value={options.find(y => y.value === value)}
            onChange={(item: Option) => onChange(item.value)}
        >
            <HeadlessCombobox.Label className="block text-sm font-medium text-primary">
                {label}
            </HeadlessCombobox.Label>
            <div className="relative mt-1">
                <HeadlessCombobox.Input
                    id="resourceGroup"
                    name="resourceGroup"
                    className="w-full rounded-md border border-primary-extra-light bg-white py-2 pl-3 pr-10 shadow-sm focus:border-brand-light focus:outline-none focus:ring-1 focus:ring-brand-light sm:text-sm"
                    onChange={(event) => setQuery(event.target.value)}
                    displayValue={(option: Option) => option.label}
                />
                <HeadlessCombobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                    <HiSelector
                        className="h-5 w-5 text-primary-light"
                        aria-hidden="true"
                    />
                </HeadlessCombobox.Button>

                {filteredOptions.length > 0 && (
                    <HeadlessCombobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {filteredOptions.map((option) => (
                            <HeadlessCombobox.Option
                                key={option.value}
                                value={option}
                                className={({ active }) =>
                                    classNames(
                                        "relative cursor-default select-none py-2 pl-3 pr-9",
                                        active
                                            ? "bg-brand text-white"
                                            : "text-primary-dark"
                                    )
                                }
                            >
                                {({ active, selected }) => (
                                    <>
                                        <span
                                            className={classNames(
                                                "block truncate",
                                                selected
                                                    ? "font-semibold"
                                                    : ""
                                            )}
                                        >
                                            {option.label}
                                        </span>

                                        {selected && (
                                            <span
                                                className={classNames(
                                                    "absolute inset-y-0 right-0 flex items-center pr-4",
                                                    active
                                                        ? "text-white"
                                                        : "text-brand"
                                                )}
                                            >
                                                <HiCheck
                                                    className="h-5 w-5"
                                                    aria-hidden="true"
                                                />
                                            </span>
                                        )}
                                    </>
                                )}
                            </HeadlessCombobox.Option>
                        ))}
                    </HeadlessCombobox.Options>
                )}
            </div>
        </HeadlessCombobox>
    );
}

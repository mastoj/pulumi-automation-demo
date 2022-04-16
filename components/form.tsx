import React from "react";

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
                className="block text-sm font-medium text-gray-700"
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
            "shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md",
    };
    return (
        <FormField label={inputProps.label} id={inputProps.id}>
            <input {...props} />
        </FormField>
    );
};

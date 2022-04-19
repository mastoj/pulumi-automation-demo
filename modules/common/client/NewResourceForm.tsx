export interface NewResourceFormProps {
    onSave: () => Promise<void>;
    isSaving: boolean;
    children: React.ReactNode;
}
export function NewResourceForm({
    onSave,
    isSaving,
    children
}: NewResourceFormProps) {
    return (
        <form 
            className="flex flex-col md:flex-row gap-2"
            onSubmit={onSave}>
            {children}
            <div className="flex-1 flex justify-end items-end">
                <button disabled={isSaving} type="submit" className="disabled:opacity-50 bg-green-500 rounded-md px-4 py-2 h-9">
                    Create
                </button>
            </div>
        </form>
    );
}

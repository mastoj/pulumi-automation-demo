import { HiTrash } from "react-icons/hi";

export interface ListItem {
    stackName: string;
    resourceCount: number;
}

export interface ListProps {
    items: ListItem[];
    onDelete: (stackName: string) => void;
}

export const List = ({ items, onDelete }: ListProps) => {
    return (
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul role="list" className="divide-y divide-gray-200">
                {items.map((application: any) => (
                    <li key={application.stackName}>
                        <div className="block hover:bg-gray-50">
                            <div className="flex items-center px-4 py-4 sm:px-6">
                                <div className="min-w-0 flex-1 flex items-center">
                                    <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                                        <div>
                                            <p className="text-sm font-medium text-indigo-600 truncate">
                                                {application.stackName}
                                            </p>
                                            <p className="mt-2 flex items-center text-sm text-gray-500">
                                                <span className="truncate">
                                                    Resource count:{" "}
                                                    {application.resourceCount}
                                                </span>
                                            </p>
                                        </div>
                                        <div className="hidden md:block">
                                            <div>
                                                <p className="text-sm text-gray-900">
                                                    Last updated on 2022-04-17
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <button onClick={() => onDelete(application.stackName)}>
                                        <HiTrash
                                            className="h-5 w-5 text-red-400"
                                            aria-hidden="true"
                                        />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

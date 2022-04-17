import { HiTrash } from "react-icons/hi";
import { ResourceSummary } from "../resource-groups/types";

export interface ListProps {
    items: ResourceSummary[];
    onDelete: (stackName: string) => void;
}

export const List = ({ items, onDelete }: ListProps) => {
    return (
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul role="list" className="divide-y divide-secondary dark:divide-secondary-neutral-inverted">
                {items.map((application: any) => (
                    <li key={application.stackName}>
                        {/* <div className="block hover:bg-secondary-light dark:hover:bg-secondary-light-inverted"> */}
                        <div className="block hover:bg-secondary-light dark:hover:bg-red">
                            <div className="flex items-center px-4 py-4 sm:px-6">
                                <div className="min-w-0 flex-1 flex items-center">
                                    <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                                        <div>
                                            <p className="text-sm font-medium text-brand truncate">
                                                {application.stackName}
                                            </p>
                                            <p className="mt-2 flex items-center text-sm text-secondary-dark dark:text-secondary-dark-inverted">
                                                <span className="truncate">
                                                    Resource count:{" "}
                                                    {application.resourceCount}
                                                </span>
                                            </p>
                                        </div>
                                        <div className="hidden md:block">
                                            <div>
                                                <p className="text-sm text-primary-dark">
                                                    Last updated on 2022-04-17
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <button onClick={() => onDelete(application.stackName)}>
                                        <HiTrash
                                            className="h-5 w-5 text-warning"
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

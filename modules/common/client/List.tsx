import moment from "moment";
import { HiTrash } from "react-icons/hi";
import { ResourceSummary } from "../types";

export interface ListProps {
    items: ResourceSummary[];
    onDelete: (stackName: string) => void;
    isDeleting: { [stackName: string]: boolean };
}

export const List = ({ items, onDelete, isDeleting }: ListProps) => {
    return (
        <div className="bg-white dark:bg-secondary-neutral-inverted shadow overflow-hidden rounded-md">
            <ul
                role="list"
                className="divide-y divide-secondary dark:divide-primary"
            >
                {items.map((application: any) => (
                    <li
                        key={application.stackName}
                        className={
                            isDeleting[application.stackName]
                                ? "opacity-50"
                                : ""
                        }
                    >
                        {/* <div className="block hover:bg-secondary-light dark:hover:bg-secondary-light-inverted"> */}
                        <div className="block hover:bg-secondary-light dark:hover:bg-primary">
                            <div className="flex items-center px-4 py-4 sm:px-6">
                                <div className="min-w-0 flex-1 flex items-center">
                                    <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                                        <div>
                                            <p className="text-sm font-medium text-brand dark:text-brand-light truncate">
                                                {application.stackName}
                                            </p>
                                            <p className="mt-2 flex items-center text-sm text-secondary-dark dark:text-primary-extra-light">
                                                <span className="truncate">
                                                    Resource count:{" "}
                                                    {application.resourceCount}
                                                </span>
                                            </p>
                                            <p className="text-sm text-primary-dark dark:text-secondary-dark">
                                                Updated {moment(application.lastUpdate).fromNow()}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <button
                                        onClick={() =>
                                            onDelete(application.stackName)
                                        }
                                        disabled={
                                            isDeleting[application.stackName]
                                        }
                                    >
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
};

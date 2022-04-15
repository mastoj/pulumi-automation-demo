import { Fragment, useState } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import {
    HiBell,
    HiCalendar,
    HiChartBar,
    HiFolder,
    HiHome,
    HiInbox,
    HiMenuAlt2,
    HiUsers,
    HiX,
    HiOutlineSearch,
} from "react-icons/hi";

export interface LayoutProps {
    children: React.ReactNode;
}
export default function Layout({ children }: LayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <>
            <div className="flex overflow-hidden h-screen">
                <aside className="flex-row">
                    <div className="h-12 bg-red-600">Automation Demo</div>
                    <nav className="bg-blue-400 flex-1 h-full">
                        <ul>
                            <li>
                                <a href="#">Resource group</a>
                            </li>
                            <li>
                                <a href="#">Blob storage</a>
                            </li>
                        </ul>
                    </nav>
                </aside>
                <main className="flex-row">
                    <header className="h-12 bg-red-600 z-50">
                        <h1>Resource group</h1>
                    </header>
                    <div className="flex-1 h-screen overflow-hidden -mt-12 pt-12">
                        <div className="overflow-y-auto h-full bg-green-400">
                            <div>
                                first row this is the text this is the text this
                                is the text this is the text this is the text
                                this is the text this is the text this is the
                                text this is the text this is the text this is
                                the text this is the text this is the text this
                                is the text
                            </div>
                            <div>
                                this is the text this is the text this is the
                                text this is the text this is the text this is
                                the text this is the text this is the text this
                                is the text this is the text this is the text
                                this is the text this is the text this is the
                                text this is the text
                            </div>
                            <div>
                                this is the text this is the text this is the
                                text this is the text this is the text this is
                                the text this is the text this is the text this
                                is the text this is the text this is the text
                                this is the text this is the text this is the
                                text this is the text
                            </div>
                            <div>
                                this is the text this is the text this is the
                                text this is the text this is the text this is
                                the text this is the text this is the text this
                                is the text this is the text this is the text
                                this is the text this is the text this is the
                                text this is the text
                            </div>
                            <div>
                                this is the text this is the text this is the
                                text this is the text this is the text this is
                                the text this is the text this is the text this
                                is the text this is the text this is the text
                                this is the text this is the text this is the
                                text this is the text
                            </div>
                            <div>
                                this is the text this is the text this is the
                                text this is the text this is the text this is
                                the text this is the text this is the text this
                                is the text this is the text this is the text
                                this is the text this is the text this is the
                                text this is the text
                            </div>
                            <div>
                                this is the text this is the text this is the
                                text this is the text this is the text this is
                                the text this is the text this is the text this
                                is the text this is the text this is the text
                                this is the text this is the text this is the
                                text this is the text
                            </div>
                            <div>
                                this is the text this is the text this is the
                                text this is the text this is the text this is
                                the text this is the text this is the text this
                                is the text this is the text this is the text
                                this is the text this is the text this is the
                                text this is the text
                            </div>
                            <div>
                                this is the text this is the text this is the
                                text this is the text this is the text this is
                                the text this is the text this is the text this
                                is the text this is the text this is the text
                                this is the text this is the text this is the
                                text this is the text
                            </div>
                            <div>
                                this is the text this is the text this is the
                                text this is the text this is the text this is
                                the text this is the text this is the text this
                                is the text this is the text this is the text
                                this is the text this is the text this is the
                                text this is the text
                            </div>
                            <div>
                                this is the text this is the text this is the
                                text this is the text this is the text this is
                                the text this is the text this is the text this
                                is the text this is the text this is the text
                                this is the text this is the text this is the
                                text this is the text
                            </div>
                            <div>
                                this is the text this is the text this is the
                                text this is the text this is the text this is
                                the text this is the text this is the text this
                                is the text this is the text this is the text
                                this is the text this is the text this is the
                                text this is the text
                            </div>
                            <div>
                                this is the text this is the text this is the
                                text this is the text this is the text this is
                                the text this is the text this is the text this
                                is the text this is the text this is the text
                                this is the text this is the text this is the
                                text this is the text
                            </div>
                            <div>
                                this is the text this is the text this is the
                                text this is the text this is the text this is
                                the text this is the text this is the text this
                                is the text this is the text this is the text
                                this is the text this is the text this is the
                                text this is the text
                            </div>
                            <div>
                                this is the text this is the text this is the
                                text this is the text this is the text this is
                                the text this is the text this is the text this
                                is the text this is the text this is the text
                                this is the text this is the text this is the
                                text this is the text
                            </div>
                            <div>
                                this is the text this is the text this is the
                                text this is the text this is the text this is
                                the text this is the text this is the text this
                                is the text this is the text this is the text
                                this is the text this is the text this is the
                                text this is the text
                            </div>
                            <div>
                                this is the text this is the text this is the
                                text this is the text this is the text this is
                                the text this is the text this is the text this
                                is the text this is the text this is the text
                                this is the text this is the text this is the
                                text this is the text
                            </div>
                            <div>
                                this is the text this is the text this is the
                                text this is the text this is the text this is
                                the text this is the text this is the text this
                                is the text this is the text this is the text
                                this is the text this is the text this is the
                                text last row
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}

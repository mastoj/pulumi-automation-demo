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
    title: string;
    children: React.ReactNode;
}
export default function Layout({ children, title }: LayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <>
            <div className="flex overflow-hidden h-screen">
                <aside className="flex-row w-48">
                    <div className="h-16 bg-red-600">Automation Demo</div>
                    <nav className="bg-blue-400 flex-1 h-full space-y-2 pt-2 px-2">
                        <a className="flex py-2 px-4 rounded-md hover:bg-blue-700" href="#">Resource group</a>
                        <a className="flex py-2 px-4 rounded-md hover:bg-blue-700" href="#">Blob storage</a>
                    </nav>
                </aside>
                <main className="flex-row flex-1">
                    <header className="h-16 bg-red-600 z-50 p-4">
                        <h1 className="font-bold text-2xl">{title}</h1>
                    </header>
                    <div className="flex-1 h-screen overflow-hidden -mt-12 pt-12">
                        <div className="overflow-y-auto h-full bg-green-400">
                            {children}
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}

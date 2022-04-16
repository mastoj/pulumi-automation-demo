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
import { GiHamburgerMenu } from "react-icons/gi";
import Link from "next/link";
import { useRouter } from "next/router";

interface NavItemsProps {
    route: string;
}
const classNames = (...classes: string[]) => classes.filter(Boolean).join(" ");
const NavItems = ({ route }: NavItemsProps) => {
    const routes = [
        {
            name: "Repositories",
            route: "/repositories",
            active: route === "/repositories",
        },
        {
            name: "Resource groups",
            route: "/resource-groups",
            active: route === "/resource-groups",
        },
    ];
    return (
        <Fragment>
            {routes.map((route, index) => (
                <Link href={route.route} key={index}>
                    <a
                        className={classNames(
                            "flex py-2 px-2 rounded-md hover:bg-blue-700",
                            route.active ? "bg-blue-700" : ""
                        )}
                        href="#"
                    >
                        {route.name}
                    </a>
                </Link>
            ))}
        </Fragment>
    );
};

export interface LayoutProps {
    title: string;
    children: React.ReactNode;
}
export default function Layout({ children, title }: LayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const router = useRouter();
    console.log("==> Router: ", router);

    return (
        <>
            <div className="flex-row sm:flex overflow-hidden h-screen">
                <aside className="flex-row w-full sm:max-w-xs">
                    <div className="h-16 bg-red-600 px-4 flex items-center gap-2">
                        <button
                            onClick={() => setSidebarOpen((s) => !s)}
                            className="sm:hidden"
                        >
                            <GiHamburgerMenu size={32} />
                        </button>
                        <h1 className="text-2xl">Automation Demo</h1>
                    </div>
                    {sidebarOpen && (
                        <nav className="bg-blue-400 flex-1 h-full space-y-2 px-2 py-2 sm:hidden">
                            <NavItems route={router.pathname} />
                        </nav>
                    )}
                    <nav className="bg-blue-400 flex-1 h-full space-y-2 py-2 px-2 hidden sm:block">
                        <NavItems route={router.pathname} />
                    </nav>
                </aside>
                <main className="flex-row flex-1">
                    <header className="h-16 bg-red-600 z-50 p-4">
                        <h2 className="font-bold text-2xl">{title}</h2>
                    </header>
                    <div className="flex-1 h-screen overflow-hidden -mt-12 pt-12">
                        <div className="overflow-y-auto h-full bg-green-400 p-2">
                            {children}
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}

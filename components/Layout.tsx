import { Fragment, useState } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiFillAppstore, AiFillGithub } from "react-icons/ai";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";

interface NavItemsProps {
    route: string;
}
const classNames = (...classes: string[]) => classes.filter(Boolean).join(" ");
const routes = [
    {
        icon: <AiFillAppstore size={28} />,
        name: "Resource groups",
        route: "/resource-groups",
    },
    {
        icon: <AiFillGithub size={28} />,
        name: "Repositories",
        route: "/repositories",
    },
];
const getTitle = (route: string) => {
    switch (route) {
        case "/":
            return "Home";
        case "/repositories":
            return "Repositories";
        case "/resource-groups":
            return "Resource groups";
        default:
            return "";
    }
};
const NavItems = ({ route: actualRoute }: NavItemsProps) => {
    return (
        <Fragment>
            {routes.map((route, index) => (
                <Link href={route.route} key={index}>
                    <a
                        className={classNames(
                            "flex py-2 px-2 rounded-md flex-row items-center gap-2",
                            route.route === actualRoute
                                ? "bg-brand-dark"
                                : "hover:bg-brand-light"
                        )}
                        href="#"
                    >
                        {route.icon}
                        {route.name}
                    </a>
                </Link>
            ))}
        </Fragment>
    );
};

import { Switch } from "@headlessui/react";

interface TogglerProps {
    enabled: boolean;
    setEnabled: (enabled: boolean) => void;
}
function Toggler({ enabled, setEnabled }: TogglerProps) {
    return (
        <Switch
            checked={enabled}
            onChange={setEnabled}
            className={`${
                enabled ? "bg-success" : "bg-primary-light"
            } relative inline-flex items-center h-6 rounded-full w-11`}
        >
            <span
                className={`${
                    enabled ? "translate-x-6" : "translate-x-1"
                } inline-block w-4 h-4 transform bg-white rounded-full`}
            />
        </Switch>
    );
}

export interface LayoutProps {
    children: React.ReactNode;
}
export default function Layout({ children }: LayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const router = useRouter();
    const { theme, setTheme } = useTheme();

    return (
        <>
            <div className="flex-row sm:flex overflow-hidden h-screen">
                <aside className="flex-row w-full sm:max-w-xs text-secondary-light bg-brand">
                    <div className="h-16 px-4 flex items-center gap-2">
                        <button
                            onClick={() => setSidebarOpen((s) => !s)}
                            className="sm:hidden"
                        >
                            <GiHamburgerMenu size={32} />
                        </button>
                        <Link href="/">
                            <a href="#">
                                <h1 className="text-2xl">Automation Demo</h1>
                            </a>
                        </Link>
                    </div>
                    {sidebarOpen && (
                        <nav className="flex-1 h-full space-y-2 px-2 py-2 sm:hidden">
                            <NavItems route={router.pathname} />
                            <div className="flex flex-col items-end">
                                <div className="flex flex-row gap-1">
                                    <span>Light</span>
                                    <Toggler
                                        enabled={theme === "dark"}
                                        setEnabled={(enabled) =>
                                            enabled
                                                ? setTheme("dark")
                                                : setTheme("light")
                                        }
                                    />
                                    <span>Dark</span>
                                </div>
                            </div>
                        </nav>
                    )}
                    <nav className="flex flex-1 h-full space-y-2 py-2 px-2 hidden sm:block">
                        <NavItems route={router.pathname} />
                        <div className="flex flex-col items-end">
                            <div className="flex flex-row gap-1">
                                <span>Light</span>
                                <Toggler
                                    enabled={theme === "dark"}
                                    setEnabled={(enabled) =>
                                        enabled
                                            ? setTheme("dark")
                                            : setTheme("light")
                                    }
                                />
                                <span>Dark</span>
                            </div>
                        </div>
                    </nav>
                </aside>
                <main className="flex-row flex-1">
                    <header className="h-16 bg-secondary-light dark:bg-secondary-light-inverted z-50 p-4">
                        <h2 className="font-bold text-2xl">
                            {getTitle(router.pathname)}
                        </h2>
                    </header>
                    <div className="flex-1 h-screen overflow-hidden -mt-12 pt-12">
                        <div className="overflow-y-auto h-full dark:bg-secondary-light-inverted bg-secondary-light p-4">
                            {children}
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}

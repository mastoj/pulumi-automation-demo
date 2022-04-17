import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import { ThemeProvider } from "next-themes";
import { useEffect, useState } from "react";

function MyApp({ Component, pageProps }: AppProps) {
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);
    return (
        <>
            {mounted && (
                <ThemeProvider attribute="class">
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </ThemeProvider>
            )}
        </>
    );
}

export default MyApp;

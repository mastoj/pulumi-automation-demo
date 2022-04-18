import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import { ThemeProvider } from "next-themes";
import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from 'react-query'
import { Toaster } from 'react-hot-toast';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);
    return (
        <>
            {mounted && (
                <QueryClientProvider client={queryClient}>
                    <ThemeProvider attribute="class">
                        <Layout>
                            <Component {...pageProps} />
                            <Toaster />
                        </Layout>
                    </ThemeProvider>
                </QueryClientProvider>
            )}
        </>
    );
}

export default MyApp;

import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Layout from "../components/Layout";

const Home: NextPage = () => {
    return (
        <div className="w-full h-full mx-auto flex justify-around items-center">
            <h1 className="text-5xl font-bold mx-auto">
                <span className="text-blue-600">Hello</span>
                <span className="text-yellow-300"> PulumiUP!</span>
            </h1>
        </div>
    );
};

export default Home;

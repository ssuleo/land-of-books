import Head from "next/head";
import { Inter } from "next/font/google";
import HomePage from "../components/Home"

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
    <HomePage/>
    </>
  );
}

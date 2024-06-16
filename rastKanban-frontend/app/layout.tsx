import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import ToasterContext from "@/context/ToasterContext";
import { ReduxProvider } from "./globalRedux/reduxprovider";

const ubuntu = Ubuntu({
    subsets: ["latin"],
    weight: ["300", "400", "500", "700"]
});

export const metadata: Metadata = {
    title: "Kanban Board",
    description: "Kanban board for managing tasks",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${ubuntu.className} bg-gradient-to-b from-black to-purple-900 text-white`}>
                <ReduxProvider>
                    <ToasterContext />
                    <Navbar />
                    <main>
                        {children}
                    </main>
                </ReduxProvider>
            </body>
        </html>
    );
}

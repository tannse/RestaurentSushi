import type { Metadata } from "next";
import { Josefin_Sans } from "next/font/google";
import Header from "@/components/layout/Header/Header";
import Footer from "@/components/layout/Footer/footer";

import "./globals.css";

const josefin_Sans = Josefin_Sans({
    subsets: ["latin"],
    weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={josefin_Sans.className}
                style={{ backgroundColor: "black" }}
            >
                <main className="max-w-[1170px] mx-auto mx-auto">
                    <Header></Header>
                    {children}
                    <Footer></Footer>
                </main>
            </body>
        </html>
    );
}

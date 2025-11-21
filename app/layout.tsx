import type { Metadata } from "next";
import "./globals.css";

// const inter = Inter({ subsets: ["latin"] }); // Disabled due to network issues in environment

export const metadata: Metadata = {
    title: "Multi-tenant E-Commerce",
    description: "Prototype",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}

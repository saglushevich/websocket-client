"use client";
import { Roboto } from "next/font/google";
import "./globals.css";
import styles from "./index.module.css";
import { Provider } from "react-redux";
import { store } from "../store";

const robotoFont = Roboto({
    variable: "--font-roboto",
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ru" className={robotoFont.variable}>
            <body>
                <Provider store={store}>
                    <div className={styles.container}>{children}</div>
                </Provider>
            </body>
        </html>
    );
}

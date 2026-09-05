"use client";
import { Provider } from "react-redux";
import { Roboto } from "next/font/google";

import { store } from "../store";

import "./globals.css";
import styles from "./index.module.css";

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

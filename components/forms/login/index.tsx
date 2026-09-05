"use client";
import { useDispatch } from "react-redux";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { socket } from "../../../socket/socket";
import { setCurrentUserId } from "../../../store/slices/users";

import styles from "./index.module.css";

export const LoginForm = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    const onSubmit = (formData: FormData) => {
        const userName = formData.get("name")?.toString();

        if (!userName) {
            return;
        }

        socket.emit("createUser", { userName });

        socket.once("userInfo", (data) => {
            dispatch(setCurrentUserId(data));
            router.push("/chats");
        });
    };

    return (
        <div className={styles.container}>
            <form className={styles.modal} action={onSubmit}>
                <h1 className={styles.title}>Enter your login</h1>
                <Input placeholder="name" name="name" />
                <Button text="Sign in" className={styles.button} />
            </form>
        </div>
    );
};

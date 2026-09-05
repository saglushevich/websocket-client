"use client";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { useRouter } from "next/navigation";

import { socket } from "../../../socket/socket";
import { useAppDispatch } from "../../../store/hooks";
import { setCurrentUserId } from "../../../store/slices/users";

import styles from "./index.module.css";

export const LoginForm = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();

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

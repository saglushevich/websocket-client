"use client";
import styles from "./index.module.css";
import { Input } from "@components/ui/input";
import { Button } from "@components/ui/button";
import { socket } from "../../../socket/socket";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setCurrentUserId } from "../../../store/slices/users";
import Link from "next/link";

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

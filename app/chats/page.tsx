"use client";
import { Users } from "@components/users";
import { MessageForm } from "@components/forms/message";
import styles from "./index.module.css";
import { Chat } from "@components/chat";
import { useSelector } from "react-redux";
import { currentUserIdSelector } from "../../store/slices/users";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { recipientIdSelector } from "../../store/slices/chat";
import { RecipientInfo } from "@components/recipient-info";

export default function Chats() {
    const currentUserId = useSelector(currentUserIdSelector);
    const recepientId = useSelector(recipientIdSelector);
    const router = useRouter();

    useEffect(() => {
        if (currentUserId === null) {
            router.push("/");
        }
    }, [currentUserId, router]);

    return (
        <div className={styles.wrapper}>
            <Users />
            {typeof recepientId == "number" && (
                <div className={styles.chat}>
                    <RecipientInfo />
                    <Chat />
                    <MessageForm />
                </div>
            )}
        </div>
    );
}

"use client";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Chat } from "@components/chat";
import { MessageForm } from "@components/forms/message";
import { RecipientInfo } from "@components/recipient-info";
import { Users } from "@components/users";
import { useRouter } from "next/navigation";

import { recipientIdSelector } from "../../store/slices/chat";
import { currentUserIdSelector } from "../../store/slices/users";

import styles from "./index.module.css";

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

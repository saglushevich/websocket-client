import styles from "./index.module.css";
import { Input } from "@components/ui/input";
import { Button } from "@components/ui/button";
import { socket } from "../../../socket/socket";
import { ChangeEvent, useState, useCallback, FormEvent } from "react";
import { recipientIdSelector } from "../../../store/slices/chat";
import { currentUserIdSelector } from "../../../store/slices/users";
import { useSelector } from "react-redux";

export const MessageForm = () => {
    const [message, setMessage] = useState("");
    const recepientId = useSelector(recipientIdSelector);
    const currentUserId = useSelector(currentUserIdSelector);

    const onChangeMessage = useCallback(
        (event: ChangeEvent<HTMLInputElement, Element>) => {
            setMessage(event.target.value);
        },
        [],
    );

    const onSendMessage = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!message) {
            return;
        }

        setMessage("");
        socket.emit("addMessage", {
            senderId: currentUserId,
            recipientId: recepientId,
            message,
        });
    };

    return (
        <form className={styles.form} onSubmit={onSendMessage}>
            <Input
                onChange={onChangeMessage}
                value={message}
                className={styles.input}
            />
            <Button className={styles.button} text="Send" />
        </form>
    );
};

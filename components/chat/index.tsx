import { useEffect, useMemo, useRef } from "react";

import { socket } from "../../socket/socket";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
    currentRoomIdSelector,
    messagesSelector,
    recipientIdSelector,
    setMessages,
} from "../../store/slices/chat";
import { currentUserIdSelector } from "../../store/slices/users";
import type { Message as MessageType } from "../../types/message";

import { Message } from "./message";

import styles from "./index.module.css";

type NewMessages = {
    roomId: string;
    messages: MessageType[];
};

const getMessageKey = (message: MessageType, index: number) =>
    `${message.roomId}_${message.time}_${message.senderId}_${index}`;

export const Chat = () => {
    const userMessages = useAppSelector(messagesSelector);
    const recipientId = useAppSelector(recipientIdSelector);
    const currentUserId = useAppSelector(currentUserIdSelector);
    const currentRoomId = useAppSelector(currentRoomIdSelector);
    const dispatch = useAppDispatch();
    const chatRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (currentUserId && typeof recipientId === "number") {
            socket.emit("getMessages", currentUserId, recipientId);
        }
    }, [currentUserId, recipientId]);

    useEffect(() => {
        const handleNewMessages = ({ roomId, messages }: NewMessages) => {
            if (currentRoomId === roomId) {
                dispatch(setMessages(messages));
            }
        };

        socket.on("userMessages", handleNewMessages);

        return () => {
            socket.off("userMessages", handleNewMessages);
        };
    }, [currentRoomId, dispatch]);

    useEffect(() => {
        const el = chatRef.current;
        if (el) {
            el.scrollTop = el.scrollHeight;
        }
    }, [userMessages]);

    const messages = useMemo(
        () =>
            userMessages.map((message, index) => (
                <Message
                    key={getMessageKey(message, index)}
                    mine={currentUserId === message.senderId}
                    text={message.message}
                    time={message.time}
                />
            )),
        [currentUserId, userMessages]
    );

    return (
        <div className={styles.chat} ref={chatRef}>
            {messages}
        </div>
    );
};

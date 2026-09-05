import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { socket } from "../../socket/socket";
import {
    currentRoomIdSelector,
    messagesSelector,
    recipientIdSelector,
    setMessages,
} from "../../store/slices/chat";
import { currentUserIdSelector } from "../../store/slices/users";
import { type Message as MessageType } from "../../types/message";

import { Message } from "./message";

import styles from "./index.module.css";

type NewMessages = {
    roomId: string;
    messages: MessageType[];
};

export const Chat = () => {
    const userMessages = useSelector(messagesSelector);
    const recepientId = useSelector(recipientIdSelector);
    const currentUserId = useSelector(currentUserIdSelector);
    const currentRoomId = useSelector(currentRoomIdSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        if (currentUserId && typeof recepientId === "number") {
            socket.emit("getMessages", currentUserId, recepientId);
        }
    }, [currentUserId, recepientId]);

    useEffect(() => {
        socket.off("userMessages");

        return () => {
            socket.off("userMessages");
        };
    }, []);

    useEffect(() => {
        const handleNewMessages = ({ roomId, messages }: NewMessages) => {
            if (currentRoomId == roomId) {
                dispatch(setMessages(messages));
            }
        };

        socket.on("userMessages", handleNewMessages);

        return () => {
            socket.off("userMessages", handleNewMessages);
        };
    }, [currentRoomId, dispatch]);

    const messages = useMemo(() => {
        return userMessages?.map((message) => (
            <Message
                key={`${message.roomId}_${message.time}`}
                mine={currentUserId === message.senderId}
                text={message.message}
                time={message.time}
            />
        ));
    }, [currentUserId, userMessages]);

    return <div className={styles.chat}>{messages}</div>;
};

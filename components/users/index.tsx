"use client";
import { useCallback, useEffect, useMemo } from "react";

import { getRoomId } from "../../lib/room";
import { socket } from "../../socket/socket";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
    clearChat,
    setCurrentRoomId,
    setRecipient,
} from "../../store/slices/chat";
import {
    currentUserIdSelector,
    setUsers,
    usersSelector,
} from "../../store/slices/users";
import type { User as UserType } from "../../types/user";

import { User } from "./user";

import styles from "./index.module.css";

export const Users = () => {
    const currentUserId = useAppSelector(currentUserIdSelector);
    const users = useAppSelector(usersSelector);
    const dispatch = useAppDispatch();

    const handleUsersList = useCallback(
        (data: UserType[]) => {
            dispatch(setUsers(data));
        },
        [dispatch]
    );

    useEffect(() => {
        socket.on("usersList", handleUsersList);

        if (currentUserId) {
            socket.emit("getUsersList", currentUserId);
        }

        return () => {
            socket.off("usersList", handleUsersList);
        };
    }, [handleUsersList, currentUserId, dispatch]);

    const onSelectUser = useCallback(
        (user: UserType) => () => {
            if (currentUserId === null) {
                return;
            }

            const roomId = getRoomId(currentUserId, user.userId);

            socket.emit("joinRoom", roomId);

            dispatch(clearChat());
            dispatch(setCurrentRoomId(roomId));
            dispatch(setRecipient(user));

            socket.emit("getMessages", currentUserId, user.userId);
        },
        [currentUserId, dispatch]
    );

    const usersList = useMemo(() => {
        return users?.map((user) => (
            <User
                key={user.userId}
                name={user.userName}
                onSelectUser={onSelectUser(user)}
            />
        ));
    }, [onSelectUser, users]);

    return (
        <div className={styles.wrapper}>
            {users.length ? (
                usersList
            ) : (
                <p className={styles.message}>Пользователи не найдены</p>
            )}
        </div>
    );
};

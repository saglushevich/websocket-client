"use client";
import styles from "./index.module.css";
import { User } from "./user";
import { socket } from "../../socket/socket";
import { useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    currentUserIdSelector,
    setUsers,
    usersSelector,
} from "../../store/slices/users";
import {
    setCurrentRoomId,
    setRecepient,
    clearChat,
} from "../../store/slices/chat";
import { getRoomId } from "../../lib/room";
import { User as UserType } from "../../types/user";

export const Users = () => {
    const currentUserId = useSelector(currentUserIdSelector);
    const users = useSelector(usersSelector);
    const dispatch = useDispatch();

    const handleUsersList = useCallback(
        (data: UserType[]) => {
            dispatch(setUsers(data));
        },
        [dispatch],
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
            socket.emit("getMessages", currentUserId, user.userId);

            dispatch(clearChat());
            dispatch(setCurrentRoomId(roomId));
            dispatch(setRecepient(user));
        },
        [currentUserId, dispatch],
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

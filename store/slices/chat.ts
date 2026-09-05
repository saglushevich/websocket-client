import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Message } from "../../types/message";

type Recipient = {
    userId: number;
    userName: string;
};

type InitialState = {
    currentRoomId: string;
    recipient: Recipient | null;
    messages: Message[];
};

const chatSlice = createSlice({
    name: "chat",
    initialState: {
        currentRoomId: "",
        recipient: null,
        messages: [],
    } as InitialState,
    reducers: {
        setCurrentRoomId: (state, action: PayloadAction<string>) => {
            state.currentRoomId = action.payload;
        },
        setRecepient: (state, action: PayloadAction<Recipient>) => {
            state.recipient = action.payload;
        },
        setMessages: (state, action: PayloadAction<Message[]>) => {
            state.messages = action.payload;
        },
        clearChat: (state) => {
            state.currentRoomId = "";
            state.recipient = null;
            state.messages = [];
        },
    },
    selectors: {
        currentRoomIdSelector: (state) => state.currentRoomId,
        recipientSelector: (state) => state.recipient,
        messagesSelector: (state) => state.messages,
        recipientIdSelector: (state) => state.recipient?.userId,
    },
});

export const { setCurrentRoomId, setRecepient, setMessages, clearChat } =
    chatSlice.actions;
export const {
    currentRoomIdSelector,
    recipientSelector,
    messagesSelector,
    recipientIdSelector,
} = chatSlice.selectors;
export default chatSlice.reducer;

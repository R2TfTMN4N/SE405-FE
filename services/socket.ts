import AsyncStorage from "@react-native-async-storage/async-storage";
import type { Socket } from "socket.io-client";
import { io } from "socket.io-client";

const SOCKET_URL = process.env.EXPO_PUBLIC_SOCKET_URL || "http://localhost:3000";

let socket: Socket | null = null;

export const initSocket = async () => {
    if (socket?.connected) return socket;

    const token = await AsyncStorage.getItem("loginToken");
    socket = io(SOCKET_URL, {
        transports: ["websocket"],
        auth: { token },
        reconnection: true,
    });

    socket.on("connect", () => console.log("Socket connected:", socket?.id));
    return socket;
};

export const getSocket = () => socket;

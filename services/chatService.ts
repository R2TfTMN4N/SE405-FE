import { http } from "./http";

export async function getChatHistory(room: string): Promise<
    {
        from: "user" | "bot" | "admin";
        text: string;
        data?: any;
    }[]
> {
    const response = await http.get(`/chat/${room}`);
    return response;
}

export async function chat(message: string): Promise<any> {
    const response = await http.post("/chat", { question: message });
    return response;
}

import Message from "./message";

export interface messageDao {
    addMessage(message: Message): Promise<void>;
    getAllMessages(): Promise<Message[]>;
    getMessageById(id: string): Promise<Message>;
    updateMessage(message: Message): Promise<Message>;
    deleteMessage(id: string): Promise<void>;
    deleteAllMessages(): Promise<void>;
}

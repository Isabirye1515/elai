import Message from "./message";
import { messageDao } from "./messageDao";

import MessageDaoImpl from "./messageDaoImpl"; // Import your DAO implementation

export default class MessageService {
    private messageDao: messageDao;

    constructor() {
        // Initialize with the implementation of the messageDao
        this.messageDao = new MessageDaoImpl();
    }

    // Add a new message
    async addMessage(message: Message): Promise<void> {
        try {
            await this.messageDao.addMessage(message);
        } catch (error) {
            console.error("Error adding message: ", error);
            throw new Error("Could not add the message.");
        }
    }

    // Get all messages
    async getAllMessages(): Promise<Message[]> {
        try {
            return await this.messageDao.getAllMessages();
        } catch (error) {
            console.error("Error getting all messages: ", error);
            throw new Error("Could not fetch messages.");
        }
    }

    // Get a single message by ID
    async getMessageById(id: string): Promise<Message> {
        try {
            return await this.messageDao.getMessageById(id);
        } catch (error) {
            console.error(`Error getting message with ID ${id}: `, error);
            throw new Error("Could not fetch the message.");
        }
    }

    // Update an existing message
    async updateMessage(message: Message): Promise<Message> {
        try {
            return await this.messageDao.updateMessage(message);
        } catch (error) {
            console.error("Error updating message: ", error);
            throw new Error("Could not update the message.");
        }
    }

    // Delete a message by ID
    async deleteMessage(id: string): Promise<void> {
        try {
            await this.messageDao.deleteMessage(id);
        } catch (error) {
            console.error(`Error deleting message with ID ${id}: `, error);
            throw new Error("Could not delete the message.");
        }
    }

    // Delete all messages
    async deleteAllMessages(): Promise<void> {
        try {
            await this.messageDao.deleteAllMessages();
        } catch (error) {
            console.error("Error deleting all messages: ", error);
            throw new Error("Could not delete all messages.");
        }
    }
}

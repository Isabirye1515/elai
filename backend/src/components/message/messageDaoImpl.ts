import { messageDao } from "./messageDao";

import db from "../../db"; // Assuming the db instance is set up elsewhere
import Message from "./message";

export default class MessageDaoImpl implements messageDao {

    // Add a new message
    async addMessage(message: Message): Promise<void> {
        const sql = `
            INSERT INTO message (name, email, subject, message, createdAt, updatedAt, type)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        const values = [
            message.name,
            message.email,
            message.subject,
            message.message,
            message.createdAt,
            message.updatedAt,
            message.type
        ];
        await db.query(sql, values);
    }

    // Get all messages
    async getAllMessages(): Promise<Message[]> {
        const sql = "SELECT * FROM message";
        const [rows] = await db.query(sql);
        return rows as Message[];
    }

    // Get a message by its ID
    async getMessageById(id: string): Promise<Message> {
        const sql = "SELECT * FROM message WHERE id = ?";
        const [rows] = await db.query(sql, [id]);
        return (rows as Message[])[0];
    }

    // Update a message
    async updateMessage(message: Message): Promise<Message> {
        const sql = `
            UPDATE message SET 
                name = ?, 
                email = ?, 
                subject = ?, 
                message = ?, 
                updatedAt = ?, 
                type = ? 
            WHERE id = ?
        `;
        const values = [
            message.name,
            message.email,
            message.subject,
            message.message,
            message.updatedAt,
            message.type,
        ];
        await db.query(sql, values);
        return message;
    }

    // Delete a message by its ID
    async deleteMessage(id: string): Promise<void> {
        const sql = "DELETE FROM message WHERE id = ?";
        await db.query(sql, [id]);
    }

    // Delete all messages
    async deleteAllMessages(): Promise<void> {
        const sql = "DELETE FROM message";
        await db.query(sql);
    }
}

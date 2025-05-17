import db from "../../db";  // Assuming you have a database connection file.
import Contact from "./Contact";
import { contactDao } from "./contactDao";

export default class ContactDaoImpl implements contactDao {

    // Get all contacts
    async getAllContacts(): Promise<Contact[]> {
        const sql: string = 'SELECT * FROM contact';
        const [rows] = await db.query(sql);
        return rows as Contact[];
    }

    // Get a contact by id
    async getContactById(id: string): Promise<Contact> {
        const sql: string = 'SELECT * FROM contact WHERE id = ?';
        const [rows] = await db.query(sql, [id]);
        return (rows as Contact[])[0];
    }

    // Add a new contact
    async addContact(contact: Contact): Promise<void> {
        const sql: string = `
            INSERT INTO contact (name, uniqId)
            VALUES (?, ?)
        `;
        const values = [contact.name, contact.uniqId];
        await db.query(sql, values);
    }

    // Delete all contacts
    async deleteAllContacts(): Promise<void> {
        const sql: string = 'DELETE FROM contact';
        await db.query(sql);
    }

    // Delete a contact by id
    async deleteContactById(id: string): Promise<void> {
        const sql: string = 'DELETE FROM contact WHERE id = ?';
        await db.query(sql, [id]);
    }

    // Update a contact
    async updateContact(contact: Contact): Promise<Contact> {
        const sql: string = `
            UPDATE contact SET
                name = ?,
                uniqId = ?
            WHERE id = ?
        `;
        const values = [contact.name, contact.uniqId];
        await db.query(sql, values);
        return contact;
    }
}

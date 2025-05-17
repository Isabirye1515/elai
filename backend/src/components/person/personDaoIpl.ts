import db from "../../db"; // Assuming you have a database connection file.
import Person from "./Person"; // Import the Person model.
import { personDaop } from "./personDao"; // Import the personDaop interface.

export default class PersonDaoImpl implements personDaop {

    // Get all persons
    async getAllPersons(): Promise<Person[]> {
        const sql: string = 'SELECT * FROM person';
        const [rows] = await db.query(sql);
        return rows as Person[];
    }

    // Get a person by id
    async getPersonById(id: string): Promise<Person> {
        const sql: string = 'SELECT * FROM person WHERE id = ?';
        const [rows] = await db.query(sql, [id]);
        return (rows as Person[])[0];
    }

    // Add a new person
    async addPerson(person: Person): Promise<void> {
        const sql: string = `
            INSERT INTO person (image, name, username, email, phone, occupation, contact_id)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        const values = [
            person.image, 
            person.name, 
            person.username, 
            person.email, 
            person.phone, 
            person.occupation, 
            person.contact_id
        ];
        await db.query(sql, values);
    }

    // Delete all persons
    async deleteAllPersons(): Promise<void> {
        const sql: string = 'DELETE FROM person';
        await db.query(sql);
    }

    // Delete a person by id
    async deletePersonById(id: string): Promise<void> {
        const sql: string = 'DELETE FROM person WHERE id = ?';
        await db.query(sql, [id]);
    }

    // Update a person
    async updatePerson(person: Person): Promise<Person> {
        const sql: string = `
            UPDATE person SET
                image = ?, 
                name = ?, 
                username = ?, 
                email = ?, 
                phone = ?, 
                occupation = ?, 
                contact_id = ?
            WHERE id = ?
        `;
        const values = [
            person.image,
            person.name,
            person.username,
            person.email,
            person.phone,
            person.occupation,
            person.contact_id,
            person.id
        ];
        await db.query(sql, values);
        return person;
    }
}

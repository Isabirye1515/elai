import db from '../../db';
import About from './about';
import { Dao } from './dao';

export default class AboutDao implements Dao{
  constructor() {}
    async getAllAbout(): Promise<About[]> {
        const sql: string = "select * from about";
        const [rows] = await db.query(sql);
        return rows as About[];
    }
    async getAboutById(id: string): Promise<About> {
        const sql = 'SELECT * FROM about WHERE id = ?';
        const [rows] = await db.query(sql, [id]);
        return (rows as About[])[0]; // return the first matching record
      }
      
    async deleteAbout(id: string): Promise<void> {
        const sql = 'DELETE FROM about WHERE id = ?';
        await db.query(sql, [id]);
        
    }
    async addAbout(about: About): Promise<void> {
        const sql = `
          INSERT INTO about (
             name, status, contact, email, address, phone, website, description, image
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)

        `;
        const values = [
          about.name,
          about.status.toString(),
          about.contact,
          about.email,
          about.address,
          about.phone,
          about.website,
          about.description,
          about.image
        ];
      
        await db.query(sql, values);
      }
      
      async updateAbout(about: About): Promise<About> {
        const sql = `
          UPDATE about SET
            name = ?,
            status = ?,
            contact = ?,
            email = ?,
            address = ?,
            phone = ?,
            website = ?,
            description = ?,
            image = ?
          WHERE id = ?
        `;
      
        const values = [
          about.name,
          about.status.toString(),
          about.contact,
          about.email,
          about.address,
          about.phone,
          about.website,
          about.description,
          about.image,
          
        ];
      
        await db.query(sql, values);
        return about;
      }
      

}

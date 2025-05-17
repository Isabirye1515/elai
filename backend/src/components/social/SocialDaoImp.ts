import Socials from "./socials";
import db from "../../db";
import { SocialDao } from "./socialsdao";
export default class SocialDaoImpl implements SocialDao {

    async getAllSocials(): Promise<Socials[]> {
        const sql:string = "select * from social"
        const [rows] = await db.query(sql)
        return rows as Socials[]
    }
   async  getSocialById(id: string): Promise<Socials> {
        const sql:string = 'select * from social where id = ?'
        const [rows] = await db.query(sql,[id])
        return (rows as Socials[])[0]

    }
   async deleteSocialById(id: string): Promise<void> {
        const sql:string = 'DELETE FROM social WHERE id = ?'
        await db.query(sql, [id])
    }
    async deleteAllSocials(): Promise<void> {
        const sql:string = 'delete from social'
        const [rows ] = await db.query(sql)
    }
    async updateSocials(social: Socials): Promise<Socials> {
        const sql = `
            UPDATE social SET
                name = ?,
                url = ?,
                icon = ?,
                isActive = ?,
                isDeleted = ?,
                about_id = ?
            WHERE id = ?
        `;
        
        const values = [
            social.name,
            social.url,
            social.icon,
            social.isActive,
            social.isDeleted,
            social.about_id, // The about_id should be updated as well if needed
             // The id is used to identify which social record to update
        ];
        
        await db.query(sql, values);
        return social; // Returning the updated social object
    }
    
    async addSocial(social: Socials): Promise<void> {
        const sql = `
          INSERT INTO social (
            name, url, icon, isActive, isDeleted, about_id
          ) VALUES (?, ?, ?, ?, ?, ?)
        `;
        const values = [
          social.name,
          social.url,
          social.icon,
          social.isActive,
          social.isDeleted,
          social.about_id // Ensure about_id is an integer value corresponding to the ID in the about table
        ];
        
        await db.query(sql, values);
    }
    

}
import { menuDao } from './menuDao';
import Menu from './Menu';
import db from '../../db';

export default class MenuDaoImpl implements menuDao {
    
    // Add a new menu
    async addMenu(menu: Menu): Promise<void> {
        const sql = `
            INSERT INTO menu (name, description, hasChildren, parentId, url, isActive, isDeleted)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        const values = [
            menu.name,
            menu.description,
            menu.hasChildren,
            menu.parentId,
            menu.url,
            menu.isActive,
            menu.isDeleted
        ];
        await db.query(sql, values);
    }

    // Get all menus
    async getAllMenus(): Promise<Menu[]> {
        const sql = 'SELECT * FROM menu WHERE isDeleted = 0';
        const [rows] = await db.query(sql);
        return rows as Menu[];
    }

    // Get menu by ID
    async getMenuById(id: string): Promise<Menu> {
        const sql = 'SELECT * FROM menu WHERE id = ? AND isDeleted = 0';
        const [rows] = await db.query(sql, [id]);
        return (rows as Menu[])[0]; // return the first matching record
    }

    // Update an existing menu
    async updateMenu(menu: Menu): Promise<Menu> {
        const sql = `
            UPDATE menu SET
                name = ?,
                description = ?,
                hasChildren = ?,
                parentId = ?,
                url = ?,
                isActive = ?,
                isDeleted = ?
            WHERE id = ?
        `;
        const values = [
            menu.name,
            menu.description,
            menu.hasChildren,
            menu.parentId,
            menu.url,
            menu.isActive,
            menu.isDeleted,
        
        ];
        await db.query(sql, values);
        return menu;
    }

    // Delete a menu by ID
    async deleteMenu(id: string): Promise<void> {
        const sql = 'UPDATE menu SET isDeleted = 1 WHERE id = ?';
        await db.query(sql, [id]);
    }

    // Delete all menus
    async deleteAll(): Promise<void> {
        const sql = 'UPDATE menu SET isDeleted = 1';
        await db.query(sql);
    }
}

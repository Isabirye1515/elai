import db from "../../db";
import { dashboardDao } from "./dao";
import dashboardItem from "./dashboard";

export default class DashBoardDaoImpl implements dashboardDao {
  async getAllDashBoards(): Promise<dashboardItem[]> {
    const sql: string = 'SELECT * FROM dashboard';
    const [rows] = await db.query(sql);
    return rows as dashboardItem[];
  }

  async getDashBoardById(id: string): Promise<dashboardItem> {
    const sql: string = 'SELECT * FROM dashboard WHERE id = ?';
    const [rows] = await db.query(sql, [id]);
    return (rows as dashboardItem[])[0];
  }

  async addDashBoard(dashboard: dashboardItem): Promise<void> {
    const sql: string = `
      INSERT INTO dashboard (title, description, url, value)
      VALUES (?, ?, ?, ?)
    `;
    const values = [
      dashboard.title,
      dashboard.description,
      dashboard.url,
      dashboard.value,
    ];
    await db.query(sql, values);
  }

  async updateDashboard(dashboard: dashboardItem): Promise<dashboardItem> {
    const sql: string = `
      UPDATE dashboard SET
        title = ?,
        description = ?,
        url = ?,
        value = ?
      WHERE id = ?
    `;
    const values = [
      dashboard.title,
      dashboard.description,
      dashboard.url,
      dashboard.value,
    ];
    await db.query(sql, values);
    return dashboard;
  }

  async deleteAllDashBoars(): Promise<void> {
    const sql: string = 'DELETE FROM dashboard';
    await db.query(sql);
  }

  async deleteDashboard(id: string): Promise<void> {
    const sql: string = 'DELETE FROM dashboard WHERE id = ?';
    await db.query(sql, [id]);
  }
}

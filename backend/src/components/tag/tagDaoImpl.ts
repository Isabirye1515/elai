import db from '../../db';
import Tag from './tag';
import { tagDao } from './tagDao';

export default class TagDaoImpl implements tagDao {
  async getAllTags(): Promise<Tag[]> {
    const sql = 'SELECT * FROM tag';
    const [rows] = await db.query(sql);
    return rows as Tag[];
  }

  async getTagById(id: string): Promise<Tag> {
    const sql = 'SELECT * FROM tag WHERE uniqId = ?';
    const [rows] = await db.query(sql, [id]);
    return (rows as Tag[])[0];
  }

  async deleteAllTags(): Promise<void> {
    const sql = 'DELETE FROM tag';
    await db.query(sql);
  }

  async deleteTagById(id: string): Promise<void> {
    const sql = 'DELETE FROM tag WHERE uniqId = ?';
    await db.query(sql, [id]);
  }

  async updateTag(tag: Tag): Promise<Tag> {
    const sql = `
      UPDATE tag SET
        name = ?,
        description = ?,
        value = ?
      WHERE uniqId = ?
    `;
    const values = [
      tag.name,
      tag.description,
      tag.value,
      tag.uniqId
    ];
    await db.query(sql, values);
    return tag;
  }

  async addTag(tag: Tag): Promise<void> {
    const sql = `
      INSERT INTO tag (
        name, uniqId, description, value
      ) VALUES (?, ?, ?, ?)
    `;
    const values = [
      tag.name,
      tag.uniqId,
      tag.description,
      tag.value
    ];
    await db.query(sql, values);
  }
}

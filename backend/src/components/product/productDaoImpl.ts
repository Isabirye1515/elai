import db from '../../db';
import Product from './Product';
import { productDao } from './productDao';

export default class ProductDaoImpl implements productDao {
  async getAllProducts(): Promise<Product[]> {
    const sql = 'SELECT * FROM product';
    const [rows] = await db.query(sql);
    return rows as Product[];
  }

  async getProductById(id: number): Promise<Product> {
    const sql = 'SELECT * FROM product WHERE id = ?';
    const [rows] = await db.query(sql, [id]);
    return (rows as Product[])[0];
  }

  async addProduct(product: Product): Promise<void> {
    const sql = `
      INSERT INTO product (
        name, description, price, category, image, stock, rating,
        reviews, createdAt, updatedAt, isActive, discount,
        manufacturer, warranty
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      product.name,
      product.description,
      product.price.toString(),
      product.category,
      product.image,
      product.stock.toString(),
      product.rating.toString(),
      product.reviews.toString(),
      product.createdAt,
      product.updatedAt,
      product.isActive.toString(),
      product.discount.toString(),
      product.manufacturer,
      product.warranty
    ];
    await db.query(sql, values);
  }

  async deleteAllProducts(): Promise<void> {
    const sql = 'DELETE FROM product';
    await db.query(sql);
  }

  async deleteProduct(id: number): Promise<void> {
    const sql = 'DELETE FROM product WHERE id = ?';
    await db.query(sql, [id]);
  }

  async updateProduct(product: Product): Promise<void> {
    const sql = `
      UPDATE product SET
        name = ?, description = ?, price = ?, category = ?, image = ?, stock = ?,
        rating = ?, reviews = ?, createdAt = ?, updatedAt = ?, isActive = ?,
       discount = ?, manufacturer = ?, warranty = ?
      WHERE id = ?
    `;
    const values = [
      product.name,
      product.description,
      product.price.toString(),
      product.category,
      product.image,
      product.stock.toString(),
      product.rating.toString(),
      product.reviews.toString(),
      product.createdAt,
      product.updatedAt,
      product.isActive.toString(),
      product.discount.toString(),
      product.manufacturer,
      product.warranty,
    ];
    await db.query(sql, values);
  }
}

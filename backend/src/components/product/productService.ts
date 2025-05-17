import Product from './Product';
import ProductDaoImpl from './productDaoImpl';

export default class ProductService {
  private dao = new ProductDaoImpl();

  getAll(): Promise<Product[]> {
    return this.dao.getAllProducts();
  }

  getById(id: number): Promise<Product> {
    return this.dao.getProductById(id);
  }

  add(product: Product): Promise<void> {
    return this.dao.addProduct(product);
  }

  update(product: Product): Promise<void> {
    return this.dao.updateProduct(product);
  }

  delete(id: number): Promise<void> {
    return this.dao.deleteProduct(id);
  }

  deleteAll(): Promise<void> {
    return this.dao.deleteAllProducts();
  }
}

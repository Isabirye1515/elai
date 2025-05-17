import express, { Request, Response } from 'express';
import ProductService from './productService';

const router = express.Router();
const productService = new ProductService();

/**
 * Endpoint to get all products.
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    const products = await productService.getAll();
    res.status(200).json(products);
  } catch (error: string | any) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * Endpoint to get a product by ID.
 */
router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const product = await productService.getById(Number(id));
    res.status(200).json(product);
  } catch (error:string | any) {
    res.status(404).json({ message: error.message });
  }
});

/**
 * Endpoint to add a new product.
 */
router.post('/', async (req: Request, res: Response) => {
  const product = req.body;
  try {
    await productService.add(product);
    res.status(201).json({ message: 'Product added successfully' });
  } catch (error: string | any) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * Endpoint to update a product.
 */
router.put('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedProduct = req.body;
  updatedProduct.id = Number(id);
  try {
    await productService.update(updatedProduct);
    res.status(200).json({ message: 'Product updated successfully' });
  } catch (error: string | any) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * Endpoint to delete a product.
 */
router.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await productService.delete(Number(id));
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error: string | any) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * Endpoint to delete all products.
 */
router.delete('/', async (req: Request, res: Response) => {
  try {
    await productService.deleteAll();
    res.status(200).json({ message: 'All products deleted successfully' });
  } catch (error: string | any) {
    res.status(500).json({ message: error.message });
  }
});

export default router;

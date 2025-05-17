import express, { Request, Response } from 'express';
import MenuService from './menuService';

const router = express.Router();
const menuService = new MenuService();

/**
 * Endpoint to add a new menu.
 */
router.post('/', async (req: Request, res: Response) => {
    const menu = req.body;
    try {
        await menuService.addMenu(menu);
        res.status(201).json({ message: 'Menu created successfully' });
    } catch (error: string | any) {
        res.status(500).json({ message: error.message });
    }
});

/**
 * Endpoint to get all menus.
 */
router.get('/', async (req: Request, res: Response) => {
    try {
        const menus = await menuService.getAllMenus();
        res.status(200).json(menus);
    } catch (error: string | any) {
        res.status(500).json({ message: error.message });
    }
});

/**
 * Endpoint to get a menu by ID.
 */
router.get('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const menu = await menuService.getMenuById(id);
        res.status(200).json(menu);
    } catch (error: string | any) {
        res.status(404).json({ message: error.message });
    }
});

/**
 * Endpoint to update a menu by ID.
 */
router.put('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedMenu = req.body;
    updatedMenu.id = id;  // Add the ID to the updated menu
    try {
        const menu = await menuService.updateMenu(updatedMenu);
        res.status(200).json(menu);
    } catch (error: string | any) {
        res.status(500).json({ message: error.message });
    }
});

/**
 * Endpoint to delete a menu by ID.
 */
router.delete('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await menuService.deleteMenu(id);
        res.status(200).json({ message: 'Menu deleted successfully' });
    } catch (error: string | any) {
        res.status(500).json({ message: error.message });
    }
});

/**
 * Endpoint to delete all menus.
 */
router.delete('/', async (req: Request, res: Response) => {
    try {
        await menuService.deleteAllMenus();
        res.status(200).json({ message: 'All menus deleted successfully' });
    } catch (error: string | any) {
        res.status(500).json({ message: error.message });
    }
});

export default router;

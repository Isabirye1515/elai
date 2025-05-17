import Menu from "./Menu";
import { menuDao } from "./menuDao";
import MenuDaoImpl from "./menuDaoImpl";

export default class MenuService {
    private menuDao: menuDao;

    constructor() {
        this.menuDao = new MenuDaoImpl(); // using MenuDaoImpl as the implementation of menuDao
    }

    // Add a new menu
    async addMenu(menu: Menu): Promise<void> {
        await this.menuDao.addMenu(menu);
    }

    // Get all menus
    async getAllMenus(): Promise<Menu[]> {
        return await this.menuDao.getAllMenus();
    }

    // Get a menu by its ID
    async getMenuById(id: string): Promise<Menu> {
        return await this.menuDao.getMenuById(id);
    }

    // Update an existing menu
    async updateMenu(menu: Menu): Promise<Menu> {
        return await this.menuDao.updateMenu(menu);
    }

    // Delete a menu by its ID
    async deleteMenu(id: string): Promise<void> {
        await this.menuDao.deleteMenu(id);
    }

    // Delete all menus
    async deleteAllMenus(): Promise<void> {
        await this.menuDao.deleteAll();
    }
}

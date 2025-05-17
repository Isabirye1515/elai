import Menu from "./Menu";

export interface menuDao {
    addMenu(menu: Menu): Promise<void>;
    getAllMenus(): Promise<Menu[]>;
    getMenuById(id: string): Promise<Menu>;
    updateMenu(menu: Menu): Promise<Menu>;
    deleteMenu(id: string): Promise<void>;
    deleteAll():Promise<void>
}

import dashboardItem from "./dashboard";

export interface dashboardDao{
    getAllDashBoards():Promise<dashboardItem[]>
    getDashBoardById(id:string):Promise<dashboardItem>
    updateDashboard(dashboard:dashboardItem):Promise<dashboardItem>
    addDashBoard(dashboard:dashboardItem):Promise<void>
    deleteAllDashBoars():Promise<void>
    deleteDashboard(id:string):Promise<void>
}

import { dashboardDao } from "./dao";
import DashBoardDaoImpl from "./daoImpl";

export default class DashboardService  {
    private dasboardDao:dashboardDao
    constructor(){
        this.dasboardDao=new DashBoardDaoImpl()

    }
    async getAllDashBoards(){
        return await this.dasboardDao.getAllDashBoards()
    }
    async getDashBoardById(id:string){
        return await this.dasboardDao.getDashBoardById(id)
    }
    async addDashBoard(dashboard:any){
        return await this.dasboardDao.addDashBoard(dashboard)
    }
    async updateDashboard(dashboard:any){
        return await this.dasboardDao.updateDashboard(dashboard)
    }
    async deleteAllDashBoars(){
        return await this.dasboardDao.deleteAllDashBoars()
    }
    async deleteDashboard(id:string){   
        return await this.dasboardDao.deleteDashboard(id)
    }
}
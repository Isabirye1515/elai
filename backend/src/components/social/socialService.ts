import SocialDaoImpl from "./SocialDaoImp";
import Socials from "./socials";
import { SocialDao } from "./socialsdao";

export default class SocialService {
    public socialDao:SocialDao
    constructor(){
        this.socialDao=new SocialDaoImpl()
    }
    async getAllSocials():Promise<any>{
        return await this.socialDao.getAllSocials()
    }
    async getSocialById(id:string):Promise<Socials>{
        return await this.socialDao.getSocialById(id)
    }
    async deleteSocialById(id:string):Promise<void>{
        return await this.socialDao.deleteSocialById(id)
    }
    async deleteAllSocials():Promise<void>{
        return await this.socialDao.deleteAllSocials()
    }
    async updateSocials(social:Socials):Promise<Socials>{
        return await this.socialDao.updateSocials(social)
    }
    async addSocial(social:Socials):Promise<void>{
        return await this.socialDao.addSocial(social)
    }
    

}
import About from "./about";
import AboutDao from "./AboutDao";
import { Dao } from "./dao";

export default class AboutService implements Dao {
  private dao: AboutDao;

  constructor() {
    this.dao = new AboutDao();
  }

  async getAllAbout(): Promise<About[]> {
    return this.dao.getAllAbout();
  }

  async getAboutById(id: string): Promise<About> {
    return this.dao.getAboutById(id);
  }

  async deleteAbout(id: string): Promise<void> {
    return this.dao.deleteAbout(id);
  }

  async addAbout(about: About): Promise<void> {
    return this.dao.addAbout(about);
  }

  async updateAbout(about: About): Promise<About> {
    return this.dao.updateAbout(about);
  }
}

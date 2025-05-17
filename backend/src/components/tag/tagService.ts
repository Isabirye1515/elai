import Tag from './tag';
import { tagDao } from './tagDao';
import TagDaoImpl from './tagDaoImpl';

export default class TagService {
  private tagDao: tagDao;

  constructor() {
    this.tagDao = new TagDaoImpl();
  }

  async getAllTags(): Promise<Tag[]> {
    return await this.tagDao.getAllTags();
  }

  async getTagById(id: string): Promise<Tag> {
    return await this.tagDao.getTagById(id);
  }

  async addTag(tag: Tag): Promise<void> {
    await this.tagDao.addTag(tag);
  }

  async updateTag(tag: Tag): Promise<Tag> {
    return await this.tagDao.updateTag(tag);
  }

  async deleteAllTags(): Promise<void> {
    await this.tagDao.deleteAllTags();
  }

  async deleteTagById(id: string): Promise<void> {
    await this.tagDao.deleteTagById(id);
  }
}

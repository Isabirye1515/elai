import Tag from "./tag";

export interface tagDao{
    getAllTags():Promise<Tag[]>
    getTagById(id:string):Promise<Tag>
    deleteAllTags():Promise<void>
    deleteTagById(id:string):Promise<void>
    updateTag(tag:Tag):Promise<Tag>
    addTag(tag:Tag):Promise<void>
}
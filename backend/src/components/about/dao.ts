import About from "./about";

export interface Dao{
    getAllAbout(): Promise<About[]>
    getAboutById(id: string): Promise<About>
    deleteAbout(id: string): Promise<void>
    addAbout(about: About): Promise<void>
    updateAbout(about: About): Promise<About>
}
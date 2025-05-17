import Socials from './socials'
export interface SocialDao {
    getAllSocials(): Promise<Socials[]>
    getSocialById(id: string):Promise<Socials>
    deleteSocialById(id: string): Promise<void>
    deleteAllSocials(): Promise<void>
    updateSocials(social: Socials): Promise<Socials>
    addSocial(social: Socials): Promise<void>
}
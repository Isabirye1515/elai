import Contact from "./Contact";

export interface contactDao{
    getAllContacts():Promise<Contact[]>
    getContactById(id:string):Promise<Contact>
    addContact(contact:Contact):Promise<void>
    deleteAllContacts():Promise<void>
    deleteContactById(id:string):Promise<void>
    updateContact(contact:Contact):Promise<Contact>
}
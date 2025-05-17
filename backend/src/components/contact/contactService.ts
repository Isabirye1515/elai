import Contact from "./Contact";
import { contactDao } from "./contactDao";
import ContactDaoImpl from "./contactDaoImpl";  // Importing your DAO implementation

export default class ContactService {
    private contactDao: contactDao;

    constructor() {
        this.contactDao = new ContactDaoImpl();
    }

    // Get all contacts
    async getAllContacts(): Promise<Contact[]> {
        return await this.contactDao.getAllContacts();
    }

    // Get contact by id
    async getContactById(id: string): Promise<Contact> {
        return await this.contactDao.getContactById(id);
    }

    // Add a new contact
    async addContact(contact: Contact): Promise<void> {
        await this.contactDao.addContact(contact);
    }

    // Delete all contacts
    async deleteAllContacts(): Promise<void> {
        await this.contactDao.deleteAllContacts();
    }

    // Delete a contact by id
    async deleteContactById(id: string): Promise<void> {
        await this.contactDao.deleteContactById(id);
    }

    // Update a contact
    async updateContact(contact: Contact): Promise<Contact> {
        return await this.contactDao.updateContact(contact);
    }
}

import express, { Request, Response } from 'express';
import ContactService from './contactService';
import Contact from './Contact';

const router = express.Router();

// Initialize the ContactService
const contactService = new ContactService();

// Get all contacts
router.get('/', async (req: Request, res: Response) => {
    try {
        const contacts = await contactService.getAllContacts();
        res.status(200).json(contacts);
    } catch (error) {
        console.error('Error fetching contacts:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Get a contact by ID
router.get('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const contact = await contactService.getContactById(id);
        if (contact) {
            res.status(200).json(contact);
        } else {
            res.status(404).json({ message: 'Contact not found' });
        }
    } catch (error) {
        console.error('Error fetching contact by ID:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Add a new contact
router.post('/', async (req: Request, res: Response) => {
    const { name, uniqId, person }: { name: string; uniqId: string; person: any } = req.body;

    const newContact = new Contact(name, uniqId, person);
    newContact.name = name;
    newContact.uniqId = uniqId;
    newContact.person = person;

    try {
        await contactService.addContact(newContact);
        res.status(201).json({ message: 'Contact created successfully' });
    } catch (error) {
        console.error('Error adding contact:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Update message
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const mess = { ...req.body, id: req.params.id };
    const updated = await contactService.updateContact(mess);
    res.status(200).json(updated);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a contact by ID
router.delete('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await contactService.deleteContactById(id);
        res.status(200).json({ message: 'Contact deleted successfully' });
    } catch (error) {
        console.error('Error deleting contact:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Delete all contacts
router.delete('/', async (req: Request, res: Response) => {
    try {
        await contactService.deleteAllContacts();
        res.status(200).json({ message: 'All contacts deleted successfully' });
    } catch (error) {
        console.error('Error deleting all contacts:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;

import express, { Request, Response } from 'express';
import MessageService from './messageService';
import Message from './message';

const router = express.Router();
const messageService = new MessageService();

// Get all messages
router.get('/', async (req: Request, res: Response) => {
    try {
        const messages = await messageService.getAllMessages();
        res.json(messages);
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ message: 'Error fetching messages' });
    }
});

// Get message by ID
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const mess = await messageService.getMessageById(req.params.id);
    res.status(200).json(mess);
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
});

// Add a new message
router.post('/', async (req: Request, res: Response) => {
    try {
        const { name, email, subject, message, type } = req.body;
        const newMessage = new Message(name, email, subject, message, new Date(), new Date(), type);
        await messageService.addMessage(newMessage);
        res.status(201).json({ message: 'Message created successfully' });
    } catch (error) {
        console.error('Error adding message:', error);
        res.status(500).json({ message: 'Error creating message' });
    }
});

// Update message
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const mess = { ...req.body, id: req.params.id };
    const updated = await messageService.updateMessage(mess);
    res.status(200).json(updated);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Delete by ID
router.delete('/:id', async (req: Request, res: Response) => {
    try {
        await messageService.deleteMessage(req.params.id);
        res.status(200).json({ message: 'Message deleted successfully' });
    } catch (error) {
        console.error('Error deleting message:', error);
        res.status(500).json({ message: 'Error deleting message' });
    }
});

// Delete all
router.delete('/', async (req: Request, res: Response) => {
    try {
        await messageService.deleteAllMessages();
        res.status(200).json({ message: 'All messages deleted successfully' });
    } catch (error) {
        console.error('Error deleting messages:', error);
        res.status(500).json({ message: 'Error deleting all messages' });
    }
});

export default router;

import express, { Request, Response } from 'express';
import AboutService from './AboutService';
import About from './about';

const router = express.Router();
const aboutService = new AboutService();

// GET /api/about/ - Get all About records
router.get('/', async (req: Request, res: Response) => {
  try {
    const aboutList = await aboutService.getAllAbout();
    res.status(200).json(aboutList);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const about = await aboutService.getAboutById(id);
        if (about) {
            res.status(200).json(about);
        } else {
            res.status(404).json({ message: 'Contact not found' });
        }
    } catch (error) {
        console.error('Error fetching contact by ID:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// POST /api/about/ - Add About
router.post('/', async (req: Request, res: Response) => {
  try {
    const aboutData: About = req.body;
    await aboutService.addAbout(aboutData);
    res.status(201).json({ message: 'About added successfully' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/about/:id - Update About
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const updatedAbout = { ...req.body, id: req.params.id };
    const updated = await aboutService.updateAbout(updatedAbout);
    res.status(200).json(updated);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /api/about/:id - Delete About
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    await aboutService.deleteAbout(req.params.id);
    res.status(200).json({ message: 'About deleted successfully' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

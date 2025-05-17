import express, { Request, Response } from 'express';
import TagService from './tagService';

const router = express.Router();
const tagService = new TagService();

/**
 * Endpoint to get all tags.
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    const tags = await tagService.getAllTags();
    res.status(200).json(tags);
  } catch (error: string | any) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * Endpoint to get a tag by ID.
 */
router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const tag = await tagService.getTagById(id);
    res.status(200).json(tag);
  } catch (error: string | any) {
    res.status(404).json({ message: error.message });
  }
});

/**
 * Endpoint to add a new tag.
 */
router.post('/', async (req: Request, res: Response) => {
  const tag = req.body;
  try {
    await tagService.addTag(tag);
    res.status(201).json({ message: 'Tag added successfully' });
  } catch (error: string | any) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * Endpoint to update a tag.
 */
router.put('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedTag = req.body;
  updatedTag.id = id;
  try {
    const tag = await tagService.updateTag(updatedTag);
    res.status(200).json(tag);
  } catch (error:string | any) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * Endpoint to delete a tag.
 */
router.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await tagService.deleteTagById(id);
    res.status(200).json({ message: 'Tag deleted successfully' });
  } catch (error: string | any) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * Endpoint to delete all tags.
 */
router.delete('/', async (req: Request, res: Response) => {
  try {
    await tagService.deleteAllTags();
    res.status(200).json({ message: 'All tags deleted successfully' });
  } catch (error: string | any) {
    res.status(500).json({ message: error.message });
  }
});

export default router;

import express, { Request, Response } from "express";
import SocialService from "./socialService";
import Socials from "./socials";

const router = express.Router();
const socialService = new SocialService();

// GET /socials - Get all socials
router.get("/", async (req: Request, res: Response) => {
  try {
    const socials = await socialService.getAllSocials();
    res.status(200).json(socials);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// GET /socials/:id - Get a social by ID
router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const social = await socialService.getSocialById(id);
    res.status(200).json(social);
  } catch (err: any) {
    res.status(404).json({ error: err.message });
  }
});

// POST /socials - Add a new social
router.post("/", async (req: Request, res: Response) => {
  const social: Socials = req.body;
  try {
    await socialService.addSocial(social);
    res.status(201).json({ message: "Social added successfully" });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// PUT /socials/:id - Update a social
router.put("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedSocial: Socials = { ...req.body, id };
  try {
    const result = await socialService.updateSocials(updatedSocial);
    res.status(200).json(result);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /socials/:id - Delete a social by ID
router.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await socialService.deleteSocialById(id);
    res.status(200).json({ message: "Social deleted successfully" });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /socials - Delete all socials
router.delete("/", async (req: Request, res: Response) => {
  try {
    await socialService.deleteAllSocials();
    res.status(200).json({ message: "All socials deleted successfully" });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

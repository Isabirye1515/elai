import express, { Request, Response } from "express";
import DashboardService from "./dashboardSercice";

const router = express.Router();
const dashboardService = new DashboardService();

// GET /dashboards
router.get("/", async (req: Request, res: Response) => {
  try {
    const dashboards = await dashboardService.getAllDashBoards();
    res.status(200).json(dashboards);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// GET /dashboards/:id
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const dashboard = await dashboardService.getDashBoardById(req.params.id);
    res.status(200).json(dashboard);
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
});

// POST /dashboards
router.post("/", async (req: Request, res: Response) => {
  try {
    await dashboardService.addDashBoard(req.body);
    res.status(201).json({ message: "Dashboard added successfully" });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// PUT /dashboards/:id
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const dashboard = { ...req.body, id: req.params.id };
    const updated = await dashboardService.updateDashboard(dashboard);
    res.status(200).json(updated);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE /dashboards/:id
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    await dashboardService.deleteDashboard(req.params.id);
    res.status(200).json({ message: "Dashboard deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /dashboards
router.delete("/", async (_req: Request, res: Response) => {
  try {
    await dashboardService.deleteAllDashBoars();
    res.status(200).json({ message: "All dashboards deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;

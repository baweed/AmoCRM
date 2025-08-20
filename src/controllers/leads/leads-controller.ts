import { Request, Response } from "express";
import { LeadsService } from "../../services/leads/leads-service";

export class LeadsController {
  constructor(
    private readonly leadsService: LeadsService
  ) { }

  async getAllLeads(req: Request, res: Response) {
    try {
      const leads = await this.leadsService.getAllLeads();
      
      res.json(leads);
    } catch (error: any) {
      res.status(500).json({
        error: "Ошибка при получении сделок",
        details: error.message,
      });
    }
  }

  async createLead(req: Request, res: Response) {
    try {
      const newLead = await this.leadsService.createLead(req.body);

      res.status(201).json(newLead);
    } catch (error: any) {
      res.status(400).json({
        error: "Ошибка при создании сделки",
        details: error.message,
      });
    }
  }
}

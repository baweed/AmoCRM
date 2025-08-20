import { Request, Response } from "express";
import { WebhookService } from "../../services/webhooks/webhook-service";

export class LeadWebhookController {
  constructor(
    private readonly webhookService: WebhookService
  ) { }

  async patchLeadInCRM(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updateData = req.body;

      console.log('Получен PATCH запрос для лида:', { id, updateData });

      const result = await this.webhookService.patchEntityInCRM('leads', id, updateData);

      res.json({
        success: true,
        message: "Лид успешно обновлен в CRM",
        data: result
      });
    } catch (error: any) {
      console.error("Ошибка при обновлении лида в CRM:", error);
      res.status(500).json({
        error: "Ошибка при обновлении лида в CRM",
        details: error.message || "Unknown error",
      });
    }
  }
}
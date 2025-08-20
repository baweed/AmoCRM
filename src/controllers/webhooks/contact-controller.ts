import { Request, Response } from "express";
import { WebhookService } from "../../services/webhooks/webhook-service";

export class ContactWebhookController {
  constructor(
    private readonly webhookService: WebhookService
  ) { }

  async patchContactInCRM(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updateData = req.body;

      console.log('Получен PATCH запрос для контакта:', { id, updateData });

      const result = await this.webhookService.patchEntityInCRM('contacts', id, updateData);

      res.json({
        success: true,
        message: "Контакт успешно обновлен в CRM",
        data: result
      });
    } catch (error: any) {
      console.error("Ошибка при обновлении контакта в CRM:", error);
      res.status(500).json({
        error: "Ошибка при обновлении контакта в CRM",
        details: error.message || "Unknown error",
      });
    }
  }
}
import { Request, Response } from "express";
import { WebhookService } from "../../services/webhooks/webhook-service";

export class WebhookController {
  constructor(
    private readonly webhookService: WebhookService
  ) { }

  async handleWebhook(req: Request, res: Response) {
    try {
      const { account, leads, contacts } = req.body;

      await this.webhookService.saveAccount(account);

      if (leads?.add?.length > 0) {
        await this.webhookService.saveLeads(leads.add);
      }

      if (leads?.update?.length > 0) {
        await this.webhookService.saveLeads(leads.update);
      }

      if (contacts?.add?.length > 0) {
        await this.webhookService.saveContacts(contacts.add);
      }
      
      if (contacts?.update?.length > 0) {
        await this.webhookService.saveContacts(contacts.update);
      }

      console.log("Webhook обработан успешно");
      res.status(200).send("ok");
    } catch (error) {
      console.error("Ошибка при сохранении webhook:", error);
      res.status(500).send("error");
    }
  }

  async getWebhooks(req: Request, res: Response) {
    try {
      const data = await this.webhookService.getWebhooks();
      res.json(data);
    } catch (error: any) {
      res.status(500).json({
        error: "Ошибка при получении вебхуков",
        details: error.message || "Unknown error",
      });
    }
  }
}
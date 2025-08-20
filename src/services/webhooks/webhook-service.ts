import apiClient from "../../utils/apiClient";
import { updateTokens } from "../../utils/token";
import { AccountWebhookService } from "./account-service";
import { ContactWebhookService } from "./contact-service";
import { LeadWebhookService } from "./lead-service";


export class WebhookService {
  constructor(
    private readonly accountWebhookService: AccountWebhookService,
    private readonly contactWebhookService: ContactWebhookService,
    private readonly leadWebhookService: LeadWebhookService
  ) {}

  async saveAccount(account: any) {
    return this.accountWebhookService.saveAccount(account);
  }

  async saveLeads(leads: any[]) {
    return this.leadWebhookService.saveLeads(leads);
  }

  async saveContacts(contacts: any[]) {
    return this.contactWebhookService.saveContacts(contacts);
  }

  async patchEntityInCRM(entityType: 'leads' | 'contacts', id: string, updateData: any) {
    const { access } = await updateTokens();
    if (!access) {
      throw new Error("Access token не валидный");
    }

    const dataToUpdate = Array.isArray(updateData) ? updateData[0] : updateData;

    const requestItem: any = {
      id: parseInt(id)
    };

    Object.keys(dataToUpdate).forEach(key => {
      if (key !== 'id') {
        requestItem[key] = dataToUpdate[key];
      }
    });

    const requestData = [requestItem];

    console.log('Отправка в AmoCRM:', JSON.stringify(requestData, null, 2));

    try {
      const response = await apiClient.patch(
        `/api/v4/${entityType}`,
        requestData,
        {
          headers: {
            Authorization: `Bearer ${access}`,
            'Content-Type': 'application/json'
          },
        }
      );

      console.log('Ответ от AmoCRM:', JSON.stringify(response.data, null, 2));
      return response.data;

    } catch (error: any) {
      console.error('Ошибка AmoCRM:', error.response?.data || error.message);
      throw error;
    }
  }

  async getWebhooks() {
    const { access } = await updateTokens();
    if (!access) {
      throw new Error("Access token не валидный");
    }

    const response = await apiClient.get("/api/v4/webhooks", {
      headers: { Authorization: `Bearer ${access}` },
    });

    return response.data;
  }
}
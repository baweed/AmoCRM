import apiClient from "../../utils/apiClient";
import { updateTokens } from "../../utils/token";

export class LeadsService {
  async getAllLeads() {
    const { access } = await updateTokens();
    if (!access) throw new Error("Access token не валидный");

    const response = await apiClient.get("/api/v4/leads", {
      headers: { Authorization: `Bearer ${access}` },
    });

    return response.data;
  }

  async searchLeadByName(name: string) {
    const { access } = await updateTokens();
    if (!access) throw new Error("Access token не валидный");

    const response = await apiClient.get(`/api/v4/leads`, {
      headers: { Authorization: `Bearer ${access}` },
      params: { query: name },
    });

    return response.data._embedded?.leads || [];
  }

  async createLead(leadData: any) {
    const { access } = await updateTokens();
    if (!access) throw new Error("Access token не валидный");

    if (!leadData.name) {
      throw new Error("Поле name обязательно для создания сделки");
    }

    const existing = await this.searchLeadByName(leadData.name);
    if (existing.length > 0) {
      throw new Error(`Сделка с именем "${leadData.name}" уже существует`);
    }

    const response = await apiClient.post(
      "/api/v4/leads",
      [leadData],
      {
        headers: { Authorization: `Bearer ${access}` },
      }
    );

    return response.data;
  }
}

import { LeadModel } from "../../models/webhooks/lead-model";
import { LeadPayload } from "./interfaces/lead-interface";

export class LeadWebhookService {
  constructor( private leadModel: LeadModel) {}

  async saveLeads(leads: LeadPayload[]) {
    for (const lead of leads) {
      await this.leadModel.upsertLead({
        id: parseInt(lead.id),
        name: lead.name,
        statusId: parseInt(lead.status_id),
        price: parseFloat(lead.price),
        responsibleUserId: parseInt(lead.responsible_user_id),
        lastModified: parseInt(lead.last_modified),
        modifiedUserId: parseInt(lead.modified_user_id),
        createdUserId: parseInt(lead.created_user_id),
        dateCreate: parseInt(lead.date_create),
        pipelineId: parseInt(lead.pipeline_id),
        accountId: parseInt(lead.account_id),
        createdAt: parseInt(lead.created_at),
        updatedAt: parseInt(lead.updated_at),
      });
    }
  }
}
import { ContactModel } from "../../models/webhooks/contact-model";
import { ContactPayload } from "./interfaces/contact-interface";

export class ContactWebhookService {
  constructor(private readonly contactModel: ContactModel) {}

  async saveContacts(contacts: ContactPayload[]) {
    for (const contact of contacts) {
      await this.contactModel.upsertContact({
        id: parseInt(contact.id),
        name: contact.name,
        responsibleUserId: parseInt(contact.responsible_user_id),
        groupId: parseInt(contact.group_id),
        dateCreate: parseInt(contact.date_create),
        lastModified: parseInt(contact.last_modified),
        createdUserId: parseInt(contact.created_user_id),
        modifiedUserId: parseInt(contact.modified_user_id),
        phone: contact.custom_fields?.find(f => f.code === "PHONE")?.values?.[0]?.value ?? null,
        email: contact.custom_fields?.find(f => f.code === "EMAIL")?.values?.[0]?.value ?? null,
        accountId: parseInt(contact.account_id),
        createdAt: parseInt(contact.created_at),
        updatedAt: parseInt(contact.updated_at),
      });
    }
  }
}
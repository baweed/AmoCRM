import apiClient from "../../utils/apiClient";
import { updateTokens } from "../../utils/token";

export class ContactsService {
    async getAllContacts() {
        const { access } = await updateTokens();
        if (!access) throw new Error("Access token не валидный");

        const response = await apiClient.get("/api/v4/contacts", {
            headers: { Authorization: `Bearer ${access}` },
        });
        return response.data;
    }

    async searchContacts(query: string) {
        const { access } = await updateTokens();
        if (!access) throw new Error("Access token не валидный");

        const response = await apiClient.get("/api/v4/contacts", {
            headers: { Authorization: `Bearer ${access}` },
            params: { query },
        });

        return response.data?._embedded?.contacts || [];
    }

    async createContact(contactData: any) {
        const { access } = await updateTokens();
        if (!access) throw new Error("Access token не валидный");

        const contact = Array.isArray(contactData) ? contactData[0] : contactData;

        const phone = contact?.custom_fields_values?.find(
            (f: any) => f.field_code === "PHONE"
        )?.values?.[0]?.value;

        if (!phone) {
            throw new Error("Поле phone обязательно для создания контакта");
        }

        const existing = await this.searchContacts(phone);
        if (existing.length > 0) {
            throw new Error(`Контакт с телефоном "${phone}" уже существует`);
        }

        const response = await apiClient.post("/api/v4/contacts", [contact], {
            headers: {
                Authorization: `Bearer ${access}`,
                "Content-Type": "application/json",
            },
        });

        return response.data;
    }
}

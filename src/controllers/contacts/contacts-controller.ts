import { Request, Response } from "express";
import { ContactsService } from "../../services/contacts/contacts-service";

export class ContactsController {

  constructor(
    private readonly contactsService: ContactsService
  ) { }

  async getAllContacts(req: Request, res: Response) {
    try {
      const contacts = await this.contactsService.getAllContacts();
      res.json(contacts);
    } catch (error: any) {
      res.status(500).json({
        error: "Ошибка при получении контактов",
        details: error.message,
      });
    }
  }

  async createContact(req: Request, res: Response) {
    try {
      const newContact = await this.contactsService.createContact(req.body);
      res.status(201).json(newContact);
    } catch (error: any) {
      res.status(400).json({
        error: "Ошибка при создании контакта",
        details: error.message,
      });
    }
  }
}

import { Router } from "express";
import { WebhookService } from "../services/webhooks";
import { ContactsService } from "../services/contacts";
import { LeadsService } from "../services/leads";
import { ContactWebhookController, LeadWebhookController, WebhookController } from "../controllers/webhooks";
import { ContactsController } from "../controllers/contacts";
import { LeadsController } from "../controllers/leads";
import { ContactWebhookService } from "../services/webhooks/contact-service";
import { AccountWebhookService } from "../services/webhooks/account-service";
import {LeadWebhookService} from "../services/webhooks/lead-service";
import { AccountModel, ContactModel, LeadModel } from "../models/webhooks";

const router = Router();

export const routerWebhook = Router();
const accountWebhookService = new AccountWebhookService(new AccountModel());
const contactWebhookService = new ContactWebhookService(new ContactModel());
const leadWebhookService = new LeadWebhookService(new LeadModel());

// Теперь создаем WebhookService с требуемыми аргументами
const webhookService = new WebhookService(accountWebhookService, contactWebhookService, leadWebhookService);
const contactsService = new ContactsService();
const leadsService = new LeadsService();

// Инициализация контроллеров
const webhookController = new WebhookController(webhookService);
const contactsWebhookController = new ContactWebhookController(webhookService);
const leadsWebhookController = new LeadWebhookController(webhookService);
const contactsController = new ContactsController(contactsService);
const leadsController = new LeadsController(leadsService);

routerWebhook.post("/webhook", webhookController.handleWebhook.bind(webhookController));

router.get("/v4/webhooks", webhookController.getWebhooks.bind(webhookController));

router.patch("/v4/contacts/:id", contactsWebhookController.patchContactInCRM.bind(contactsWebhookController));
router.patch("/v4/leads/:id", leadsWebhookController.patchLeadInCRM.bind(leadsWebhookController));


router.get("/v4/contacts", contactsController.getAllContacts.bind(contactsController));
router.post("/v4/contacts", contactsController.createContact.bind(contactsController));
router.get('/v4/leads', leadsController.getAllLeads.bind(leadsController));
router.post('/v4/leads', leadsController.createLead.bind(leadsController));

export default router;


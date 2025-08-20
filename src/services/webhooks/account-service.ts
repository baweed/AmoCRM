import { AccountModel } from "../../models/webhooks/account-model";
import { AccountPayload } from "./interfaces/account-interface";

export class AccountWebhookService {
  constructor(private accountModel: AccountModel) {}

  async saveAccount(account: AccountPayload) {
    return this.accountModel.upsertAccount({
      id: parseInt(account.id),
      subdomain: account.subdomain,
      selfLink: account._links.self,
    });
  }
}
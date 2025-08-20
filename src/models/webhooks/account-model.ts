import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class AccountModel {
  async upsertAccount(data: { id: number; subdomain: string; selfLink: string }) {
    return prisma.account.upsert({
      where: { id: data.id },
      update: {
        subdomain: data.subdomain,
        selfLink: data.selfLink
      },
      create: data
    });
  }
}
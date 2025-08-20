import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class LeadModel {
  async upsertLead(data: any) {
    return prisma.webhook.upsert({
      where: { id: data.id },
      update: data,
      create: data
    });
  }
}
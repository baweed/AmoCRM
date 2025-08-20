import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class ContactModel {

  async upsertContact(data: any) {
    return prisma.contact.upsert({
      where: { id: data.id },
      update: data,
      create: data
    });
  }
}
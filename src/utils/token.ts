import { PrismaClient } from '@prisma/client';
import * as process from 'process';
import apiClient from './apiClient';

const { INTEGRATION_ID, SECRET_KEY, REDIRECT_URI } = process.env;

const prisma = new PrismaClient();

type AuthCodeResponse = {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  token_type: 'Bearer';
};

export async function registerCode(code: string) {
  const { data: tokens } = await apiClient.post<AuthCodeResponse>(
    '/oauth2/access_token',
    {
      client_id: INTEGRATION_ID,
      client_secret: SECRET_KEY,
      code,
      grant_type: 'authorization_code',
      redirect_uri: REDIRECT_URI,
    },
  );

  await prisma.token.deleteMany();

  await prisma.token.create({
    data: {
      access: tokens.access_token,
      expiresIn: tokens.expires_in,
      refresh: tokens.refresh_token,
    },
  });
}

export async function getTokens() {
  const res = await prisma.token.findFirst({
    orderBy: { id: 'desc' },
  });

  if (!res) throw new Error('No tokens found');

  return res;
}

async function isTokenValid() {
  const tokens = await getTokens();

  if (!tokens.expiresIn) {
    return false;
  }

  return (
    Date.now() + tokens.expiresIn * 1000 - tokens.createdAt.getTime() > 0
  );
}

export async function updateTokens() {
  if (await isTokenValid()) return await getTokens();

  const { refresh: refreshToken } = await getTokens();

  const { data: tokens } = await apiClient.post<AuthCodeResponse>(
    '/oauth2/access_token',
    {
      client_id: INTEGRATION_ID,
      client_secret: SECRET_KEY,
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
      redirect_uri: REDIRECT_URI,
    },
  );

  await prisma.token.deleteMany();

  await prisma.token.create({
    data: {
      access: tokens.access_token,
      expiresIn: tokens.expires_in,
      refresh: tokens.refresh_token,
    },
  });

  return await getTokens();
}

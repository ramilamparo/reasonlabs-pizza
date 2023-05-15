import * as dotenv from 'dotenv';
dotenv.config();

export const DOUGH_CHEF_INTERVAL = 7000;
export const TOPPING_CHEF_INTERVAL = 4000;
export const OVEN_INTERVAL = 10000;
export const WAITER_INTERVAL = 5000;

export const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;
export const DATABASE_NAME = process.env.DATABASE_NAME as string;
export const DATABASE_HOST = process.env.DATABASE_HOST as string;
export const DATABASE_PORT = process.env.DATABASE_PORt
  ? parseInt(process.env.DATABASE_PORt)
  : undefined;
export const DATABASE_USER = process.env.DATABASE_USER as string;
export const DATABASE_PASS = process.env.DATABASE_PASS as string;

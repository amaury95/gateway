import dotenv from "dotenv";

dotenv.config();

export const env: string = process.env.NODE_ENV;
export const host: string = process.env.NODE_HOST;
export const port: number = JSON.parse(process.env.NODE_PORT);

export const dbaddr = (db: string) => process.env.MONGO_ADDR + "/" + db;

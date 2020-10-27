import dotenv from "dotenv";

dotenv.config();

export const env = process.env.NODE_ENV;

export const port = process.env.NODE_PORT;

export const dbaddr = (db: string) => process.env.MONGO_ADDR + "/" + db;

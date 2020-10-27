import dotenv from "dotenv";

dotenv.config();

export const env: string = process.env.NODE_ENV || "development";
export const host: string = process.env.NODE_HOST || "localhost";
export const port: number = JSON.parse(process.env.NODE_PORT) || 8000;
export const mongoAddr: string = process.env.MONGO_ADDR || "mongodb://localhost";

export const dbaddr = (db: string) => mongoAddr + "/" + db;

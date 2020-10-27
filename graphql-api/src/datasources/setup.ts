import dotenv from "dotenv";

dotenv.config();

export const addr = process.env.SERVER_ADDRESS || "http://localhost:8000/api/";

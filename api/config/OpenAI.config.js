import { OpenAI } from "openai";
import dotenv from "dotenv";
dotenv.config();

// export const openai = new OpenAI({
//   apiKey: process.env.OPENAI_SECRET_KEY,
// });

export const openai = new OpenAI({
  baseURL: "https://api.deepseek.com",
  apiKey: process.env.DEEPSEEK_SECRET_KEY,
});

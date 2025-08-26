
import { GoogleGenAI } from "@google/genai";
import { PERSONALITY_PROMPT } from '../constants';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateReply = async (message: string): Promise<string> => {
  try {
    const prompt = `Draft a reply to this message: "${message}"`;

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            systemInstruction: PERSONALITY_PROMPT,
        }
    });

    return response.text;
  } catch (error) {
    console.error("Error generating reply:", error);
    return "I'm sorry, I'm having a little trouble thinking of a reply right now. Please try again later.";
  }
};

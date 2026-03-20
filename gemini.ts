
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";

const getAIClient = () => {
  if (!process.env.API_KEY) {
    throw new Error("API Key is missing. Please ensure process.env.API_KEY is configured.");
  }
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const getPlantAdvice = async (userQuery: string, imageBase64?: string): Promise<string> => {
  const ai = getAIClient();
  const model = "gemini-3-flash-preview";
  
  const systemPrompt = `You are "Bloom", an expert botanist and plant doctor for an online boutique flower shop called Alchemy of Petals.
    Your goal is to help customers choose the right flower plants or diagnose issues with their current plants.
    Be encouraging, professional, and poetic in your descriptions.
    If a user asks for recommendations, suggest plants that fit their environment (light, space, effort).
    If a user provides a photo, analyze it for signs of pests, dehydration, or overwatering.
    Keep responses concise and well-formatted with bullet points if needed.`;

  const contents: any[] = [];
  
  if (imageBase64) {
    contents.push({
      inlineData: {
        mimeType: "image/jpeg",
        data: imageBase64
      }
    });
  }
  
  contents.push({ text: userQuery });

  try {
    const result = await ai.models.generateContent({
      model,
      contents: { parts: contents },
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.7,
      }
    });
    return result.text || "I'm sorry, I couldn't generate a response. Please try again.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I am currently taking a small break in the garden. Please try asking again in a moment!";
  }
};

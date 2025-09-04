
import { GoogleGenAI, Type } from "@google/genai";
import { MindMapResponse } from '../types';

const mindMapNodeSchema = {
  type: Type.OBJECT,
  properties: {
    label: {
      type: Type.STRING,
      description: 'The label for this node or concept.',
    },
  },
  required: ['label'],
};

// We need to define children recursively, but the schema system doesn't directly support it.
// We define it up to a few levels deep, which is usually sufficient for a good mind map.
const mindMapNodeWithChildrenSchema = {
  ...mindMapNodeSchema,
  properties: {
    ...mindMapNodeSchema.properties,
    children: {
      type: Type.ARRAY,
      description: 'Sub-branches or child concepts for this node.',
      items: {
        ...mindMapNodeSchema,
        properties: {
          ...mindMapNodeSchema.properties,
          children: {
            type: Type.ARRAY,
            description: 'Sub-branches for the second-level node.',
            items: mindMapNodeSchema,
          },
        },
      },
    },
  },
};

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    root: {
      type: Type.OBJECT,
      description: 'The central root node of the mind map.',
      properties: mindMapNodeWithChildrenSchema.properties,
      required: ['label', 'children'],
    },
  },
  required: ['root'],
};

let ai: GoogleGenAI | null = null;

// Lazily initialize the Gemini client to avoid crashing on load if the API key isn't set.
const getAiClient = (): GoogleGenAI => {
    if (ai) {
        return ai;
    }

    // Safely access the API key to prevent "process is not defined" errors in browser environments.
    const API_KEY = typeof process !== 'undefined' ? process.env.API_KEY : undefined;

    if (!API_KEY) {
        throw new Error("API_KEY environment variable is not set. Please configure it in your deployment environment.");
    }

    ai = new GoogleGenAI({ apiKey: API_KEY });
    return ai;
};

export const generateMindMap = async (topic: string): Promise<MindMapResponse> => {
  try {
    const aiClient = getAiClient();
    
    const prompt = `Based on the central topic "${topic}", generate a structured mind map. Provide a root node with several main branches (children), and each main branch should have its own sub-branches (children). Format the output as a JSON object that adheres to the provided schema. The language of the output should be the same as the topic provided.`;
    
    const response = await aiClient.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      },
    });

    const jsonText = response.text.trim();
    const parsedData = JSON.parse(jsonText);
    
    // Basic validation
    if (!parsedData.root || !parsedData.root.label) {
      throw new Error("Invalid mind map structure received from API.");
    }
    
    return parsedData as MindMapResponse;

  } catch (error) {
    console.error("Error generating mind map:", error);
    // Re-throw the original error to be handled by the UI component, which will display the message.
    throw error;
  }
};

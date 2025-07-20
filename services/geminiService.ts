
import { GoogleGenAI } from "@google/genai";
import type { Language } from '../types';

const API_KEY = process.env.API_KEY;

let ai: GoogleGenAI | null = null;
if (API_KEY) {
    ai = new GoogleGenAI({ apiKey: API_KEY });
} else {
    console.warn("API_KEY environment variable not set. AI features will be disabled.");
}

export const generateAgencyManifesto = async (language: Language): Promise<string> => {
  if (!ai) {
    return "AI feature not available. API key is missing.";
  }

  const langMap = {
      fr: 'French',
      en: 'English',
      ar: 'Arabic'
  };

  try {
    const prompt = `
      Act as a world-class creative director for a cutting-edge branding agency in Morocco.
      Write a short, powerful, and inspiring manifesto (3-4 sentences).
      The manifesto should be about breaking conventions, digital innovation, and creating bold brands that dominate the market.
      The tone should be confident, modern, and slightly audacious.
      The target audience is ambitious entrepreneurs and marketing directors.
      VERY IMPORTANT: Write the entire response ONLY in ${langMap[language]}.
      Do not include any pre-amble, titles, quotation marks, or markdown formatting. Just the raw text of the manifesto.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        // Optimizing for low latency in this interactive feature by disabling thinking.
        thinkingConfig: { thinkingBudget: 0 }
      }
    });
    
    return response.text;
  } catch (error) {
    console.error("Error generating content with Gemini:", error);
    if (language === 'fr') return "Erreur lors de la génération du contenu. Veuillez vérifier la console.";
    if (language === 'ar') return "حدث خطأ أثناء إنشاء المحتوى. يرجى مراجعة وحدة التحكم.";
    return `Error generating content. Please check the console for details.`;
  }
};

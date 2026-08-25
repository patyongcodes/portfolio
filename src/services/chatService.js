import Groq from 'groq-sdk';
import { SYSTEM_PROMPT } from '../data/knowledgeBase';

export async function sendMessageToPatrick(userMessage, chatHistory = []) {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY;

  if (!apiKey) {
    return "Missing Groq API key in .env.local. Please add your key and restart dev server.";
  }

  try {
    const groq = new Groq({ 
      apiKey,
      dangerouslyAllowBrowser: true 
    });

    const formattedHistory = chatHistory
      .filter((msg) => msg.text)
      .map((msg) => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.text,
      }));

    const messagesPayload = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...formattedHistory,
      { role: 'user', content: userMessage },
    ];

    // Fetch active models dynamically from your Groq account
    const modelsList = await groq.models.list();
    const activeTextModels = modelsList.data
      .map((m) => m.id)
      .filter((id) => !id.includes('whisper') && !id.includes('safeguard'));

    if (activeTextModels.length === 0) {
      return "API Error: No active text models found on your Groq account.";
    }

    // Try available active text models until one succeeds
    for (const modelId of activeTextModels) {
      try {
        const completion = await groq.chat.completions.create({
          messages: messagesPayload,
          model: modelId,
          temperature: 0.7,
        });
        return completion.choices[0]?.message?.content || 'No response returned.';
      } catch (err) {
        continue; // Fallback to the next active model if one fails
      }
    }

    return "API Error: Unable to complete request with available models.";
  } catch (error) {
    console.error('Groq API Error:', error);
    return `API Error: ${error.message || 'Failed to connect to Groq.'}`;
  }
}
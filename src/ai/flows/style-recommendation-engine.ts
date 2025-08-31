// This is a server-side file.
'use server';

/**
 * @fileOverview Provides personalized product recommendations based on user's style preferences.
 *
 * - getStyleRecommendations - A function that takes user style preferences and returns product recommendations.
 * - StylePreferencesInput - The input type for the getStyleRecommendations function.
 * - StyleRecommendationsOutput - The return type for the getStyleRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const StylePreferencesInputSchema = z.object({
  stylePreferences: z
    .string()
    .describe(
      'A description of the user style preferences (e.g., classic, modern, bohemian, minimalist, bold, feminine, masculine, comfortable, dressy).'
    ),
});
export type StylePreferencesInput = z.infer<typeof StylePreferencesInputSchema>;

const StyleRecommendationsOutputSchema = z.object({
  products: z
    .array(z.string())
    .describe(
      'A list of 3-5 specific product recommendations based on the user\'s style preferences. For example: "A-line linen skirt".'
    ),
  outfits: z
    .array(z.string())
    .describe(
      'A list of 2-3 complete outfit ideas based on the user\'s style preferences. For example: "A tailored blazer paired with straight-leg jeans and ankle boots."'
    ),
});
export type StyleRecommendationsOutput = z.infer<typeof StyleRecommendationsOutputSchema>;

export async function getStyleRecommendations(
  input: StylePreferencesInput
): Promise<StyleRecommendationsOutput> {
  return styleRecommendationEngineFlow(input);
}

const prompt = ai.definePrompt({
  name: 'styleRecommendationPrompt',
  input: {schema: StylePreferencesInputSchema},
  output: {schema: StyleRecommendationsOutputSchema},
  prompt: `You are a personal stylist for an e-commerce fashion brand called Srive. Your goal is to provide helpful, concise, and inspiring recommendations to users based on their stated style.

Analyze the following style preferences and generate a list of product recommendations and a few complete outfit ideas.

Style Preferences: {{{stylePreferences}}}

Please return your response in a valid JSON object with two keys: "products" and "outfits".
- The "products" key should have a JSON array of 3-5 specific product recommendations.
- The "outfits" key should have a JSON array of 2-3 complete outfit ideas.

Do not include any introductory text or pleasantries in your response. Only return the JSON object.
`,
});

const styleRecommendationEngineFlow = ai.defineFlow(
  {
    name: 'styleRecommendationEngineFlow',
    inputSchema: StylePreferencesInputSchema,
    outputSchema: StyleRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

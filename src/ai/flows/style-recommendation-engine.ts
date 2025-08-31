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
    .string()
    .describe(
      'A list of product recommendations based on the user\s style preferences.'
    ),
  outfits: z
    .string()
    .describe(
      'A list of outfit recommendations based on the user\s style preferences.'
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
  prompt: `You are a personal stylist. Given the following style preferences, recommend products and outfits.

Style Preferences: {{{stylePreferences}}}

Products: A list of products matching the style preferences.
Outfits: A list of outfits matching the style preferences.

Return the products and outfits in a JSON format.
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

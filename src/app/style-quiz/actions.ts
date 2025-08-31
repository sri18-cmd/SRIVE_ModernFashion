'use server';

import {
  getStyleRecommendations,
  type StylePreferencesInput,
  type StyleRecommendationsOutput,
} from '@/ai/flows/style-recommendation-engine';

interface ActionResult {
  success: boolean;
  data?: StyleRecommendationsOutput;
  error?: string;
}

export async function generateStyleRecommendations(
  input: StylePreferencesInput
): Promise<ActionResult> {
  // Basic validation
  if (!input.stylePreferences || input.stylePreferences.trim().length < 10) {
    return { success: false, error: 'Please describe your style in more detail.' };
  }

  try {
    const recommendations = await getStyleRecommendations(input);
    return { success: true, data: recommendations };
  } catch (error) {
    console.error('Error generating style recommendations:', error);
    return { success: false, error: 'Failed to generate recommendations. Please try again later.' };
  }
}

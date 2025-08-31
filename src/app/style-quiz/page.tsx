"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Loader2, Wand2, Lightbulb } from 'lucide-react';
import type { StyleRecommendationsOutput } from '@/ai/flows/style-recommendation-engine';
import { generateStyleRecommendations } from './actions';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const examples = [
    "I love a minimalist, classic look. Think clean lines, neutral colors like black, white, and beige. I value quality fabrics.",
    "My style is bohemian and free-spirited. I enjoy flowy dresses, floral patterns, and earthy tones.",
    "I prefer a comfortable, sporty, and modern street-style. Hoodies, sneakers, and functional pieces are my go-to.",
];

const RecommendationsDisplay = ({ recommendations }: { recommendations: StyleRecommendationsOutput }) => {
    const { products: recommendedProducts = [], outfits: recommendedOutfits = [] } = recommendations;

    return (
        <div className="grid md:grid-cols-2 gap-6 mt-6">
            <Card>
                <CardHeader>
                    <CardTitle>Recommended Products</CardTitle>
                </CardHeader>
                <CardContent>
                    {recommendedProducts.length > 0 ? (
                        <ul className="list-disc pl-5 space-y-2">
                            {recommendedProducts.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    ) : <p className="text-muted-foreground">No product recommendations available.</p> }
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Outfit Ideas</CardTitle>
                </CardHeader>
                <CardContent>
                    {recommendedOutfits.length > 0 ? (
                        <ul className="list-disc pl-5 space-y-2">
                            {recommendedOutfits.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    ) : <p className="text-muted-foreground">No outfit ideas available.</p> }
                </CardContent>
            </Card>
        </div>
    );
};


export default function StyleQuizPage() {
    const [preferences, setPreferences] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [recommendations, setRecommendations] = useState<StyleRecommendationsOutput | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setRecommendations(null);

        const result = await generateStyleRecommendations({ stylePreferences: preferences });

        if (result.success && result.data) {
            setRecommendations(result.data);
        } else {
            setError(result.error || 'An unknown error occurred.');
        }
        setLoading(false);
    };

    const handleExampleClick = (example: string) => {
        setPreferences(example);
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <Card className="max-w-3xl mx-auto">
                <CardHeader className="text-center">
                    <Wand2 className="mx-auto h-10 w-10 text-primary mb-2" />
                    <CardTitle className="text-3xl">AI-Powered Style Advisor</CardTitle>
                    <CardDescription>
                        Describe your personal style, and our AI will curate product and outfit recommendations just for you.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Textarea
                            placeholder="e.g., 'I like a classic, minimalist style with neutral colors...' or 'I'm into vibrant, bohemian fashion with lots of patterns...'"
                            value={preferences}
                            onChange={(e) => setPreferences(e.target.value)}
                            rows={5}
                            className="text-base"
                        />
                        <div className="flex flex-wrap gap-2 text-sm">
                            <span className="font-medium mr-2">Try an example:</span>
                            {examples.map((ex, i) => (
                                <button key={i} type="button" onClick={() => handleExampleClick(ex)} className="text-primary hover:underline">{`Ex ${i+1}`}</button>
                            ))}
                        </div>
                        <Button type="submit" className="w-full" disabled={loading || !preferences}>
                            {loading ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                                <Lightbulb className="mr-2 h-4 w-4" />
                            )}
                            Get Recommendations
                        </Button>
                    </form>

                    {error && (
                        <Alert variant="destructive" className="mt-6">
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}

                    {loading && (
                        <div className="text-center mt-6">
                            <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
                            <p className="mt-2 text-muted-foreground">Our AI is curating your style...</p>
                        </div>
                    )}
                    
                    {recommendations && (
                        <div className="mt-8">
                             <h2 className="text-2xl font-bold text-center">Your Style Profile</h2>
                             <RecommendationsDisplay recommendations={recommendations} />
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}

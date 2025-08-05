'use server';

/**
 * @fileOverview This file defines the Genkit flow for generating a reference answer to a given question.
 *
 * - generateReferenceAnswer - A function that generates a reference answer for a question.
 * - GenerateReferenceAnswerInput - The input type for the generateReferenceAnswer function.
 * - GenerateReferenceAnswerOutput - The output type for the generateReferenceAnswer function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateReferenceAnswerInputSchema = z.object({
  question: z.string().describe('The question to generate a reference answer for.'),
  topic: z.string().describe('The topic of the question (e.g., React, Next.js).'),
});
export type GenerateReferenceAnswerInput = z.infer<
  typeof GenerateReferenceAnswerInputSchema
>;

const GenerateReferenceAnswerOutputSchema = z.object({
  referenceAnswer: z.string().describe('The reference answer to the question.'),
});
export type GenerateReferenceAnswerOutput = z.infer<
  typeof GenerateReferenceAnswerOutputSchema
>;

export async function generateReferenceAnswer(
  input: GenerateReferenceAnswerInput
): Promise<GenerateReferenceAnswerOutput> {
  return generateReferenceAnswerFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateReferenceAnswerPrompt',
  input: {schema: GenerateReferenceAnswerInputSchema},
  output: {schema: GenerateReferenceAnswerOutputSchema},
  prompt: `You are an expert in React and Next.js. Generate a concise and informative reference answer for the following question, focusing on clarity and accuracy.\n\nTopic: {{{topic}}}\nQuestion: {{{question}}}\n\nReference Answer:`,
});

const generateReferenceAnswerFlow = ai.defineFlow(
  {
    name: 'generateReferenceAnswerFlow',
    inputSchema: GenerateReferenceAnswerInputSchema,
    outputSchema: GenerateReferenceAnswerOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

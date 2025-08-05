'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating interview questions on a given topic.
 *
 * It includes:
 * - `generateInterviewQuestion`: The main function to generate an interview question.
 * - `GenerateInterviewQuestionInput`: The input type for the function.
 * - `GenerateInterviewQuestionOutput`: The output type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateInterviewQuestionInputSchema = z.object({
  topic: z.string().describe('The topic for which to generate an interview question (e.g., React Hooks, Next.js Routing).'),
});
export type GenerateInterviewQuestionInput = z.infer<typeof GenerateInterviewQuestionInputSchema>;

const GenerateInterviewQuestionOutputSchema = z.object({
  question: z.string().describe('The generated interview question.'),
  referenceAnswer: z.string().describe('A reference answer for the generated question.'),
});
export type GenerateInterviewQuestionOutput = z.infer<typeof GenerateInterviewQuestionOutputSchema>;

export async function generateInterviewQuestion(input: GenerateInterviewQuestionInput): Promise<GenerateInterviewQuestionOutput> {
  return generateInterviewQuestionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateInterviewQuestionPrompt',
  input: {schema: GenerateInterviewQuestionInputSchema},
  output: {schema: GenerateInterviewQuestionOutputSchema},
  prompt: `You are an AI assistant designed to help developers prepare for technical interviews. Your task is to generate a relevant and challenging interview question on the topic provided by the user, along with a reference answer.

  Topic: {{{topic}}}

  Question:
  Reference Answer: `,
});

const generateInterviewQuestionFlow = ai.defineFlow(
  {
    name: 'generateInterviewQuestionFlow',
    inputSchema: GenerateInterviewQuestionInputSchema,
    outputSchema: GenerateInterviewQuestionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

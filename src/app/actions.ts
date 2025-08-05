
"use server";

import { generateInterviewQuestion } from "@/ai/flows/generate-interview-question";
import { z } from "zod";

const formSchema = z.object({
  topic: z.string().min(3, { message: "Topic must be at least 3 characters long." }),
});

export async function getInterviewQuestionAction(
  prevState: any,
  formData: FormData
) {
  const validatedFields = formSchema.safeParse({
    topic: formData.get("topic"),
  });

  if (!validatedFields.success) {
    return {
      data: null,
      error: "Invalid topic provided.",
      fieldErrors: validatedFields.error.flatten().fieldErrors,
      topic: "",
    };
  }
  
  const topic = validatedFields.data.topic;

  try {
    const result = await generateInterviewQuestion({ topic });
    return { data: result, topic: topic, error: null, fieldErrors: null };
  } catch (e) {
    console.error(e);
    return { data: null, error: "Failed to generate question. The AI may be busy, please try again.", fieldErrors: null, topic: topic };
  }
}

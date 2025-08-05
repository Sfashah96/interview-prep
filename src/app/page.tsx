"use client";

import * as React from "react";
import { useFormState, useFormStatus } from "react-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { getInterviewQuestionAction } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Sparkles,
  LoaderCircle,
  BookOpen,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";
import type { GenerateInterviewQuestionOutput } from "@/ai/flows/generate-interview-question";

const formSchema = z.object({
  topic: z
    .string()
    .min(3, { message: "Topic must be at least 3 characters." }),
});

type QuestionState = GenerateInterviewQuestionOutput & {
  topic: string;
  rated?: "up" | "down";
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={pending}>
      {pending ? (
        <LoaderCircle className="mr-2 h-5 w-5 animate-spin" />
      ) : (
        <Sparkles className="mr-2 h-5 w-5" />
      )}
      Generate Question
    </Button>
  );
}

function QuestionCard({
  question,
  onRate,
}: {
  question: QuestionState;
  onRate: (rating: "up" | "down") => void;
}) {
  const formattedAnswer = React.useMemo(() => {
    // Split by markdown-style code blocks
    return question.referenceAnswer.split(/```(?:\w+\n)?([\s\S]*?)```/g).map((part, index) => {
      if (index % 2 === 1) {
        return (
          <div key={index} className="my-4 rounded-md bg-muted/50 p-4">
            <pre className="font-code text-sm text-foreground overflow-x-auto">
              <code>{part.trim()}</code>
            </pre>
          </div>
        );
      }
      return part.trim() ? <p key={index} className="leading-relaxed my-2">{part.trim()}</p> : null;
    });
  }, [question.referenceAnswer]);

  return (
    <Card className="w-full transition-all duration-500 ease-in-out transform animate-in fade-in-0 zoom-in-95">
      <CardHeader>
        <CardTitle className="text-2xl font-headline">{question.question}</CardTitle>
        <CardDescription>
          An AI-generated question on the topic of &quot;{question.topic}&quot;.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <span className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                View Reference Answer
              </span>
            </AccordionTrigger>
            <AccordionContent className="prose prose-sm dark:prose-invert max-w-none pt-4 text-base">
              {formattedAnswer}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">Was this question helpful?</p>
        <div className="flex gap-2">
          <Button
            variant={question.rated === "up" ? "default" : "outline"}
            size="icon"
            onClick={() => onRate("up")}
            disabled={!!question.rated}
            aria-label="Rate up"
          >
            <ThumbsUp className="h-5 w-5" />
          </Button>
          <Button
            variant={question.rated === "down" ? "destructive" : "outline"}
            size="icon"
            onClick={() => onRate("down")}
            disabled={!!question.rated}
            aria-label="Rate down"
          >
            <ThumbsDown className="h-5 w-5" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

export default function Home() {
  const { toast } = useToast();
  const [question, setQuestion] = React.useState<QuestionState | null>(null);

  const [state, formAction] = useFormState(getInterviewQuestionAction, null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: "",
    },
  });

  React.useEffect(() => {
    if (state?.data) {
      setQuestion({ ...state.data, topic: state.topic });
      form.reset();
    }
    if (state?.error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: state.error,
      });
    }
  }, [state, toast, form]);

  const handleRate = (rating: "up" | "down") => {
    if (!question || question.rated) return;
    setQuestion((prev) => prev && { ...prev, rated: rating });
    console.log(`Question rated ${rating}:`, {
      topic: question.topic,
      question: question.question,
    });
    toast({
      title: "Feedback Submitted",
      description: "Thanks for helping us improve!",
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-2xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-primary font-headline flex items-center justify-center gap-3">
            <Sparkles className="h-8 w-8 text-accent" />
            Next Interview Ace
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Hone your React & Next.js skills with AI-powered interview questions.
          </p>
        </header>

        <main className="flex flex-col items-center gap-8 w-full">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Generate a New Question</CardTitle>
              <CardDescription>
                Enter a topic to generate a technical interview question.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form action={formAction} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="topic">Topic</Label>
                  <Input
                    id="topic"
                    name="topic"
                    placeholder="e.g., 'React Hooks', 'Next.js Routing'"
                    className="text-base"
                    required
                  />
                  {state?.fieldErrors?.topic && (
                    <p className="text-sm font-medium text-destructive">{state.fieldErrors.topic[0]}</p>
                  )}
                </div>
                 <SubmitButton />
              </form>
            </CardContent>
          </Card>

          {question && (
            <QuestionCard question={question} onRate={handleRate} />
          )}
        </main>
      </div>
    </div>
  );
}


"use client";

import { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { getInterviewQuestionAction } from "@/app/actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ThumbsUp, ThumbsDown, Loader, RefreshCw, Lightbulb } from "lucide-react";

const initialState = {
  data: null,
  error: null,
  fieldErrors: null,
  topic: "",
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? <Loader className="animate-spin" /> : "Generate Question"}
    </Button>
  );
}

export default function PracticePage() {
  const [state, formAction] = useFormState(getInterviewQuestionAction, initialState);
  const [showAnswer, setShowAnswer] = useState(false);

  const handleNewTopic = () => {
    // This is a bit of a hack to reset the form state by reloading the page.
    // A more robust solution might involve clearing state without a reload.
    window.location.reload();
  };

  if (state.data) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Practice Question: {state.topic}</CardTitle>
            <CardDescription>
              Here is a generated question to test your knowledge.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-semibold">{state.data.question}</p>
          </CardContent>
          <CardFooter className="flex flex-col items-start gap-4">
            <Button onClick={() => setShowAnswer(!showAnswer)}>
              <Lightbulb className="mr-2" />
              {showAnswer ? "Hide Answer" : "Reveal Answer"}
            </Button>
            {showAnswer && (
              <div className="prose prose-invert mt-4 p-4 border rounded-md w-full">
                <h3 className="text-white">Reference Answer</h3>
                <p>{state.data.referenceAnswer}</p>
              </div>
            )}
          </CardFooter>
        </Card>
        <div className="flex items-center justify-center gap-4">
            <Button onClick={handleNewTopic}>
              <RefreshCw className="mr-2" />
              Ask another topic
            </Button>
        </div>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Practice Any Topic</CardTitle>
        <CardDescription>
          Enter a topic you want to be quizzed on. Our AI will generate a
          relevant interview question for you.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="topic">Topic</Label>
            <Input
              id="topic"
              name="topic"
              placeholder="e.g., React Hooks, State Management, Next.js Routing"
              required
            />
            {state?.fieldErrors?.topic && (
              <p className="text-sm font-medium text-destructive">
                {state.fieldErrors.topic[0]}
              </p>
            )}
          </div>
          <SubmitButton />
        </form>

        {state.error && (
            <Alert variant="destructive" className="mt-4">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{state.error}</AlertDescription>
            </Alert>
        )}
      </CardContent>
    </Card>
  );
}

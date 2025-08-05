"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GraduationCap } from "lucide-react";

export default function Home() {
  return (
    <div className="grid gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Welcome to ReactReady!</CardTitle>
          <CardDescription>
            Your all-in-one companion for acing React and React Native interviews.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            Get started by exploring the learning paths, practicing with coding
            challenges, or simulating a mock interview.
          </p>
          <div className="flex gap-4">
            <Button>
              <GraduationCap className="mr-2" />
              Start Learning
            </Button>
            <Button variant="secondary">Practice Challenges</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

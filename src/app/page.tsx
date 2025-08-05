
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Flame,
  Code,
  BookOpen,
  MessageCircle,
  Plus,
  ArrowRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const isOnboarded = localStorage.getItem("onboarded");
    if (!isOnboarded) {
      router.push("/onboarding");
    }
  }, [router]);
  
  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex items-center gap-2">
              <Flame className="text-orange-500" />
              Your Top Priority Today
            </div>
          </CardTitle>
          <CardDescription>
            Master React Fiber (3 questions left). This is critical for the
            Senior role you're targeting.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Button size="lg">
              Start Learning <ArrowRight className="ml-2" />
            </Button>
            <Button size="lg" variant="outline">
              Skip for now
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center gap-2 flex-wrap">
        <Badge variant="secondary">Role: React Native</Badge>
        <Badge variant="secondary">Level: Senior</Badge>
        <Badge variant="secondary">Time: 15-min drill</Badge>
        <Button variant="ghost" size="sm">
          <Plus className="mr-1" /> Add Filter
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>
               <div className="flex items-center gap-2">
                <BookOpen /> Flashcard
                <Badge variant="destructive">High Priority</Badge>
              </div>
            </CardTitle>
            <CardDescription>
              Why can't we call hooks inside conditionals?
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex gap-2">
            <Button>I know this</Button>
            <Button variant="outline">Review Later</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              <div className="flex items-center gap-2">
                <Code /> Code Challenge
              </div>
            </CardTitle>
            <CardDescription>
              Fix the infinite loop in this `useEffect` hook.
            </CardDescription>
          </CardHeader>
           <CardFooter>
             <div className="w-full">
              <p className="text-sm text-muted-foreground mb-2">Time: 8 min</p>
              <Button className="w-full">
                Start Challenge
              </Button>
             </div>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              <div className="flex items-center gap-2">
                <BookOpen /> Concept Deep Dive
              </div>
            </CardTitle>
            <CardDescription>
              You got 73% of Fiber questions wrong. Let's fix that.
            </CardDescription>
          </CardHeader>
           <CardFooter>
             <div className="w-full">
                <Progress value={27} className="mb-2" />
                <Button className="w-full" variant="outline">
                  Review Concepts
                </Button>
             </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

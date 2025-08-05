
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { ArrowRight, Check } from "lucide-react";

const steps = [
  {
    title: "Select Your Role",
    description: "What are you preparing for?",
    key: "role",
  },
  {
    title: "What's your expertise level?",
    description: "This helps us tailor question difficulty.",
    key: "expertise",
  },
  {
    title: "When's your interview?",
    description: "Urgency helps us prioritize what to show you.",
    key: "timeline",
  },
  {
    title: "Key Focus Areas",
    description: "Select the topics you want to focus on.",
    key: "focus",
  },
];

const expertiseLevels = ["Junior (0-2y)", "Mid (2-5y)", "Senior (5y+)", "Staff"];
const focusAreas = ["Core React", "React Native", "State Mgmt", "Performance", "Testing", "Architecture"];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    role: "",
    expertise: 1, // Mid-level default
    timeline: "",
    focus: [] as string[],
  });

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      // Finish onboarding
      localStorage.setItem("onboarded", "true");
      localStorage.setItem("onboardingData", JSON.stringify(formData));
      router.push("/");
    }
  };

  const handleRoleSelect = (role: string) => {
    setFormData({ ...formData, role });
    handleNext();
  };

  const handleTimelineSelect = (timeline: string) => {
    setFormData({ ...formData, timeline });
    handleNext();
  };
  
  const handleFocusToggle = (area: string) => {
    setFormData(prev => ({
        ...prev,
        focus: prev.focus.includes(area) ? prev.focus.filter(f => f !== area) : [...prev.focus, area]
    }));
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>{steps[step].title}</CardTitle>
          <CardDescription>{steps[step].description}</CardDescription>
        </CardHeader>
        <CardContent>
          {steps[step].key === "role" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button
                variant="outline"
                className="h-24 text-lg"
                onClick={() => handleRoleSelect("React Frontend Dev")}
              >
                React Frontend Dev
              </Button>
              <Button
                variant="outline"
                className="h-24 text-lg"
                onClick={() => handleRoleSelect("React Native Dev")}
              >
                React Native Dev
              </Button>
              <Button
                variant="outline"
                className="h-24 text-lg"
                onClick={() => handleRoleSelect("Fullstack React")}
              >
                Fullstack React
              </Button>
            </div>
          )}
          {steps[step].key === "expertise" && (
            <div className="pt-8">
                <Slider
                    defaultValue={[formData.expertise]}
                    max={3}
                    step={1}
                    onValueChange={(value) => setFormData({...formData, expertise: value[0]})}
                />
                <div className="flex justify-between text-sm text-muted-foreground mt-2">
                    {expertiseLevels.map((level, i) => <span key={i}>{level}</span>)}
                </div>
            </div>
          )}
          {steps[step].key === "timeline" && (
             <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Button variant="outline" className="h-16" onClick={() => handleTimelineSelect("> 1 month")}>{'>'} 1 month</Button>
              <Button variant="outline" className="h-16" onClick={() => handleTimelineSelect("2-4 weeks")}>2-4 weeks</Button>
              <Button variant="outline" className="h-16" onClick={() => handleTimelineSelect("1 week")}>1 week</Button>
              <Button variant="destructive" className="h-16" onClick={() => handleTimelineSelect("Tomorrow!")}>Tomorrow!</Button>
            </div>
          )}
          {steps[step].key === "focus" && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {focusAreas.map(area => (
                    <div key={area} className="flex items-center space-x-2">
                         <Checkbox 
                            id={area} 
                            checked={formData.focus.includes(area)}
                            onCheckedChange={() => handleFocusToggle(area)}
                        />
                        <Label htmlFor={area} className="text-base">{area}</Label>
                    </div>
                ))}
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-end">
          {steps[step].key !== 'role' && steps[step].key !== 'timeline' && (
             <Button onClick={handleNext} size="lg">
                {step === steps.length - 1 ? 'Finish' : 'Next'} <ArrowRight className="ml-2" />
             </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}

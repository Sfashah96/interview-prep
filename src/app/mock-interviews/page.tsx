
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function MockInterviewsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Mock Interviews</CardTitle>
        <CardDescription>
          Simulate a real interview experience.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>Test your skills in a simulated interview environment with AI-driven questions and feedback.</p>
      </CardContent>
    </Card>
  );
}

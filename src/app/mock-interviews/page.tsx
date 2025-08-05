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
        <p>The mock interview simulator will be available here.</p>
      </CardContent>
    </Card>
  );
}

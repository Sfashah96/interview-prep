import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function PracticePage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Practice</CardTitle>
        <CardDescription>
          Hone your skills with coding challenges.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>Coding challenges will be available here.</p>
      </CardContent>
    </Card>
  );
}

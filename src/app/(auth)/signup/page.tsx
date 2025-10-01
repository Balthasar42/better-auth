import Link from "next/link"
import { Container } from "@/components/atoms/container"
import { SignupForm } from "@/components/forms/signup-form"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function Page() {
  return (
    <Container className="max-w-lg">
      <Card>
        <CardHeader>
          <CardTitle>Signup</CardTitle>
          <CardDescription>Create an account to get started</CardDescription>
        </CardHeader>
        <CardContent>
          <SignupForm />
          <div className="flex justify-center">
            <Button asChild variant={"link"}>
              <Link href={"/signin"}>Already have an account? Sign in</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </Container>
  )
}

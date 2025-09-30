import type { Metadata } from "next"
import Link from "next/link"
import { Container } from "@/components/atoms/container"
import { SigninForm } from "@/components/forms/signin-form"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Login",
}

export default function Page() {
  return (
    <Container className="max-w-lg">
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SigninForm />
          <div className="flex justify-center">
            <Button asChild variant={"link"}>
              <Link href={"/signup"}>Create a new account</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </Container>
  )
}

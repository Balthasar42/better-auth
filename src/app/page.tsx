import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="flex min-h-svh items-center justify-center px-4">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-3xl font-semibold sm:text-4xl">Better-Auth</h1>
        <p className="text-muted-foreground mt-3 text-base text-balance sm:text-lg">
          An open-source authentication and user management solution
        </p>
        <div className="mx-auto mt-6 flex max-w-sm flex-col gap-3 sm:flex-row sm:justify-center">
          <Button asChild>
            <Link href="/dashboard">Go to Dashboard</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/signin">Sign In</Link>
          </Button>
        </div>
      </div>
    </main>
  )
}

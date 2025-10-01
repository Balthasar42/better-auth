// import { headers } from "next/headers"
// import { redirect } from "next/navigation"
// import { auth } from "@/lib/auth"

import { unauthorized } from "next/navigation"
import { Container } from "@/components/atoms/container"
import { Section } from "@/components/atoms/section"
import { UserForm } from "@/components/forms/user-form"
import { getSession } from "@/lib/get-session"

export default async function Page() {
  // const session = await auth.api.getSession({
  //   headers: await headers(),
  // })
  // if (!session) {
  //   redirect("/login")
  // }

  const session = await getSession()
  const user = session?.user

  if (!user) unauthorized()

  return (
    <main>
      <Section>
        <Container>
          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-2xl font-semibold">Account</h1>
              <p className="text-muted-foreground">Manage your account</p>
            </div>
            <div className="flex flex-col gap-6 lg:flex-row">
              <UserForm user={user} />
            </div>
            {/* <pre>{JSON.stringify(session, null, 2)}</pre> */}
          </div>
        </Container>
      </Section>
    </main>
  )
}

// import { headers } from "next/headers"
// import { redirect } from "next/navigation"
// import { auth } from "@/lib/auth"

import { unauthorized } from "next/navigation"
import { getSession } from "@/lib/get-session"

export default async function Page() {
  // const session = await auth.api.getSession({
  //   headers: await headers(),
  // })
  // if (!session) {
  //   redirect("/login")
  // }

  const session = await getSession()
  if (!session) unauthorized()

  return (
    <div>
      <h1>Dashboard Home</h1>
    </div>
  )
}

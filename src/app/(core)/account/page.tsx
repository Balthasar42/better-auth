// import { headers } from "next/headers"
// import { redirect } from "next/navigation"
// import { auth } from "@/lib/auth"

import { getSession } from "@/lib/get-session"

export default async function Page() {
  // const session = await auth.api.getSession({
  //   headers: await headers(),
  // })
  // if (!session) {
  //   redirect("/login")
  // }

  const session = await getSession()

  return (
    <div>
      <h1>Dashboard Home</h1>
      session:
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  )
}

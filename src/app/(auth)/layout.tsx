import type { Metadata } from "next"
import Image from "next/image"
import { redirect } from "next/navigation"
import { Logo } from "@/components/atoms/logo"
import { getSession } from "@/lib/get-session"

export const metadata: Metadata = {
  title: "Sign up",
}

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getSession()
  if (session) redirect("/dashboard")

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Logo />
        </div>
        <div className="flex flex-1 items-center justify-center">
          {children}
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <Image
          src="/img/user-bg.jpg"
          fill
          className="absolute inset-0 h-full w-full object-cover object-center"
          alt="Picture of the author"
        />
      </div>
    </div>
  )
}

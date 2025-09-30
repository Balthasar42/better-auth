import Link from "next/link"
import { Container } from "@/components/atoms/container"
import { Logo } from "@/components/atoms/logo"
import { Logout } from "@/components/atoms/logout"
import { getSession } from "@/lib/get-session"

export async function Header() {
  const session = await getSession()
  if (!session) return null

  return (
    <header>
      <Container className="flex items-center justify-between py-6">
        <Link href={"/"}>
          <Logo />
        </Link>

        {/* <nav className="hidden gap-12 lg:flex">

        </nav> */}
        <div className="flex items-center gap-2">
          <Logout />
        </div>
      </Container>
    </header>
  )
}

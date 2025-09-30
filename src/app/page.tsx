import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex gap-2">
      <Link href="/login">
        <Button>Login</Button>
      </Link>
      {/* <Link href="/signup">
        <Button>Signup</Button>
      </Link> */}
    </div>
  )
}

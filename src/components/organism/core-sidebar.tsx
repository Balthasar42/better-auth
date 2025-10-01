import Link from "next/link"
import { Logo } from "@/components/atoms/logo"
import { NavSidebar } from "@/components/molecular/nav-sidebar"
import { NavUser } from "@/components/molecular/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar"
import { getSession } from "@/lib/get-session"

const data = {
  navMain: [
    { title: "Dashboard", url: "/dashboard" },
    { title: "Team", url: "/dashboard/team" },
    { title: "Projects", url: "/dashboard/projects" },
  ],
  navSecondary: [{ title: "Account", url: "/account" }],
}

interface CoreSidebarProps extends React.ComponentProps<typeof Sidebar> {}

export async function CoreSidebar({ ...props }: CoreSidebarProps) {
  const session = await getSession()
  const user = session?.user

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <Link href="/dashboard">
          <Logo className="!size-20" />
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <NavSidebar items={data.navMain} />
        <NavSidebar items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  )
}

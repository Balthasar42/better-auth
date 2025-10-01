import { redirect } from "next/navigation"
import { CoreSidebar } from "@/components/organism/core-sidebar"
import { SiteHeader } from "@/components/organism/site-header"
import { IdleTimerProvider } from "@/components/providers/idle-timer-provider"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { getSession } from "@/lib/get-session"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getSession()
  if (!session) redirect("/signin")

  return (
    <IdleTimerProvider>
      <SidebarProvider
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 72)",
            "--header-height": "calc(var(--spacing) * 12)",
          } as React.CSSProperties
        }
      >
        <CoreSidebar variant="inset" />

        <SidebarInset>
          <SiteHeader />
          {children}
        </SidebarInset>
      </SidebarProvider>
    </IdleTimerProvider>
  )
}

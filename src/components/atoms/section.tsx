import { cn } from "@/lib/utils"

export function Section({
  className,
  ...props
}: React.HTMLProps<HTMLSelectElement>) {
  return (
    <section className={cn("py-10 md:py-20 2xl:py-28", className)} {...props} />
  )
}

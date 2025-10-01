import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface LoadingButtonProps extends React.ComponentProps<typeof Button> {
  loading: boolean
}

export function LoadingButton({
  loading,
  disabled,
  children,
  className,
  ...props
}: LoadingButtonProps) {
  return (
    <Button
      disabled={loading || disabled}
      className={cn("relative min-w-[96px]", className)}
      aria-busy={loading}
      {...props}
    >
      <span
        className={cn(
          "transition-opacity duration-200",
          loading && "opacity-0"
        )}
      >
        {children}
      </span>
      <span
        className={cn(
          "absolute inset-0 flex items-center justify-center",
          loading ? "opacity-100" : "opacity-0 pointer-events-none",
          "transition-opacity duration-200"
        )}
        aria-hidden
      >
        <Loader2 className="animate-spin" />
      </span>
    </Button>
  )
}

import { Button } from "./button"
import { Loader2 } from "lucide-react"
import { ButtonProps } from "@/components/ui/button"

interface LoadingButtonProps extends ButtonProps {
  isLoading?: boolean
}

export function LoadingButton({
  children,
  isLoading,
  ...props
}: LoadingButtonProps) {
  return (
    <Button {...props} disabled={isLoading || props.disabled}>
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </Button>
  )
} 
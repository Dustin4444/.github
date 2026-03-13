import { cn } from "@/lib/utils"

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-secondary bg-background p-6 shadow-sm",
        className
      )}
      {...props}
    />
  )
}

export function CardHeader({ className, ...props }: CardProps) {
  return <div className={cn("mb-4", className)} {...props} />
}

export function CardTitle({ className, ...props }: CardProps) {
  return (
    <h3 className={cn("text-xl font-semibold text-foreground", className)} {...props} />
  )
}

export function CardDescription({ className, ...props }: CardProps) {
  return (
    <p className={cn("text-sm text-muted-foreground", className)} {...props} />
  )
}

export function CardContent({ className, ...props }: CardProps) {
  return <div className={cn("", className)} {...props} />
}

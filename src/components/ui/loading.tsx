"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface LoadingProps {
  className?: string
  size?: "sm" | "md" | "lg"
  variant?: "default" | "rose"
}

export function Loading({ className, size = "md", variant = "default" }: LoadingProps) {
  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-24 h-24",
    lg: "w-32 h-32"
  }

  const variantClasses = {
    default: "text-gray-200/30",
    rose: "text-rose-200/30"
  }

  return (
    <div className={cn("flex items-center justify-center", className)}>
      <motion.div
        className={cn(
          "relative",
          sizeClasses[size]
        )}
        animate={{ rotate: 360 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
      >
        <div className={cn(
          "absolute inset-0 rounded-full border-4 border-current opacity-30",
          variantClasses[variant]
        )} />
        <div className={cn(
          "absolute inset-0 rounded-full border-4 border-transparent border-t-current",
          variant === "default" ? "text-white" : "text-rose-500"
        )} />
      </motion.div>
    </div>
  )
}

export function PageLoading() {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <Loading size="lg" variant="rose" />
    </div>
  )
}

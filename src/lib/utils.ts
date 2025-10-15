
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Utility function to add interactive hover effects
export function withInteractiveHover(baseClasses: string): string {
  return cn(
    baseClasses,
    "transition-all duration-200 hover:scale-105"
  )
}

// Utility function to add pulsing effect for notifications
export function withNotificationEffect(baseClasses: string): string {
  return cn(
    baseClasses,
    "relative after:absolute after:top-0 after:right-0 after:w-2 after:h-2 after:bg-red-500 after:rounded-full"
  )
}

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function formatFirebaseDate(date: Date | any): Date {
  if (date && typeof date.toDate === 'function') {
    return date.toDate();
  }
  return date;
}
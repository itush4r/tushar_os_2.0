import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Simple RudderStack tracker mock/setup for demo
export const trackEvent = (event: string, properties?: Record<string, unknown>) => {
  console.log(`[RudderStack] Event: ${event}`, properties);
};

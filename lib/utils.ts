import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatTime = (time: string): string => {
  try {
    const [hours, minutes] = time.split(':').map(Number);

    if (isNaN(hours) || isNaN(minutes)) {
      throw new Error('Invalid time format');
    }

    const period = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes.toString().padStart(2, '0');

    return `${formattedHours}:${formattedMinutes} ${period}`;
  } catch (error) {
    return time; // Return original time if parsing fails
  }
};

export const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
      throw new Error('Invalid date format');
    }

    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  } catch (error) {
    return dateString; // Return original string if parsing fails
  }
};

export const formatPeso = (amount: number): string => {
  try {
    // Check if amount has decimal places
    const hasDecimal = amount % 1 !== 0;

    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
      minimumFractionDigits: hasDecimal ? 2 : 0,
      maximumFractionDigits: 2
    }).format(amount);
  } catch (error) {
    return `₱${amount}`; // Fallback format if formatting fails
  }
};
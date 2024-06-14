import { isBefore } from 'date-fns';

// Function to check if the membership is expired
export const isMembershipExpired = (expiresAt?: string): boolean => {
  if (!expiresAt) return false; // If expiresAt is not provided, assume not expired

  const expirationDate = new Date(expiresAt);
  const currentDate = new Date();

  return isBefore(expirationDate, currentDate);
};


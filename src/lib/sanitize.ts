/**
 * Security utilities for input sanitization and validation
 */

// Sanitize string to prevent XSS - strips HTML tags and encodes special chars
export const sanitizeString = (input: string): string => {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

// Sanitize search query - allows alphanumeric, spaces, basic punctuation
export const sanitizeSearchQuery = (query: string): string => {
  return query.replace(/[^\w\s\-.,'"()&+]/gi, '').trim().slice(0, 200);
};

// Validate email format
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 255;
};

// Validate minimum length
export const hasMinLength = (value: string, min: number): boolean => {
  return value.trim().length >= min;
};

// Sanitize URL parameters
export const sanitizeUrlParam = (param: string | null): string => {
  if (!param) return '';
  return sanitizeSearchQuery(decodeURIComponent(param));
};

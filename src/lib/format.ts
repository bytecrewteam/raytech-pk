/**
 * Shared formatting utilities for the RayTech PK e-commerce site
 */

// Format number as Pakistani Rupees
export const formatPKR = (n: number): string => "PKR " + n.toLocaleString("en-PK");

// Stock configuration
export const stockConfig = {
  "in-stock": { label: "In Stock", className: "text-success" },
  "low-stock": { label: "Only 3 Left!", className: "text-destructive" },
  "pre-order": { label: "Pre-Order", className: "text-primary" },
} as const;

// Badge color configuration
export const badgeColors = {
  deal: "bg-destructive text-destructive-foreground",
  new: "bg-primary text-primary-foreground",
  hot: "bg-destructive text-destructive-foreground",
} as const;

// Animation durations - made more subtle
export const ANIMATION_DURATION_MS = 300;
export const MAX_QUANTITY = 49;
export const MAX_SEARCH_LENGTH = 200;

// Free shipping threshold
export const FREE_SHIPPING_THRESHOLD = 15000;

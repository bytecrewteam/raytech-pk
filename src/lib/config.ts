/**
 * RayTech PK - Site Configuration
 * 
 * This is the central configuration file for customizing the website.
 * Edit these values to change the look and feel of the entire site.
 * 
 * Usage: import { config } from "@/lib/config";
 */

// Brand & Company
export const config = {
  // Company Info
  company: {
    name: "RayTechPK",
    tagline: "Performance Meets Innovation",
    phone: "+92 321 555-0142",
    email: "support@raytechpk.com",
    address: "Lahore, Punjab, Pakistan",
    hours: "Mon-Sat: 10AM-8PM PKT",
    founded: "2019",
  },

  // Product Claims
  products: {
    claim: "200+",
    total: 70, // Actual product count
  },

  // Shipping
  shipping: {
    freeThreshold: 15000,
    standardFee: 200,
    freeShippingText: "Free Shipping 15K+",
    sameDayText: "Same-Day Lahore",
  },

  // Returns
  returns: {
    days: 14,
    text: "14-Day Returns",
  },

  // Layout
  layout: {
    maxWidth: 90, // Percentage - 90% of viewport width
    containerPadding: "1rem", // px value
  },

  // Colors (these map to CSS variables)
  colors: {
    primary: "hsl(var(--primary))",
    primaryForeground: "hsl(var(--primary-foreground))",
    secondary: "hsl(var(--secondary))",
    secondaryForeground: "hsl(var(--secondary-foreground))",
    background: "hsl(var(--background))",
    foreground: "hsl(var(--foreground))",
    muted: "hsl(var(--muted))",
    mutedForeground: "hsl(var(--muted-foreground))",
    accent: "hsl(var(--accent))",
    accentForeground: "hsl(var(--accent-foreground))",
    destructive: "hsl(var(--destructive))",
    destructiveForeground: "hsl(var(--destructive-foreground))",
    success: "hsl(var(--success))",
    border: "hsl(var(--border))",
    card: "hsl(var(--card))",
    cardForeground: "hsl(var(--card-foreground))",
    popover: "hsl(var(--popover))",
    popoverForeground: "hsl(var(--popover-foreground))",
    input: "hsl(var(--input))",
    ring: "hsl(var(--ring))",
  },

  // Animation Durations (in milliseconds)
  animation: {
    cartButton: 300, // Subtle animation duration
    fadeIn: 200,
    slideIn: 300,
    hover: 150,
  },

  // Cart Settings
  cart: {
    maxQuantity: 49,
    minQuantity: 1,
  },

  // Search Settings
  search: {
    maxLength: 200,
    debounceMs: 300,
  },

  // Pagination
  pagination: {
    productsPerPage: 16,
    featuredProducts: 16,
    relatedProducts: 4,
  },

  // Reviews
  reviews: {
    dummyCount: 15, // Number of dummy reviews to show
  },

  // Social Links (for future use)
  social: {
    facebook: "",
    twitter: "",
    instagram: "",
    youtube: "",
    linkedin: "",
  },

  // Payment Methods (display only)
  paymentMethods: [
    "JazzCash",
    "EasyPaisa", 
    "COD",
    "Bank Transfer",
  ],
} as const;

// Type for config sections
export type Config = typeof config;

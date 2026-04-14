// Stripe integration has been replaced with Zoho Payments.
// This file is kept as a stub for backward compatibility.
// See server/zohoPayments.ts for the active payment integration.

export async function getUncachableStripeClient(): Promise<never> {
  throw new Error("Stripe integration has been replaced with Zoho Payments. Use zohoPayments instead.");
}

export async function getStripePublishableKey(): Promise<never> {
  throw new Error("Stripe integration has been replaced with Zoho Payments.");
}

export async function getStripeSecretKey(): Promise<never> {
  throw new Error("Stripe integration has been replaced with Zoho Payments.");
}

export async function getStripeSync(): Promise<never> {
  throw new Error("Stripe integration has been replaced with Zoho Payments.");
}

import rateLimit from "express-rate-limit";

// Chat messages: 50 messages per 15 minutes
export const chatRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  message: "Too many chat messages, please try again later",
  standardHeaders: true,
  legacyHeaders: false,
});

// Login attempts: 5 attempts per 15 minutes
export const loginRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: "Too many login attempts, please try again later",
  skip: (req) => req.method !== "POST",
});

// Desktop agent: 100 requests per 15 minutes
export const agentRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Agent rate limit exceeded",
});

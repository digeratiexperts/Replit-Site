/**
 * OpenAI Configuration Manager
 * Allows enabling/disabling OpenAI API calls to manage billing
 */

let openaiEnabled = (() => {
  // Check if explicitly disabled, otherwise default to enabled
  const envValue = process.env.ENABLE_OPENAI_INTEGRATION;
  if (envValue === 'false' || envValue === '0') {
    return false;
  }
  return true;
})();

export const openaiConfig = {
  /**
   * Check if OpenAI integration is currently enabled
   */
  isEnabled(): boolean {
    return openaiEnabled;
  },

  /**
   * Enable OpenAI integration
   */
  enable(): void {
    openaiEnabled = true;
    console.log("[OpenAI] Integration ENABLED");
  },

  /**
   * Disable OpenAI integration
   */
  disable(): void {
    openaiEnabled = false;
    console.log("[OpenAI] Integration DISABLED");
  },

  /**
   * Toggle OpenAI integration
   */
  toggle(): boolean {
    openaiEnabled = !openaiEnabled;
    console.log(`[OpenAI] Integration toggled to ${openaiEnabled ? 'ENABLED' : 'DISABLED'}`);
    return openaiEnabled;
  },

  /**
   * Get current status with details
   */
  getStatus() {
    return {
      enabled: openaiEnabled,
      apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY ? '***configured***' : 'not configured',
      baseUrl: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL || 'default (api.openai.com)',
    };
  },
};

/**
 * Guard function to safely make OpenAI calls
 * Returns null if OpenAI is disabled, otherwise makes the call
 *
 * @param asyncFn - Async function that makes OpenAI API call
 * @returns Result of asyncFn or null if disabled
 */
export async function withOpenAIGuard<T>(
  asyncFn: () => Promise<T>
): Promise<T | null> {
  if (!openaiEnabled) {
    console.log("[OpenAI] Skipped API call - integration disabled");
    return null;
  }

  try {
    return await asyncFn();
  } catch (error) {
    console.error("[OpenAI] API error:", error);
    throw error;
  }
}

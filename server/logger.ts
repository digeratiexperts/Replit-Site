/**
 * Structured Logger Utility
 * Environment-aware logging with consistent formatting
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  context?: Record<string, any>;
}

const isDevelopment = process.env.NODE_ENV !== 'production';

function formatLog(entry: LogEntry): string {
  const { timestamp, level, message, context } = entry;
  const levelStr = level.toUpperCase().padEnd(5);
  const contextStr = context ? ` ${JSON.stringify(context)}` : '';
  return `[${timestamp}] [${levelStr}] ${message}${contextStr}`;
}

function createLogEntry(level: LogLevel, message: string, context?: Record<string, any>): LogEntry {
  return {
    timestamp: new Date().toISOString(),
    level,
    message,
    context,
  };
}

export const logger = {
  debug(message: string, context?: Record<string, any>) {
    if (isDevelopment) {
      const entry = createLogEntry('debug', message, context);
      console.log(formatLog(entry));
    }
  },

  info(message: string, context?: Record<string, any>) {
    const entry = createLogEntry('info', message, context);
    console.log(formatLog(entry));
  },

  warn(message: string, context?: Record<string, any>) {
    const entry = createLogEntry('warn', message, context);
    console.warn(formatLog(entry));
  },

  error(message: string, error?: Error | unknown, context?: Record<string, any>) {
    const entry = createLogEntry('error', message, {
      ...context,
      ...(error instanceof Error ? { 
        errorMessage: error.message,
        stack: isDevelopment ? error.stack : undefined 
      } : { error: String(error) }),
    });
    console.error(formatLog(entry));
  },

  request(method: string, path: string, statusCode: number, durationMs: number) {
    const entry = createLogEntry('info', `${method} ${path}`, {
      statusCode,
      durationMs,
    });
    console.log(formatLog(entry));
  },

  security(action: string, details: Record<string, any>) {
    const entry = createLogEntry('warn', `[SECURITY] ${action}`, details);
    console.warn(formatLog(entry));
  },

  email(action: string, recipient: string, success: boolean, details?: Record<string, any>) {
    const level = success ? 'info' : 'error';
    const entry = createLogEntry(level, `[EMAIL] ${action}`, {
      recipient,
      success,
      ...details,
    });
    if (success) {
      console.log(formatLog(entry));
    } else {
      console.error(formatLog(entry));
    }
  },
};

export default logger;

import { forwardRef, useState, InputHTMLAttributes, ReactNode, useId } from "react";
import { cn } from "@/lib/utils";
import { Check, AlertCircle, Eye, EyeOff } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface EnhancedInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  success?: boolean;
  hint?: string;
  icon?: ReactNode;
  size?: "sm" | "md" | "lg";
  showPasswordToggle?: boolean;
}

export const EnhancedInput = forwardRef<HTMLInputElement, EnhancedInputProps>(
  ({ 
    className, 
    type = "text",
    label,
    error,
    success,
    hint,
    icon,
    size = "md",
    showPasswordToggle = false,
    disabled,
    id,
    ...props 
  }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    
    const generatedId = useId();
    const inputId = id || generatedId;
    const errorId = `${inputId}-error`;
    const hintId = `${inputId}-hint`;
    
    const isPassword = type === "password";
    const inputType = isPassword && showPassword ? "text" : type;

    const sizeClasses = {
      sm: "h-9 text-sm px-3",
      md: "h-11 text-base px-4",
      lg: "h-12 text-base px-4",
    };

    const iconSizeClasses = {
      sm: "w-4 h-4",
      md: "w-5 h-5",
      lg: "w-5 h-5",
    };

    return (
      <div className="space-y-1.5">
        {label && (
          <label 
            htmlFor={inputId}
            className={cn(
              "block text-sm font-medium transition-colors duration-200",
              isFocused ? "text-violet-400" : "text-white/70",
              error && "text-red-400",
              disabled && "opacity-50"
            )}
          >
            {label}
          </label>
        )}
        
        <div className="relative">
          {icon && (
            <div 
              className={cn(
                "absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none transition-colors duration-200",
                iconSizeClasses[size],
                isFocused ? "text-violet-400" : "text-white/30",
                error && "text-red-400/70"
              )}
              aria-hidden="true"
            >
              {icon}
            </div>
          )}
          
          <input
            id={inputId}
            type={inputType}
            className={cn(
              "w-full rounded-lg border bg-white/5 text-white placeholder:text-white/40",
              "transition-all duration-200 ease-out",
              "focus:outline-none focus:ring-2 focus:ring-offset-0",
              sizeClasses[size],
              icon && "pl-11",
              (isPassword && showPasswordToggle) && "pr-11",
              !error && !success && "border-white/10 hover:border-white/20 focus:border-violet-500/60 focus:ring-violet-500/30",
              error && "border-red-500/60 focus:border-red-500 focus:ring-red-500/30",
              success && "border-emerald-500/60 focus:border-emerald-500 focus:ring-emerald-500/30",
              disabled && "opacity-50 cursor-not-allowed",
              className
            )}
            ref={ref}
            disabled={disabled}
            aria-invalid={!!error}
            aria-describedby={cn(
              error && errorId,
              hint && !error && hintId
            ) || undefined}
            onFocus={(e) => {
              setIsFocused(true);
              props.onFocus?.(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              props.onBlur?.(e);
            }}
            {...props}
          />
          
          {isPassword && showPasswordToggle && (
            <button
              type="button"
              className={cn(
                "absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded",
                "text-white/40 hover:text-white/70 transition-colors",
                "focus:outline-none focus:ring-2 focus:ring-violet-500/50"
              )}
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className={iconSizeClasses[size]} />
              ) : (
                <Eye className={iconSizeClasses[size]} />
              )}
            </button>
          )}
          
          {success && !error && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <Check className={cn(iconSizeClasses[size], "text-emerald-500")} aria-hidden="true" />
            </div>
          )}
        </div>
        
        <AnimatePresence mode="wait">
          {error && (
            <motion.p
              id={errorId}
              className="flex items-center gap-1.5 text-sm text-red-400"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
              role="alert"
            >
              <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
              {error}
            </motion.p>
          )}
          
          {hint && !error && (
            <motion.p
              id={hintId}
              className="text-sm text-white/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              {hint}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

EnhancedInput.displayName = "EnhancedInput";

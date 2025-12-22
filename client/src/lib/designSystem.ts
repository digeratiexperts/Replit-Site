/**
 * Digerati Experts Design System
 * Centralized design tokens for consistent UI/UX across the entire application
 */

export const designSystem = {
  // Color Palette
  colors: {
    // Backgrounds
    background: {
      primary: 'bg-white',
      secondary: 'bg-gray-50',
      tertiary: 'bg-gray-100',
      dark: 'bg-gradient-to-b from-slate-900 via-slate-950 to-black',
      accent: 'bg-gradient-to-br from-purple-50 to-blue-50',
      // Dark theme backgrounds
      darkPrimary: 'bg-[#0a0118]',
      darkSecondary: 'bg-[#0d0720]',
      darkTertiary: 'bg-[#1a0a2e]',
      darkGradient: 'bg-gradient-to-br from-[#07041a] via-[#0f0b2c] to-[#1a1143]',
      darkMesh: 'bg-[radial-gradient(circle_at_20%_20%,rgba(139,92,246,0.15),transparent_50%),radial-gradient(circle_at_80%_80%,rgba(59,130,246,0.12),transparent_50%)]',
    },
    
    // Text Colors
    text: {
      primary: 'text-gray-900',
      secondary: 'text-gray-600',
      tertiary: 'text-gray-500',
      light: 'text-white',
      accent: 'text-purple-600',
      // Dark theme text
      darkPrimary: 'text-white',
      darkSecondary: 'text-gray-300',
      darkMuted: 'text-gray-400',
      darkAccent: 'text-cyan-400',
    },
    
    // Border Colors
    border: {
      default: 'border-gray-200',
      hover: 'border-purple-300',
      focus: 'border-purple-500',
      // Dark theme borders
      darkDefault: 'border-white/10',
      darkHover: 'border-white/20',
      darkAccent: 'border-purple-500/30',
    },
    
    // Gradients
    gradient: {
      primary: 'bg-gradient-to-r from-purple-600 to-blue-600',
      primaryHover: 'hover:from-purple-700 hover:to-blue-700',
      accent: 'bg-gradient-to-br from-purple-50 to-blue-50',
      utility: 'bg-gradient-to-r from-purple-900 to-blue-900',
      // Dark theme gradients
      darkCyanPurple: 'bg-gradient-to-r from-cyan-400 to-purple-500',
      darkPurpleBlue: 'bg-gradient-to-r from-purple-600 to-blue-600',
      darkGlow: 'bg-gradient-to-br from-purple-600/20 via-transparent to-cyan-600/20',
      neonAccent: 'bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500',
    },
  },

  // Glass/Glassmorphism effects
  glass: {
    card: 'bg-white/5 backdrop-blur-xl border border-white/10',
    cardHover: 'hover:bg-white/10 hover:border-white/20',
    surface: 'bg-[#0f0b28]/80 backdrop-blur-xl border border-white/10',
    nav: 'bg-white/5 backdrop-blur-xl border-b border-white/10',
    button: 'bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20',
  },

  // Glow effects
  glow: {
    purple: 'shadow-[0_0_30px_rgba(139,92,246,0.3)]',
    cyan: 'shadow-[0_0_30px_rgba(34,211,238,0.3)]',
    combined: 'shadow-[0_20px_60px_-25px_rgba(139,92,246,0.4),0_10px_40px_-20px_rgba(34,211,238,0.3)]',
    intense: 'shadow-[0_30px_70px_-30px_rgba(139,92,246,0.45)]',
  },

  // Typography
  typography: {
    // Headings
    h1: 'text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight',
    h2: 'text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight',
    h3: 'text-2xl md:text-3xl font-bold text-gray-900 leading-tight',
    h4: 'text-xl md:text-2xl font-semibold text-gray-900',
    h5: 'text-lg md:text-xl font-semibold text-gray-900',
    h6: 'text-base md:text-lg font-semibold text-gray-900',
    
    // Body Text
    body: {
      large: 'text-lg md:text-xl text-gray-600 leading-relaxed',
      default: 'text-base text-gray-600 leading-relaxed',
      small: 'text-sm text-gray-600',
    },
    
    // Special
    caption: 'text-xs text-gray-500 uppercase tracking-wider',
    label: 'text-sm font-medium text-gray-700',
  },

  // Spacing
  spacing: {
    section: 'py-16 md:py-20 lg:py-24',
    container: 'container mx-auto px-4 sm:px-6 lg:px-8',
    gap: {
      small: 'gap-4',
      medium: 'gap-6 md:gap-8',
      large: 'gap-8 md:gap-12',
    },
  },

  // Component Styles
  components: {
    // Card Styles
    card: {
      base: 'bg-white rounded-xl border border-gray-200 p-6 md:p-8 transition-all duration-300',
      hover: 'hover:border-purple-300 hover:shadow-xl hover:-translate-y-1',
      withShadow: 'shadow-md hover:shadow-2xl',
    },
    
    // Service Card
    serviceCard: {
      container: 'group relative bg-white rounded-xl border border-gray-200 p-8 transition-all duration-300 hover:border-purple-300 hover:shadow-xl hover:-translate-y-1',
      icon: 'inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-purple-100 to-blue-100 border border-purple-200 mb-6',
      iconSvg: 'text-purple-600 h-7 w-7',
      title: 'text-xl font-bold text-gray-900 mb-3',
      description: 'text-gray-600 leading-relaxed',
    },
    
    // Button Styles
    button: {
      primary: 'inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2',
      secondary: 'inline-flex items-center justify-center px-6 py-3 border-2 border-gray-300 bg-white hover:bg-gray-50 text-gray-700 font-semibold rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2',
      outline: 'inline-flex items-center justify-center px-6 py-3 border-2 border-purple-600 text-purple-600 hover:bg-purple-50 font-semibold rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2',
    },
    
    // Input Styles
    input: {
      base: 'w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors',
      error: 'border-red-500 focus:ring-red-500',
    },
  },

  // Animation
  animation: {
    transition: 'transition-all duration-300',
    transitionSlow: 'transition-all duration-500',
    hover: 'hover:-translate-y-1 hover:shadow-xl',
  },

  // Shadow
  shadow: {
    small: 'shadow-sm',
    default: 'shadow-md',
    large: 'shadow-lg',
    xl: 'shadow-xl',
    hover: 'hover:shadow-2xl',
  },
} as const;

// Helper functions for combining classes
export const cn = (...classes: (string | boolean | undefined)[]) => {
  return classes.filter(Boolean).join(' ');
};

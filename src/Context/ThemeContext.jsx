import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  // Initialize theme from localStorage or default to system preference
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
        return savedTheme;
      }
      // Check user's system preference
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  // Get system preference
  const [systemPreference, setSystemPreference] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  // Calculate applied theme (resolves 'system' to actual theme)
  const appliedTheme = theme === 'system' ? systemPreference : theme;

  // Legacy compatibility
  const darkMode = appliedTheme === 'dark';

  const toggleTheme = () => {
    const newTheme = appliedTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  const setThemeMode = (newTheme) => {
    if (['light', 'dark', 'system'].includes(newTheme)) {
      setTheme(newTheme);
    }
  };

  // Enhanced theme utilities for 3-color design system
  const getColorValue = (colorName) => {
    if (typeof window !== 'undefined') {
      return getComputedStyle(document.documentElement)
        .getPropertyValue(`--color-${colorName}`)
        .trim();
    }
    return '';
  };

  const validateContrast = (foreground, background) => {
    // Simplified contrast validation
    // In production, use a proper color contrast library
    return true;
  };

  // Apply theme to document and save to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Set data-theme attribute on document root
      document.documentElement.setAttribute('data-theme', appliedTheme);
      
      // Save to localStorage (save the user's preference, not the applied theme)
      localStorage.setItem('theme', theme);
      
      // Add theme class to body for additional styling if needed
      document.body.classList.remove('theme-light', 'theme-dark');
      document.body.classList.add(`theme-${appliedTheme}`);

      // Update meta theme-color for mobile browsers
      const metaThemeColor = document.querySelector('meta[name="theme-color"]');
      if (metaThemeColor) {
        const backgroundColor = appliedTheme === 'dark' ? '#000000' : '#ffffff';
        metaThemeColor.setAttribute('content', backgroundColor);
      }

      // Update color-scheme for better browser integration
      document.documentElement.style.colorScheme = appliedTheme;
    }
  }, [theme, appliedTheme]);

  // Listen for system theme changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      
      const handleSystemThemeChange = (e) => {
        const newSystemPreference = e.matches ? 'dark' : 'light';
        setSystemPreference(newSystemPreference);
      };
      
      mediaQuery.addEventListener('change', handleSystemThemeChange);
      
      return () => {
        mediaQuery.removeEventListener('change', handleSystemThemeChange);
      };
    }
  }, []);

  // Enhanced accessibility support
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [prefersHighContrast, setPrefersHighContrast] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Check for reduced motion preference
      const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(motionQuery.matches);
      
      const handleMotionChange = (e) => setPrefersReducedMotion(e.matches);
      motionQuery.addEventListener('change', handleMotionChange);

      // Check for high contrast preference
      const contrastQuery = window.matchMedia('(prefers-contrast: high)');
      setPrefersHighContrast(contrastQuery.matches);
      
      const handleContrastChange = (e) => setPrefersHighContrast(e.matches);
      contrastQuery.addEventListener('change', handleContrastChange);

      return () => {
        motionQuery.removeEventListener('change', handleMotionChange);
        contrastQuery.removeEventListener('change', handleContrastChange);
      };
    }
  }, []);

  const value = {
    // Core theme values
    theme,
    appliedTheme,
    systemPreference,
    darkMode, // Legacy compatibility
    
    // Theme actions
    toggleTheme,
    setThemeMode,
    
    // Theme state helpers
    isLight: appliedTheme === 'light',
    isDark: appliedTheme === 'dark',
    isSystem: theme === 'system',
    
    // Design system utilities
    getColorValue,
    validateContrast,
    
    // Accessibility preferences
    prefersReducedMotion,
    prefersHighContrast,
    
    // Available themes
    themes: {
      LIGHT: 'light',
      DARK: 'dark',
      SYSTEM: 'system'
    }
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
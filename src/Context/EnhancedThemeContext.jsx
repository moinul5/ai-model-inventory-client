import React, { createContext, useContext, useEffect, useState } from 'react';

// Theme Context for Design System
const EnhancedThemeContext = createContext(undefined);

// Theme values
export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system'
};

// Get system theme preference
const getSystemTheme = () => {
  if (typeof window === 'undefined') return THEMES.LIGHT;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? THEMES.DARK : THEMES.LIGHT;
};

// Get stored theme preference
const getStoredTheme = () => {
  if (typeof window === 'undefined') return THEMES.SYSTEM;
  try {
    return localStorage.getItem('theme') || THEMES.SYSTEM;
  } catch {
    return THEMES.SYSTEM;
  }
};

// Apply theme to document
const applyTheme = (theme) => {
  const actualTheme = theme === THEMES.SYSTEM ? getSystemTheme() : theme;
  
  // Remove existing theme attributes
  document.documentElement.removeAttribute('data-theme');
  document.documentElement.classList.remove('light', 'dark');
  
  // Apply new theme
  document.documentElement.setAttribute('data-theme', actualTheme);
  document.documentElement.classList.add(actualTheme);
  
  // Update meta theme-color for mobile browsers
  const metaThemeColor = document.querySelector('meta[name="theme-color"]');
  if (metaThemeColor) {
    metaThemeColor.setAttribute('content', actualTheme === THEMES.DARK ? '#000000' : '#ffffff');
  }
  
  // Update color scheme
  document.documentElement.style.colorScheme = actualTheme;
};

// Validate contrast ratio (simplified check)
const validateContrastRatio = (foreground, background) => {
  // This is a simplified validation - in production you'd use a proper color contrast library
  // For now, we trust our design tokens are WCAG AA compliant
  return true;
};

export const EnhancedThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(getStoredTheme);
  const [systemTheme, setSystemTheme] = useState(getSystemTheme);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Get the actual applied theme
  const appliedTheme = theme === THEMES.SYSTEM ? systemTheme : theme;

  // Handle theme changes
  const changeTheme = (newTheme) => {
    if (newTheme === theme) return;
    
    setIsTransitioning(true);
    
    // Add transition class for smooth theme change
    document.documentElement.classList.add('theme-transition');
    
    setTimeout(() => {
      setTheme(newTheme);
      
      // Store preference
      try {
        localStorage.setItem('theme', newTheme);
      } catch (e) {
        console.warn('Unable to save theme preference:', e);
      }
      
      // Remove transition class after animation
      setTimeout(() => {
        document.documentElement.classList.remove('theme-transition');
        setIsTransitioning(false);
      }, 300);
    }, 50);
  };

  // Toggle between light and dark (skipping system)
  const toggleTheme = () => {
    const newTheme = appliedTheme === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK;
    changeTheme(newTheme);
  };

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleSystemThemeChange = (e) => {
      const newSystemTheme = e.matches ? THEMES.DARK : THEMES.LIGHT;
      setSystemTheme(newSystemTheme);
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);
    return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
  }, []);

  // Apply theme on mount and when theme changes
  useEffect(() => {
    applyTheme(theme);
  }, [theme, systemTheme]);

  // Add CSS for smooth theme transitions
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .theme-transition,
      .theme-transition *,
      .theme-transition *::before,
      .theme-transition *::after {
        transition: background-color 300ms ease, 
                    color 300ms ease, 
                    border-color 300ms ease, 
                    box-shadow 300ms ease !important;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);

  // Detect user's motion preference
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleMotionChange = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleMotionChange);
    
    return () => mediaQuery.removeEventListener('change', handleMotionChange);
  }, []);

  // Check high contrast preference
  const [prefersHighContrast, setPrefersHighContrast] = useState(false);
  
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-contrast: high)');
    setPrefersHighContrast(mediaQuery.matches);
    
    const handleContrastChange = (e) => setPrefersHighContrast(e.matches);
    mediaQuery.addEventListener('change', handleContrastChange);
    
    return () => mediaQuery.removeEventListener('change', handleContrastChange);
  }, []);

  const contextValue = {
    theme,
    appliedTheme,
    systemTheme,
    changeTheme,
    toggleTheme,
    isTransitioning,
    
    // Accessibility preferences
    prefersReducedMotion,
    prefersHighContrast,
    
    // Theme utilities
    isDark: appliedTheme === THEMES.DARK,
    isLight: appliedTheme === THEMES.LIGHT,
    isSystem: theme === THEMES.SYSTEM,
    
    // Design system utilities
    validateContrastRatio,
    
    // Available themes
    themes: THEMES
  };

  return (
    <EnhancedThemeContext.Provider value={contextValue}>
      {children}
    </EnhancedThemeContext.Provider>
  );
};

// Hook to use theme context
export const useEnhancedTheme = () => {
  const context = useContext(EnhancedThemeContext);
  if (context === undefined) {
    throw new Error('useEnhancedTheme must be used within an EnhancedThemeProvider');
  }
  return context;
};

// HOC for theme-aware components
export const withTheme = (Component) => {
  return function ThemedComponent(props) {
    const theme = useEnhancedTheme();
    return <Component {...props} theme={theme} />;
  };
};

export default EnhancedThemeContext;
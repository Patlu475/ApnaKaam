"use client";
import { useEffect } from 'react';
import { useThemeStore } from '@/store/themeStore';

export default function ThemeProviderZustand({ children }: { children: React.ReactNode }) {
  const theme = useThemeStore((state) => state.theme);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(theme);
    }
  }, [theme]);

  return <>{children}</>;
} 

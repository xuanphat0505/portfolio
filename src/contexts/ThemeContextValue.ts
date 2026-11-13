import { createContext } from 'react';

export type Theme = 'dark' | 'light';

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

// Context lưu giao diện hiện tại, tách riêng khỏi Provider để file component chỉ export component
export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

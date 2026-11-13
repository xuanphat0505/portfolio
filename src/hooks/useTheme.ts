import { useContext } from 'react';
import { ThemeContext } from '@/contexts/ThemeContextValue';

// Hook lấy giao diện hiện tại, báo lỗi rõ ràng nếu dùng ngoài ThemeProvider
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

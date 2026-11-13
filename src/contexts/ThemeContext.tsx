import React, { useEffect, useState } from 'react';
import { ThemeContext, type Theme } from './ThemeContextValue';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    // Kiểm tra lựa chọn giao diện lưu trong localStorage trước
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme;
    }
    // Mặc định sử dụng giao diện tối (dark) làm giao diện chủ đạo
    return 'dark';
  });

  useEffect(() => {
    // Cập nhật giá trị giao diện mới vào localStorage
    localStorage.setItem('theme', theme);
    // Cập nhật thuộc tính data-theme trên thẻ html để ánh xạ các biến CSS
    if (theme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

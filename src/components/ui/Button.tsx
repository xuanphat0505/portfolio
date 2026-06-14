import React, { type ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'solid' | 'outline' | 'ghost';
  children: React.ReactNode;
}

// Component Button dùng chung cho dự án hỗ trợ các kiểu hiển thị (solid, outline, ghost).
const Button: React.FC<ButtonProps> = ({ 
  variant = 'solid', 
  children, 
  className = '', 
  ...props 
}) => {
  // Styles dùng chung cho mọi loai nút
  const baseStyles = 'px-6 py-3 font-mono text-[11px] tracking-[0.2em] uppercase transition-all duration-300 inline-flex items-center justify-center gap-2';
  
  // Styles riêng cho từng variant
  const variants = {
    solid: 'bg-[var(--color-brand-cyan)] text-[#000] hover:bg-white hover:text-black font-bold',
    outline: 'border border-brand-border hover:border-brand-cyan hover:text-brand-cyan',
    ghost: 'text-on-surface-variant hover:text-brand-cyan hover:bg-surface-container-low',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;

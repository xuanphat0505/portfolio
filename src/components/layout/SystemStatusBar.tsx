import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '@/hooks/useTheme';

// Component SystemStatusBar hiển thị thanh trạng thái thời gian thực mô phỏng VS Code
// Theo dõi tọa độ chuột, thanh cuộn trang, theme hiện tại và thông số môi trường lập trình
const SystemStatusBar: React.FC = () => {
  const mouseXRef = useRef<HTMLSpanElement>(null);
  const mouseYRef = useRef<HTMLSpanElement>(null);
  const [scrollPercent, setScrollPercent] = useState(0);
  const [host, setHost] = useState('');
  const { theme } = useTheme();

  // Đăng ký các sự kiện chuột và cuộn trang khi component mounted
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setHost(window.location.host || 'localhost:5173');
    }
    const handleMouseMove = (e: MouseEvent) => {
      if (mouseXRef.current) mouseXRef.current.textContent = `${e.clientX}px`;
      if (mouseYRef.current) mouseYRef.current.textContent = `${e.clientY}px`;
    };

    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        const scrolled = (window.scrollY / docHeight) * 100;
        setScrollPercent(Math.round(scrolled));
      } else {
        setScrollPercent(0);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Khởi chạy thông số cuộn ban đầu
    handleScroll();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 h-6 bg-surface-container border-t border-outline-variant/15 flex items-center justify-between px-3 md:px-6 select-none font-mono text-[9px] md:text-[10px] text-on-surface-variant/80 transition-colors duration-500 shadow-lg">
      
      {/* Khối bên trái: Git Branch, Trạng thái hệ thống, Tọa độ con trỏ */}
      <div className="flex items-center gap-4">
        {/* Biểu tượng Git Branch */}
        <div className="flex items-center gap-1.5 text-primary hover:opacity-85 cursor-pointer">
          <svg 
            className="w-3.5 h-3.5" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <line x1="6" y1="3" x2="6" y2="15"></line>
            <circle cx="18" cy="6" r="3"></circle>
            <circle cx="6" cy="18" r="3"></circle>
            <path d="M18 9a9 9 0 0 1-9 9"></path>
          </svg>
          <span className="font-bold">git:main</span>
        </div>

        {/* Trạng thái triển khai */}
        <div className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-cyan animate-pulse"></span>
          <span className="text-[9px] text-on-surface-variant/60">SYS_DEPLOY: OK</span>
        </div>

        {/* Tọa độ chuột thực tế */}
        <div className="hidden sm:block text-on-surface-variant/40 border-l border-outline-variant/15 pl-4">
          MOUSE_X: <span ref={mouseXRef} className="text-primary font-bold">0px</span>, MOUSE_Y: <span ref={mouseYRef} className="text-primary font-bold">0px</span>
        </div>
      </div>

      {/* Khối bên phải: Theme, Phần trăm cuộn, Cổng phát triển, Ngôn ngữ */}
      <div className="flex items-center gap-4">
        {/* Chế độ màu */}
        <div className="hidden md:block">
          MODE: <span className="text-primary font-bold">{theme.toUpperCase()}</span>
        </div>

        {/* Phần trăm cuộn trang */}
        <div className="flex items-center gap-1 border-l border-outline-variant/15 pl-4 md:border-none md:pl-0">
          <span>SCROLLED:</span>
          <span className="text-primary font-bold min-w-[28px] text-right">{scrollPercent}%</span>
        </div>

        {/* Cổng chạy thử nghiệm giả lập */}
        <div className="hidden sm:block text-on-surface-variant/40 border-l border-outline-variant/15 pl-4">
          HOST: <span className="text-primary">{host}</span>
        </div>

        {/* Profile công nghệ file */}
        <div className="hidden md:block bg-brand-cyan/10 border border-brand-cyan/20 text-primary px-1.5 py-0.5 rounded-[2px] font-bold text-[8px]">
          TSX
        </div>
      </div>

    </div>
  );
};

export default SystemStatusBar;

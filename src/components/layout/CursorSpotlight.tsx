import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';

// Component CursorSpotlight cung cấp hiệu ứng đèn rọi nền (Spotlight)
// và con trỏ chuột tùy biến đàn hồi Squash & Stretch cùng HUD thông tin tọa độ
const CursorSpotlight: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredType, setHoveredType] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Vị trí chuột thực tế chạy theo 1:1
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Vòng ngoài có trễ vật lý đàn hồi bằng cấu hình lò xo Framer Motion
  const springConfig = { stiffness: 300, damping: 28, mass: 0.6 };
  const trailX = useSpring(mouseX, springConfig);
  const trailY = useSpring(mouseY, springConfig);

  // Tính toán vận tốc (velocity) để bóp dẹt/kéo giãn (Squash & Stretch) con trỏ
  const [speed, setSpeed] = useState(0);
  const [angle, setAngle] = useState(0);
  const lastMousePos = useRef({ x: 0, y: 0, time: Date.now() });

  useEffect(() => {
    // Chỉ kích hoạt hiệu ứng chuột tùy biến trên các màn hình PC có độ định vị trỏ tốt (pointer: fine)
    const mediaQuery = window.matchMedia('(pointer: fine)');
    setIsMobile(!mediaQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsMobile(!e.matches);
    };
    mediaQuery.addEventListener('change', handleMediaChange);

    if (mediaQuery.matches) {
      // Ẩn con trỏ chuột mặc định của trình duyệt để thay thế bằng con trỏ tùy biến
      const style = document.createElement('style');
      style.id = 'hide-default-cursor';
      style.innerHTML = `
        @media (pointer: fine) {
          a, button, [role="button"], input, select, textarea, .cursor-pointer, [data-hover] {
            cursor: none !important;
          }
          body {
            cursor: none !important;
          }
        }
      `;
      document.head.appendChild(style);
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setIsVisible(true);

      // Cập nhật các biến CSS toàn cục phục vụ cho luồng sáng rọi đèn pin nền
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);

      // Đo vận tốc di chuyển chuột theo thời gian thực
      const now = Date.now();
      const dt = now - lastMousePos.current.time;
      if (dt > 12) {
        const dx = e.clientX - lastMousePos.current.x;
        const dy = e.clientY - lastMousePos.current.y;
        
        // Vận tốc (pixels/ms)
        const currentSpeed = Math.sqrt(dx * dx + dy * dy) / dt;
        setSpeed(Math.min(currentSpeed * 10, 1.6)); // Giới hạn tối đa độ giãn nở

        // Tính toán góc di chuyển để xoay elip kéo giãn theo đúng hướng đi
        if (dx !== 0 || dy !== 0) {
          setAngle(Math.atan2(dy, dx) * (180 / Math.PI));
        }

        lastMousePos.current = { x: e.clientX, y: e.clientY, time: now };
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Tìm các phần tử click được gần nhất để đổi hình thái cursor
      const interactiveEl = target.closest('a, button, [role="button"], input, select, textarea, .cursor-pointer, [data-hover]');
      
      if (interactiveEl) {
        setIsHovered(true);
        const type = interactiveEl.getAttribute('data-hover') || interactiveEl.tagName.toLowerCase();
        setHoveredType(type);
      } else {
        setIsHovered(false);
        setHoveredType(null);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mouseover', handleMouseOver);
      const style = document.getElementById('hide-default-cursor');
      if (style) document.head.removeChild(style);
    };
  }, [mouseX, mouseY]);

  if (isMobile || !isVisible) return null;

  // Tính toán squash & stretch
  // Di chuyển càng nhanh thì trục di chuyển càng kéo dài (scaleX), chiều rộng càng bóp hẹp (scaleY)
  const scaleX = 1 + speed * 0.45;
  const scaleY = 1 - speed * 0.35;

  return (
    <>
      {/* 1. Điểm laser trung tâm của con trỏ (chạy 1:1 theo chuột) */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-brand-cyan rounded-full pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2"
        style={{ x: mouseX, y: mouseY }}
      />

      {/* 2. Vòng Blueprint trễ đàn hồi vật lý và biến dạng theo chuyển động */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
        style={{ x: trailX, y: trailY }}
      >
        <motion.div
          animate={{
            width: isHovered ? 44 : 26,
            height: isHovered ? 44 : 26,
            borderColor: isHovered ? 'var(--color-primary)' : 'rgba(0, 240, 255, 0.3)',
            borderWidth: isHovered ? '2px' : '1px',
            backgroundColor: isHovered ? 'rgba(0, 240, 255, 0.05)' : 'rgba(0, 240, 255, 0)',
          }}
          transition={{ type: 'spring', stiffness: 350, damping: 22 }}
          style={{
            scaleX,
            scaleY,
            rotate: angle,
          }}
          className="rounded-full border pointer-events-none relative flex items-center justify-center transition-colors duration-300"
        >
          {/* Thước ngắm sợi tóc kỹ thuật CAD ở các rìa vòng tròn */}
          <div className="absolute w-1 h-px bg-brand-cyan/40 left-0 -translate-x-full" />
          <div className="absolute w-1 h-px bg-brand-cyan/40 right-0 translate-x-full" />
          <div className="absolute h-1 w-px bg-brand-cyan/40 top-0 -translate-y-full" />
          <div className="absolute h-1 w-px bg-brand-cyan/40 bottom-0 translate-y-full" />
        </motion.div>

        {/* 3. Khung HUD hiển thị thông số tọa độ và loại mục tiêu khi hover */}
        <motion.div
          animate={{
            opacity: isHovered ? 0.95 : 0,
            x: isHovered ? 26 : 18,
            y: isHovered ? 26 : 18,
          }}
          transition={{ duration: 0.2 }}
          className={`absolute font-mono text-[7px] border px-2 py-1 rounded-sm flex flex-col gap-0.5 pointer-events-none backdrop-blur-sm shadow-md transition-colors ${
            isDark 
              ? 'bg-[#151515]/90 border-[#333] text-primary' 
              : 'bg-white/90 border-[#e5e5e5] text-primary'
          }`}
        >
          <span className="font-bold">TARGET: {hoveredType?.toUpperCase()}</span>
          <span className="text-on-surface-variant/50">LOCK_STATE: LOCKED</span>
        </motion.div>
      </motion.div>

      {/* 4. Đèn pin rọi lộ lưới nền (Spotlight Radial Glow) */}
      <div
        className="fixed inset-0 pointer-events-none z-30"
        style={{
          background: `radial-gradient(150px circle at var(--mouse-x, -1000px) var(--mouse-y, -1000px), ${
            isDark ? 'rgba(0, 240, 255, 0.05)' : 'rgba(0, 240, 255, 0.08)'
          } 0%, transparent 100%)`,
        }}
      />
    </>
  );
};

export default CursorSpotlight;

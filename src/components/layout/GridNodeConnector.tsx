import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

// Component GridNodeConnector vẽ hiệu ứng kết nối các giao điểm của lưới tọa độ (bg-grid)
// theo vị trí di chuột thời gian thực trên HTML5 Canvas
const GridNodeConnector: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [isMobile, setIsMobile] = useState(true);

  // Kiểm tra thiết bị di động / có hỗ trợ chuột chính xác không
  useEffect(() => {
    const mediaQuery = window.matchMedia('(pointer: fine)');
    setIsMobile(!mediaQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsMobile(!e.matches);
    };

    mediaQuery.addEventListener('change', handleMediaChange);
    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange);
    };
  }, []);

  // Đăng ký theo dõi vị trí chuột trên viewport
  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseLeave = () => {
      setMousePos({ x: -1000, y: -1000 });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isMobile]);

  // Vẽ các đường nối giao điểm và nốt sáng trên Canvas
  useEffect(() => {
    if (isMobile) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const gridSize = 40; // Trùng khớp với kích thước ô lưới bg-grid trong CSS
    const radius = 120; // Bán kính quét tìm các giao điểm

    // Cập nhật kích thước canvas theo kích thước viewport
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Vòng lặp vẽ liên tục (Animation loop) tối ưu hóa hiệu năng
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (mousePos.x < 0 || mousePos.y < 0) {
        animationFrameId = requestAnimationFrame(draw);
        return;
      }

      const mx = mousePos.x;
      const my = mousePos.y;

      // Xác định khoảng cột và hàng của lưới nằm trong bán kính tìm kiếm quanh con trỏ
      const startCol = Math.floor((mx - radius) / gridSize);
      const endCol = Math.ceil((mx + radius) / gridSize);
      const startRow = Math.floor((my - radius) / gridSize);
      const endRow = Math.ceil((my + radius) / gridSize);

      // Thiết lập màu sắc hệ thống dựa theo theme hiện hành
      const isDark = theme === 'dark';
      const colorRGB = isDark ? '0, 242, 254' : '0, 180, 200';

      for (let col = startCol; col <= endCol; col++) {
        for (let row = startRow; row <= endRow; row++) {
          const x = col * gridSize;
          const y = row * gridSize;

          // Bỏ qua các điểm ngoài ranh giới hiển thị của canvas
          if (x < 0 || x > canvas.width || y < 0 || y > canvas.height) continue;

          // Tính khoảng cách Euclidean từ chuột tới giao điểm lưới
          const dx = x - mx;
          const dy = y - my;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < radius) {
            // Kiểm tra xem giao điểm lưới (x, y) có nằm đè lên card/button/input hoặc văn bản nào không
            // Sử dụng document.elementFromPoint để xác định phần tử thực tế tại tọa độ đó
            const el = document.elementFromPoint(x, y);
            const isInsideCard = el && !!el.closest('a, button, input, textarea, select, nav, [role="button"], form, div[class*="border"], div[class*="bg-surface-container"], h1, h2, h3, h4, h5, h6, p, span, li, label, code, pre');
            
            if (isInsideCard) continue;

            // Tỷ lệ độ mờ dựa trên khoảng cách (càng gần càng sáng rõ)
            const opacity = (1 - distance / radius) * 0.45;

            //  Vẽ đường kết nối từ chuột tới giao điểm lưới
            ctx.beginPath();
            ctx.moveTo(mx, my);
            ctx.lineTo(x, y);
            ctx.strokeStyle = `rgba(${colorRGB}, ${opacity * 0.6})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();

            //  Vẽ điểm giao điểm phát sáng
            ctx.beginPath();
            ctx.arc(x, y, 2.5, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${colorRGB}, ${opacity})`;
            ctx.shadowColor = `rgba(${colorRGB}, 0.5)`;
            ctx.shadowBlur = 4;
            ctx.fill();
            ctx.shadowBlur = 0; // Reset shadow để không ảnh hưởng hiệu suất vẽ
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mousePos, theme, isMobile]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-20"
      style={{ mixBlendMode: theme === 'dark' ? 'screen' : 'multiply' }}
    />
  );
};

export default GridNodeConnector;

import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Định nghĩa thuộc tính phụ trên window để theo dõi trạng thái cuộn tự động bằng mã lệnh
declare global {
  interface Window {
    isProgrammaticScroll?: boolean;
  }
}

/**
 * Hook useScrollSpy giúp theo dõi section nào đang hiển thị trên màn hình
 * và đồng bộ với URL hash của react-router-dom.
 */
export const useScrollSpy = (sectionIds: string[], offset: number = 100) => {
  const [activeSection, setActiveSection] = useState<string>('');
  const location = useLocation();

  // Đồng bộ activeSection ngay lập tức khi URL hash thay đổi (do người dùng click link)
  useEffect(() => {
    const hash = location.hash.replace('#', '');
    if (hash && sectionIds.includes(hash)) {
      setActiveSection(hash);
      // Đánh dấu đang thực hiện cuộn chủ động để chặn scroll spy
      window.isProgrammaticScroll = true;
    }
  }, [location.hash, sectionIds]);

  useEffect(() => {
    let fallbackTimeout: number;

    const handleScroll = () => {
      // Nếu đang trong quá trình cuộn tự động bằng click, bỏ qua cập nhật
      if (window.isProgrammaticScroll) return;

      const scrollPosition = window.scrollY + offset;

      // Tìm section hiện tại đang nằm trong viewport
      const currentSection = sectionIds.find((id) => {
        const element = document.getElementById(id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          return scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight;
        }
        return false;
      });

      if (currentSection && currentSection !== activeSection) {
        setActiveSection(currentSection);
        // Cập nhật URL hash mà không làm reload trang hoặc nhảy scroll
        window.history.replaceState(null, '', `#${currentSection}`);
      }
    };

    // Giải phóng trạng thái khóa khi trình duyệt hoàn thành cuộn mượt
    const handleScrollEnd = () => {
      window.isProgrammaticScroll = false;
      handleScroll();
    };

    // Fallback cho trình duyệt cũ không hỗ trợ sự kiện scrollend
    const handleScrollWithFallback = () => {
      handleScroll();
      if (window.isProgrammaticScroll) {
        window.clearTimeout(fallbackTimeout);
        fallbackTimeout = window.setTimeout(() => {
          window.isProgrammaticScroll = false;
          handleScroll();
        }, 1000); // 1 giây dự phòng
      }
    };

    window.addEventListener('scroll', handleScrollWithFallback, { passive: true });
    window.addEventListener('scrollend', handleScrollEnd);
    handleScroll(); // Chạy lần đầu khi load

    return () => {
      window.removeEventListener('scroll', handleScrollWithFallback);
      window.removeEventListener('scrollend', handleScrollEnd);
      window.clearTimeout(fallbackTimeout);
    };
  }, [sectionIds, offset, activeSection]);

  return activeSection || location.hash.replace('#', '') || sectionIds[0];
};

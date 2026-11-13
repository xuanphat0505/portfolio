import { useState, useEffect, useRef } from 'react';
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
  const activeRef = useRef<string>('');
  const location = useLocation();
  const hash = location.hash.replace('#', '');

  // Đồng bộ activeSection ngay khi URL hash đổi, xử lý ngay lúc render để không gọi setState trong effect
  const [syncedHash, setSyncedHash] = useState(hash);
  if (hash !== syncedHash) {
    setSyncedHash(hash);
    if (hash && sectionIds.includes(hash)) {
      setActiveSection(hash);
    }
  }

  // Khi vào trang với hash hợp lệ thì khởi tạo section và chặn scroll spy đến khi cuộn xong
  useEffect(() => {
    if (hash && sectionIds.includes(hash)) {
      activeRef.current = hash;
      window.isProgrammaticScroll = true;
    }
  }, [hash, sectionIds]);

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

      if (currentSection && currentSection !== activeRef.current) {
        activeRef.current = currentSection;
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
  }, [sectionIds, offset]);

  return activeSection || hash || sectionIds[0];
};

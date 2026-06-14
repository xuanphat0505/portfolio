import React from "react";
import CountUpComponent from "react-countup";
import { useTheme } from "@/contexts/ThemeContext";

// Giải quyết vấn đề tương thích import của react-countup trong môi trường Vite + React 19
const CountUp = (CountUpComponent as any).default || CountUpComponent;

// Định nghĩa cấu trúc dữ liệu cho từng thông số thống kê
interface StatItem {
  numericValue: number; // Giá trị dạng số phục vụ cho hiệu ứng chạy số
  prefix?: string; // Tiền tố trước con số (ví dụ: '0')
  suffix?: string; // Hậu tố sau con số (ví dụ: '+', '%', 'K+')
  label: string; // Nhãn mô tả thông số
  code: string; // Mã kỹ thuật gợi nhớ đến dự án trong CV
}

const STATS_DATA: StatItem[] = [
  {
    numericValue: 1,
    suffix: "+",
    label: "YEARS EXPERIENCE",
    code: "AUTOMATION_LAND_FS",
  },
  {
    numericValue: 2,
    prefix: "0",
    label: "MAJOR PROJECTS",
    code: "VCHAT_&_CINESTREAM",
  },
  {
    numericValue: 6,
    suffix: "K+",
    label: "ACTIVE USERS",
    code: "ZALO_MINI_APP_PROD",
  },
  {
    numericValue: 30,
    suffix: "%",
    label: "LCP REDUCTION",
    code: "AWS_CDN_OPTIMIZED",
  },
];

// Component StatsSection hiển thị các con số thống kê nổi bật từ CV với hiệu ứng đếm số và đồ họa kiến trúc
const StatsSection: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section
      className={`w-full border-y transition-colors duration-500 relative z-10 overflow-hidden ${
        isDark
          ? "bg-[#0a0a0a] border-[#333333]"
          : "bg-[#ffffff] border-[#e5e5e5]"
      }`}
    >
      {/* Lưới tọa độ phụ trợ (Grid) tạo cảm giác kỹ thuật */}
      <div className="absolute inset-0 bg-grid opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div
          className={`grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x transition-colors duration-500 py-2 md:py-0 ${
            isDark ? "divide-[#333333]/50" : "divide-[#e5e5e5]/50"
          }`}
        >
          {STATS_DATA.map((stat) => (
            <div
              key={stat.code}
              className="py-12 md:py-20 flex flex-col justify-center relative group px-6 md:px-10 transition-all duration-300 hover:bg-brand-cyan/1.5"
            >
              {/* Khung góc kiến trúc (Blueprint brackets) sáng lên khi hover */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-transparent group-hover:border-primary transition-colors duration-300" />
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-transparent group-hover:border-primary transition-colors duration-300" />
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-transparent group-hover:border-primary transition-colors duration-300" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-transparent group-hover:border-primary transition-colors duration-300" />

              {/* Dòng ghi chú kỹ thuật hệ thống */}
              <span className="font-mono text-[8px] text-[#555] tracking-widest uppercase mb-4 block group-hover:text-primary transition-colors">
                // SYS_METRIC: {stat.code}
              </span>

              {/* Con số chính chạy hoạt ảnh CountUp */}
              <h3
                className={`text-4xl md:text-5xl lg:text-[3.5rem] font-bold tracking-tight mb-2 transition-colors duration-500 ${
                  isDark ? "text-white" : "text-[#121212]"
                }`}
              >
                <CountUp
                  end={stat.numericValue}
                  duration={2}
                  enableScrollSpy
                  scrollSpyOnce
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                />
              </h3>

              {/* Tiêu đề thông số */}
              <p
                className={`font-mono text-[9px] md:text-[10px] tracking-[0.2em] uppercase transition-colors duration-500 ${
                  isDark ? "text-[#888]" : "text-[#666]"
                }`}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;

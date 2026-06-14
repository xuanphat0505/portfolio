import React from 'react';
import { SectionHeader, TechTag } from '@/components/ui';

// Định nghĩa cấu trúc dữ liệu cho từng bảng tiến trình (Process Panel)
interface ProcessPanel {
  id: string;
  title: string;
  subtitle: string;
  status: 'ACTIVE_RUNNING' | 'SYSTEM_IDLE';
  period: string;
  location: string;
  systemMetrics: { label: string; value: string }[];
  logs: string[];
  techTags: string[];
}

const PROCESSES_DATA: ProcessPanel[] = [
  {
    id: 'SYS_PROCESS: WORK_EXP',
    title: 'Frontend Developer Fresher',
    subtitle: 'Automation Land',
    status: 'ACTIVE_RUNNING',
    period: 'JUN 2025 - PRESENT',
    location: 'Ho Chi Minh City, VN',
    systemMetrics: [
      { label: 'THREAD_COUNT', value: '4_CORES' },
      { label: 'PROD_DEPLOY', value: 'ZALO_MINI_APP' },
      { label: 'PERF_IMPACT', value: 'LCP_-30%' }
    ],
    logs: [
      'Developed a modular, drag-and-drop landing page builder using ReactJS and Craft.js, boosting marketing deployment speed by 50%.',
      'Published a Zalo Mini App serving 6,000+ active users with JWT authentication and optimized state management.',
      'Refactored legacy JS codebases to strict TypeScript, eliminating type errors and reducing runtime bugs by 35%.',
      'Configured automated CI/CD via GitHub Actions/Docker and optimized asset delivery via AWS S3 + CloudFront CDN.'
    ],
    techTags: ['ReactJS', 'TypeScript', 'Craft.js', 'Docker', 'AWS S3', 'CloudFront', 'GitHub Actions']
  },
  {
    id: 'SYS_PROCESS: EDUCATION',
    title: 'Bachelor of IoT',
    subtitle: 'Posts & Telecoms Institute of Technology',
    status: 'ACTIVE_RUNNING',
    period: 'SEP 2022 - JUN 2027',
    location: 'Ho Chi Minh City, VN',
    systemMetrics: [
      { label: 'ACADEMIC_GPA', value: '3.25 / 4.0' },
      { label: 'CORE_FOCUS', value: 'EMBEDDED_SYS' },
    ],
    logs: [
      'Maintained a strong cumulative GPA of 3.25 / 4.0, ranking in the top tier of the Internet of Things major.',
      'Acquired comprehensive knowledge of embedded systems, wireless network architectures, and advanced web technologies.',
      'Collaborated on practical academic projects involving hardware-software integration and network communications.'
    ],
    techTags: ['IoT Architecture', 'Embedded Systems', 'Network Protocols', 'C/C++']
  }
];

// Component ExperienceSection hiển thị thông tin học vấn và kinh nghiệm song song dưới dạng hệ thống đo lường viễn thông
const ExperienceSection: React.FC = () => {

  return (
    <section id="experience" className="w-full py-24 md:py-32 bg-surface transition-colors duration-500 relative overflow-hidden">
      {/* Lưới kỹ thuật nền */}
      <div className="absolute inset-0 bg-grid opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <SectionHeader 
          title="EXPERIENCE & EDUCATION"
          description="Parallel execution threads of professional experiences and academic background."
          className="border-none mb-16"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 relative">
          
          {/* Đường phân tách thiết kế kỹ thuật giữa hai tiến trình */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-outline-variant/15 -translate-x-1/2">
            <div className="absolute top-10 left-1/2 -translate-x-1/2 w-3 h-3 bg-surface border border-outline-variant/30 flex items-center justify-center font-mono text-[7px] text-on-surface-variant/40">+</div>
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-3 h-3 bg-surface border border-outline-variant/30 flex items-center justify-center font-mono text-[7px] text-on-surface-variant/40">+</div>
          </div>

          {PROCESSES_DATA.map((process) => {
            return (
              <div 
                key={process.id}
                className="group bg-surface-container-low border border-outline-variant/15 p-6 md:p-8 flex flex-col justify-between transition-all duration-500 hover:bg-surface-container-high hover:border-brand-cyan/30 relative"
              >
                {/* Lắp khung góc Blueprint chỉ phát sáng khi hover */}
                <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-transparent group-hover:border-brand-cyan transition-all duration-300" />
                <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-transparent group-hover:border-brand-cyan transition-all duration-300" />
                <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l border-transparent group-hover:border-brand-cyan transition-all duration-300" />
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-transparent group-hover:border-brand-cyan transition-all duration-300" />

                <div>
                  {/* Bảng điều khiển tiêu đề phụ */}
                  <div className="flex items-center justify-between border-b border-outline-variant/15 pb-4 mb-6">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[10px] text-primary font-bold">
                        {process.id}
                      </span>
                      <span className="font-mono text-[9px] text-on-surface-variant/30">//</span>
                      <div className="flex items-center gap-1.5">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-cyan/40 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-cyan"></span>
                        </span>
                        <span className="font-mono text-[9px] text-brand-cyan tracking-wider font-bold">
                          [ONLINE]
                        </span>
                      </div>
                    </div>

                    <div className="font-mono text-[10px] text-on-surface-variant/70 tracking-widest bg-surface px-2.5 py-1 border border-outline-variant/10">
                      {process.period}
                    </div>
                  </div>

                  {/* Tên vị trí & Cơ quan */}
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold tracking-tight uppercase group-hover:text-primary transition-colors duration-300">
                      {process.title}
                    </h3>
                    <p className="font-mono text-sm text-on-surface-variant/70 mt-1">
                      {process.subtitle} — <span className="text-[11px] text-on-surface-variant/40">{process.location}</span>
                    </p>
                  </div>

                  {/* Chỉ số hệ thống đo lường (Telemetry metrics) */}
                  <div className={`grid gap-2 bg-surface p-4 border border-outline-variant/10 rounded-sm mb-6 ${
                    process.systemMetrics.length === 2 ? 'grid-cols-2' : 'grid-cols-2 sm:grid-cols-3'
                  }`}>
                    {process.systemMetrics.map((metric, mIdx) => (
                      <div key={mIdx} className="text-center space-y-1">
                        <p className="font-mono text-[8px] text-on-surface-variant/40 tracking-wider">
                          {metric.label}
                        </p>
                        <p className="font-mono text-[11px] text-primary font-bold">
                          {metric.value}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Danh sách logs chi tiết */}
                  <div className="space-y-3 font-mono text-xs text-on-surface-variant/90 py-1">
                    {process.logs.map((log, lIdx) => (
                      <div key={lIdx} className="relative leading-relaxed pl-5">
                        <svg 
                          className="absolute left-0 top-[3px] w-2.5 h-2.5 text-brand-cyan fill-brand-cyan select-none" 
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                        {log}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech tags chân trang */}
                <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-outline-variant/10">
                  {process.techTags.map((tag) => (
                    <TechTag key={tag} label={tag} />
                  ))}
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;

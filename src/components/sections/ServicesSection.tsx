import React from 'react';
import { SectionHeader, TechTag } from '@/components/ui';

// Dữ liệu mô phỏng dựa trên design pattern
const services = [
  {
    id: '01',
    title: 'INTERFACE ENGINEERING',
    description: 'Crafting high-fidelity, deterministic UIs with a focus on performance, accessibility, and complex animations using modern frameworks.',
    tags: ['REACT', 'TYPESCRIPT', 'FRAMER_MOTION'],

    icon: (
        <svg className="w-5 h-5 opacity-60 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
    )
  },
  {
    id: '02',
    title: 'BACKEND ARCHITECTURE',
    description: 'Designing modular microservices and robust API layers with efficient data modeling and high concurrence handling.',
    tags: ['NESTJS', 'NODE.JS', 'MONGODB'],
    icon: (
      <svg className="w-5 h-5 opacity-60 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1.5" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
    )
  },
  {
    id: '03',
    title: 'CLOUD & DEVOPS',
    description: 'Building automated CI/CD pipelines and optimized content delivery networks to ensure zero-downtime and global scale.',
    tags: ['AWS', 'DOCKER', 'CI/CD'],
    icon: (
        <svg className="w-5 h-5 opacity-60 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>
    )
  }
];

// Component ServicesSection hiển thị các dịch vụ/năng lực cốt lõi (Core Infrastructure) của nhà phát triển
const ServicesSection: React.FC = () => {
  return (
    <section id="services" className="w-full bg-surface-container-low py-24 md:py-32 relative transition-colors duration-500">
      {/* Lưới tọa độ phụ trợ (Grid) tạo cảm giác kỹ thuật */}
      <div className="absolute inset-0 bg-grid opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Tiêu đề ẩn viền dưới để tuân thủ No-Line Rule */}
        <SectionHeader 
          title="CORE INFRASTRUCTURE"
          description="Systematic approach to software engineering through rigorous testing, performance profiling, and clean modular boundaries."
          className="border-none! mb-16!" 
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service) => (
            <div 
              key={service.id}
              className="group bg-surface border border-outline-variant/15 p-8 flex flex-col justify-between min-h-[340px] transition-all duration-500 hover:bg-surface-container-high hover:scale-[1.02] cursor-pointer"
            >
              <div>
                <div className="flex justify-between items-start mb-12">
                  <span className="font-mono text-primary text-[11px] font-bold tracking-widest group-hover:text-primary-light transition-colors duration-300">
                    {service.id}//
                  </span>
                  {service.icon}
                </div>
                
                <h3 className="text-xl font-bold tracking-tight mb-4 uppercase">
                  {service.title}
                </h3>
                
                {/* Dùng on_surface_variant cho text nhỏ để giảm mỏi mắt */}
                <p className="text-on-surface-variant line-clamp-4 text-[15px] leading-relaxed mb-8">
                  {service.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 mt-auto">
                {service.tags.map(tag => (
                  <TechTag key={tag} label={tag} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;

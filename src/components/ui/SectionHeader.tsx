import React from 'react';

interface SectionHeaderProps {
  title: string;
  description?: string;
  className?: string;
}

// Component SectionHeader hiển thị tiêu đề chung cho các section kèm mô tả ngắn.
const SectionHeader: React.FC<SectionHeaderProps> = ({ 
  title, 
  description, 
  className = '' 
}) => {
  return (
    <div className={`mb-12 border-b border-brand-border/50 pb-6 w-full flex flex-col md:flex-row md:items-end justify-between gap-6 ${className}`}>
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight uppercase">
        {title}
      </h2>
      
      {description && (
        <p className="font-mono text-[11px] text-[#888] max-w-sm md:text-right leading-relaxed tracking-wider">
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;

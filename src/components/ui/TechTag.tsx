import React from 'react';

// Component TechTag hiển thị các nhãn công nghệ dưới dạng chip nhãn.
const TechTag: React.FC<{ label: string }> = ({ label }) => {
  return (
    <span className="bg-surface-container-high text-on-surface-variant px-3 py-1.5 text-[10px] uppercase font-mono tracking-wider rounded-full whitespace-nowrap border border-outline-variant/10">
      {label}
    </span>
  );
};

export default TechTag;

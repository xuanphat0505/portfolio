import React from "react";

// Component Footer hiển thị thông tin bản quyền, phiên bản hệ thống và liên kết mạng xã hội ở chân trang.
const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-surface-container-low border-t border-outline-variant/10 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Left Side: Brand & Technical Version */}
        <div className="flex flex-col gap-2 items-center md:items-start text-center md:text-left">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-3 bg-primary" />
            <span className="font-bold tracking-tighter text-sm uppercase">
              Architect
            </span>
          </div>
          <p className="font-mono text-[9px] text-[#555] tracking-widest leading-relaxed">
            FULLSTACK TECHNICAL PORTFOLIO v1.0.2 <br />© {currentYear} ALL
            SYSTEMS OPERATIONAL
          </p>
        </div>

        {/* Center: Social Links */}
        <div className="flex gap-8 items-center">
          <a
            href="https://github.com/xuanphat0505"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[10px] tracking-widest text-[#888] hover:text-primary transition-colors"
          >
            GH
          </a>
          <a
            href="https://www.linkedin.com/in/phat-tran-10872831a"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[10px] tracking-widest text-[#888] hover:text-primary transition-colors"
          >
            LI
          </a>
          <a
            href="https://www.facebook.com/phat.tran.306106"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[10px] tracking-widest text-[#888] hover:text-primary transition-colors"
          >
            FB
          </a>
        </div>

        {/* Right Side: System Timestamp */}
        <div className="text-center md:text-right">
          <p className="font-mono text-[9px] text-[#555] tracking-widest uppercase">
            Build Timestamp: {new Date().toISOString().split("T")[0]}
            .04.14.02.53
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

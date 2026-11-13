import React from "react";
import { Cloud, Terminal, Server } from "lucide-react";

// Component AboutSection hiển thị thông tin chi tiết về hệ sinh thái kỹ thuật, năng lực cốt lõi và các công cụ phát triển.
const AboutSection: React.FC = () => {
  // Bộ công cụ lập trình Front-end chính lấy từ CV
  const frontendStack = [
    { name: "ReactJS", version: "v18.x" },
    { name: "TypeScript", version: "ES2023" },
    { name: "Redux Toolkit", version: "State Management" },
    { name: "Tailwind CSS", version: "Utility-First" },
    { name: "Ant Design", version: "Component System" },
    { name: "Craft.js", version: "UI Builder Core" },
  ];

  // Hệ thống Back-end và cơ sở dữ liệu lấy từ CV
  const infrastructureStack = [
    { name: "Node.js", type: "Runtime" },
    { name: "Express.js", type: "API Framework" },
    { name: "NestJS Core", type: "Backend System" },
    { name: "MongoDB", type: "Document DB" },
    { name: "MySQL", type: "Relational DB" },
    { name: "Socket.IO / WebRTC", type: "Real-time / P2P" },
  ];

  // Các công cụ lưu trữ, hạ tầng và CI/CD tự động hóa lấy từ CV
  const pipelineTools = [
    { id: "AWS_S3", icon: <Cloud size={20} />, label: "AWS_S3_STORAGE" },
    { id: "CI_CD", icon: <Terminal size={20} />, label: "GITHUB_ACTIONS" },
    { id: "CDN", icon: <Cloud size={20} />, label: "AWS_CLOUDFRONT_CDN" },
    { id: "NGINX", icon: <Server size={20} />, label: "REVERSE_PROXY" },
  ];

  return (
    <section
      id="about"
      className="w-full py-24 md:py-32 bg-surface relative overflow-hidden"
    >
      {/* Background Grid - Tuân thủ thiết kế kỹ thuật */}
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16 px-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-2 uppercase">
              TECHNICAL_ECOSYSTEM
            </h2>
            <p className="font-mono text-[11px] text-on-surface-variant/50 tracking-widest uppercase">
              Documentation of core competencies and toolchain integration.
            </p>
          </div>
          <div className="hidden lg:block font-mono text-[10px] text-on-surface-variant/30 tracking-[0.2em]">
            [01000110 01010010 01001111 01001110 01010100 01000101 01001110
            01000100]
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 border border-outline-variant/15">
          {/* Column 01: Frontend Architecture */}
          <div className="p-8 lg:p-12 border-b lg:border-b-0 lg:border-r border-outline-variant/15 space-y-12">
            <h4 className="font-mono text-primary text-[11px] font-bold tracking-[0.3em] uppercase">
              01. FRONTEND_ARCHITECTURE
            </h4>
            <div className="space-y-6">
              {frontendStack.map((item) => (
                <div
                  key={item.name}
                  className="flex justify-between items-center text-sm font-mono group"
                >
                  <span className="transition-colors duration-300 group-hover:text-primary">
                    {item.name}
                  </span>
                  <span className="text-on-surface-variant/40 group-hover:text-on-surface-variant/80 transition-colors duration-300 text-[10px]">
                    {item.version}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Column 02: Infrastructure Core */}
          <div className="p-8 lg:p-12 border-b lg:border-b-0 lg:border-r border-outline-variant/15 space-y-12">
            <h4 className="font-mono text-primary text-[11px] font-bold tracking-[0.3em] uppercase">
              02. INFRASTRUCTURE_CORE
            </h4>
            <div className="space-y-6">
              {infrastructureStack.map((item) => (
                <div
                  key={item.name}
                  className="flex justify-between items-center text-sm font-mono group"
                >
                  <span className="transition-colors duration-300 group-hover:text-primary">
                    {item.name}
                  </span>
                  <span className="text-on-surface-variant/40 group-hover:text-on-surface-variant/80 transition-colors duration-300 text-[10px]">
                    {item.type}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Column 03: Deployment Pipeline */}
          <div className="p-8 lg:p-12 space-y-12">
            <h4 className="font-mono text-primary text-[11px] font-bold tracking-[0.3em] uppercase">
              03. DEPLOYMENT_PIPELINE
            </h4>

            <div className="grid grid-cols-2 gap-4">
              {pipelineTools.map((tool) => (
                <div
                  key={tool.id}
                  className="p-6 bg-surface-container-low border border-outline-variant/15 flex flex-col items-center justify-center gap-4 hover:border-primary/50 hover:bg-surface-container-high transition-all group overflow-hidden relative"
                >
                  <div className="text-on-surface-variant group-hover:text-primary transition-colors">
                    {tool.icon}
                  </div>
                  <span className="font-mono text-[9px] tracking-tighter text-on-surface-variant/80 group-hover:text-primary transition-colors">
                    {tool.label}
                  </span>
                  {/* Subtle hover decorative line */}
                  <div className="absolute bottom-0 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-500" />
                </div>
              ))}
            </div>

            <div>
              <p className="font-mono text-[10px] text-on-surface-variant/50 italic leading-relaxed text-right md:text-left">
                "Optimal architecture minimizes complexity perception <br /> for
                end-users."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

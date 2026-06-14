import React from "react";
import { motion } from "framer-motion";
import { SectionHeader, TechTag } from "@/components/ui";
import { GitBranch, ExternalLink } from "lucide-react";
import chatAppImg from "@/assets/images/chat-app.png";
import movieWebsiteImg from "@/assets/images/movie-website.png";

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  color: string;
  link: string;
  githubFE?: string;
  githubBE?: string;
  image?: string;
}

const projects: Project[] = [
  {
    id: "01",
    title: "VChat",
    category: "Real-time Chat Application",
    description:
      "A scalable, real-time 1-on-1 messaging platform featuring secure peer-to-peer WebRTC video calls, JWT token rotation, and optimized virtual list rendering.",
    tags: [
      "ReactJS",
      "Redux Toolkit",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Socket.IO",
      "WebRTC",
    ],
    color: "from-blue-600/20 to-cyan-500/10",
    link: "https://chat-app-0505.netlify.app",
    githubFE: "https://github.com/xuanphat0505/social-network-fe",
    githubBE: "https://github.com/xuanphat0505/social-network-be",
    image: chatAppImg,
  },
  {
    id: "02",
    title: "CINESTREAM PORTAL",
    category: "Movie Streaming Website",
    description:
      "A fully responsive movie streaming application optimized for cross-platform browsers, featuring an admin dashboard with role-based access control and real-time collaborative watch parties.",
    tags: ["ReactJS", "Node.js", "Express.js", "MongoDB", "Socket.IO"],
    color: "from-purple-600/20 to-pink-500/10",
    link: "http://movie-web-0505.netlify.app",
    githubFE: "https://github.com/xuanphat0505/movie-website-fe",
    githubBE: "https://github.com/xuanphat0505/movie-website-be",
    image: movieWebsiteImg,
  },
];

// Component ProjectSection hiển thị danh sách các dự án thực tế với hiệu ứng hover và bố cục kiến trúc
const ProjectSection: React.FC = () => {
  return (
    <section
      id="projects"
      className="w-full py-32 bg-surface-container-low transition-colors duration-700 relative overflow-hidden"
    >
      {/* Lưới tọa độ phụ trợ (Grid) tạo cảm giác kỹ thuật */}
      <div className="absolute inset-0 bg-grid opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          title="SELECTED PROJECTS"
          description="Documentation of system deployments and integrated platform architectures."
          className="border-none! mb-24"
        />

        <div className="flex flex-col gap-32">
          {projects.map((project, index) => {
            const isEven = index % 2 === 0;
            // Xử lý render cho từng dự án, thay đổi chiều hiển thị chẵn/lẻ và cấu hình ảnh minh họa
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className={`flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} items-center gap-12 lg:gap-24`}
              >
                <div
                  className={`w-full lg:w-[60%] aspect-video relative group overflow-hidden bg-surface-container border border-outline-variant/10`}
                >
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div
                      className={`absolute inset-0 bg-linear-to-br ${project.color} transition-transform duration-700 group-hover:scale-110`}
                    />
                  )}
                  <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="absolute top-4 left-4 font-mono text-[9px] text-[#555] tracking-widest uppercase z-10">
                    // BUILD_ID: {project.id}_RELEASE
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-2 bg-white text-black font-mono text-[10px] tracking-widest uppercase hover:bg-primary hover:text-white transition-colors"
                    >
                      Deploy_Live_Build
                    </a>
                  </div>
                </div>

                {/* Project Content */}
                <div className="w-full lg:w-[40%] space-y-6">
                  <div className="space-y-2">
                    <span className="font-mono text-[10px] text-primary tracking-[0.2em] uppercase">
                      [{project.category}]
                    </span>
                    <h3 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
                      {project.title}
                    </h3>
                  </div>

                  <p className="text-on-surface-variant text-[15px] leading-relaxed font-mono italic">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-4">
                    {project.tags.map((tag) => (
                      <TechTag key={tag} label={tag} />
                    ))}
                  </div>

                  <div className="pt-8 flex flex-wrap gap-4">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 border border-primary/30 bg-primary/5 hover:bg-primary hover:text-black text-[10px] font-mono tracking-wider text-primary transition-all duration-300 rounded-[2px] group relative overflow-hidden cursor-pointer"
                    >
                      <ExternalLink size={12} className="transition-transform duration-300 group-hover:scale-110" />
                      <span>LIVE_DEMO</span>
                    </a>

                    {project.githubFE && (
                      <a
                        href={project.githubFE}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2.5 border border-outline-variant/20 bg-surface-container/50 hover:bg-primary/5 hover:border-primary/55 text-[10px] font-mono tracking-wider text-on-surface-variant hover:text-primary transition-all duration-300 rounded-[2px] group relative overflow-hidden cursor-pointer"
                      >
                        <GitBranch size={12} className="transition-transform duration-300 group-hover:scale-110" />
                        <span>SOURCE (FE)</span>
                      </a>
                    )}

                    {project.githubBE && (
                      <a
                        href={project.githubBE}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2.5 border border-outline-variant/20 bg-surface-container/50 hover:bg-primary/5 hover:border-primary/55 text-[10px] font-mono tracking-wider text-on-surface-variant hover:text-primary transition-all duration-300 rounded-[2px] group relative overflow-hidden cursor-pointer"
                      >
                        <GitBranch size={12} className="transition-transform duration-300 group-hover:scale-110" />
                        <span>SOURCE (BE)</span>
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-48 flex justify-center">
          <div className="group flex flex-col items-center gap-4 cursor-default">
            <span className="font-mono text-[11px] tracking-[0.3em] text-[#555] uppercase">
              End of Project Documentation
            </span>
            <div className="w-px h-12 bg-outline-variant/30 group-hover:bg-primary transition-all" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectSection;

import React from "react";
import { Button } from "@/components/ui";
import { CodeTerminal } from ".";

// Component HeroSection hiển thị phần màn hình đầu tiên của website (Hero) với tiêu đề, mô tả và terminal mô phỏng.
const HeroSection: React.FC = () => {
  const handleScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    target: string,
  ) => {
    e.preventDefault();
    const element = document.getElementById(target);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="min-h-[calc(100vh-80px)] flex flex-col justify-center px-6 max-w-7xl mx-auto py-20 lg:py-0 border-b border-brand-border lg:border-none"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center w-full">
        {/* Left Column: Text & CTA */}
        <div className="space-y-8 relative z-10">
          <div className="inline-block border border-brand-cyan/30 px-3 py-1.5 bg-brand-cyan/5">
            <span className="text-brand-cyan font-mono text-[10px] tracking-[0.2em] uppercase">
              System Status: Active
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold leading-[1.05] tracking-tighter">
            Frontend <br /> Developer.
          </h1>

          <p className="text-on-surface-variant text-base md:text-lg font-mono leading-relaxed max-w-xl">
            {`>`} Specialized Frontend Developer with knowledge of
            Node.js/NestJS and DevOps. I bridge the gap between high-end
            interfaces and scalable cloud-native infrastructure.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            {/* Link đến dự án */}
            <a
              href="#projects"
              onClick={(e) => handleScroll(e, "projects")}
              className="w-full sm:w-auto"
            >
              <Button variant="solid" className="w-full">
                VIEW_PROJECTS
                <span className="ml-2">→</span>
              </Button>
            </a>

            {/* Link đến liên hệ hoặc About */}
            <a
              href="#about"
              onClick={(e) => handleScroll(e, "about")}
              className="w-full sm:w-auto"
            >
              <Button variant="outline" className="w-full">
                INITIALIZE_CONTACT
              </Button>
            </a>
          </div>
        </div>

        {/* Right Column: Visualizer/Terminal */}
        <div className="w-full relative z-10">
          <CodeTerminal />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

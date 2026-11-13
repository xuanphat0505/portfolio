import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { useTheme } from "@/hooks/useTheme";

const navLinks = [
  { id: "01", name: "HOME", href: "home" },
  { id: "02", name: "PROJECTS", href: "projects" },
  { id: "03", name: "EXPERIENCE", href: "experience" },
  { id: "04", name: "ABOUT", href: "about" },
  { id: "05", name: "CONTACT", href: "contact" },
];
const SECTION_IDS = navLinks.map((link) => link.href);

// Component Navbar hiển thị thanh điều hướng của trang web có hiệu ứng sliding indicator.
const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const activeSection = useScrollSpy(SECTION_IDS);

  // Hàm xử lý cuộn mượt khi click vào link
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Chiều cao của Navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      window.history.pushState(null, "", `#${id}`);
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 border-b border-brand-border bg-brand-bg/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-2 group cursor-pointer">
          <div className="w-4 h-4 bg-brand-cyan group-hover:rotate-45 transition-transform duration-300" />
          <span className="font-sans font-bold tracking-tighter text-xl">
            ARCHITECT
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-10 relative">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href;
            return (
              <a
                key={link.id}
                href={`#${link.href}`}
                onClick={(e) => handleScroll(e, link.href)}
                className={`relative py-2 group flex items-center gap-2 font-mono text-[10px] tracking-widest transition-all duration-300 ${
                  isActive
                    ? ""
                    : "text-on-surface-variant hover:text-brand-cyan"
                }`}
              >
                <span
                  className={`transition-colors duration-300 ${isActive ? "text-brand-cyan" : "group-hover:text-brand-cyan/70"}`}
                >
                  // {link.id}
                </span>
                <span className={isActive ? "font-bold" : ""}>{link.name}</span>

                {/* Sliding Indicator (Line) using Framer Motion layoutId */}
                {isActive && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-brand-cyan"
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30,
                    }}
                  />
                )}
              </a>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 border border-brand-border hover:border-brand-cyan hover:text-brand-cyan hover:bg-brand-cyan/5 transition-all duration-300 flex items-center justify-center cursor-pointer"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
          </button>

          <a
            href="/CV_TranXuanPhat_Fresher_FrontendDeveloper.pdf"
            download="CV_TranXuanPhat_Fresher_FrontendDeveloper.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:block px-6 py-2 border border-brand-border font-mono text-[11px] tracking-widest hover:border-brand-cyan hover:bg-brand-cyan/5 transition-all duration-300 uppercase"
          >
            Resume
          </a>

          <button
            onClick={() => setIsMenuOpen((open) => !open)}
            className="md:hidden p-2 border border-brand-border hover:border-brand-cyan hover:text-brand-cyan transition-all duration-300 flex items-center justify-center cursor-pointer"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={14} /> : <Menu size={14} />}
          </button>
        </div>
      </div>

      {/* Menu điều hướng cho màn hình nhỏ */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-brand-border bg-brand-bg">
          <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.href}`}
                onClick={(e) => handleScroll(e, link.href)}
                className={`py-3 font-mono text-[11px] tracking-widest ${
                  activeSection === link.href ? "text-brand-cyan font-bold" : "text-on-surface-variant"
                }`}
              >
                // {link.id} {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

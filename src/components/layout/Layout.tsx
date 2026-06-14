import React, { type ReactNode } from 'react';
import { Navbar, Footer, SystemStatusBar, GridNodeConnector } from '.';

interface LayoutProps {
  children: ReactNode;
}

/**
 * Component Layout bao phủ toàn bộ ứng dụng.
 * Cung cấp Grid Background hệ thống và thanh Navbar cố định.
 */
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-brand-bg relative overflow-x-hidden pb-6">
      {/* Background Grid Layer */}
      <div className="fixed inset-0 bg-grid pointer-events-none opacity-40" />

      {/* Hiệu ứng kết nối các giao điểm lưới ô vuông khi di chuột */}
      <GridNodeConnector />
      
      {/* Subtle Glow Effect */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-cyan/5 blur-[120px] rounded-full pointer-events-none" />
      
      {/* Fixed Navigation */}
      <Navbar />

      {/* Main Content Area */}
      <main className="relative pt-20">
        {children}
      </main>

      {/* Footer Section */}
      <Footer />

      {/* Real-time System Status Bar (VS Code-like) */}
      <SystemStatusBar />

      {/* Vertical Side Lines (Decorative) */}
      <div className="fixed left-6 top-0 bottom-0 w-px border-brand-border/30 hidden lg:block" />
      <div className="fixed right-6 top-0 bottom-0 w-px border-brand-border/30 hidden lg:block" />
    </div>
  );
};

export default Layout;

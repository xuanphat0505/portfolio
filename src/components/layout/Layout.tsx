import React, { type ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import SystemStatusBar from './SystemStatusBar';
import GridNodeConnector from './GridNodeConnector';

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
    </div>
  );
};

export default Layout;

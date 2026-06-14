import { Layout } from '@/components/layout';
import { 
  HeroSection,
  StatsSection,
  ServicesSection, 
  ContactSection, 
  AboutSection, 
  ProjectSection,
  ExperienceSection
} from '@/components/sections';
import { ThemeProvider } from '@/contexts/ThemeContext';

// Component chính của ứng dụng sử dụng Layout để bao bọc toàn bộ các section
function App() {
  return (
    <ThemeProvider>
      <Layout>
        <HeroSection />
        <StatsSection />
        <ServicesSection />
        <ProjectSection />
        <ExperienceSection />
        <AboutSection />
        <ContactSection />
      </Layout>
    </ThemeProvider>
  );
}

export default App;

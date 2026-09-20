import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import SceneAnalysisSection from './components/SceneAnalysisSection';
import BentoFeaturesSection from './components/BentoFeaturesSection';
import FeatureGridSection from './components/FeatureGridSection';
import FooterSection from './components/FooterSection';

export default function App() {
  return (
    <div className="min-h-screen bg-[#08090C] text-white selection:bg-[#00FFD1]/20 selection:text-white overflow-x-hidden font-sans">
      {/* 1. Glassmorphic Navigation Bar */}
      <Navbar />

      <main>
        {/* 2. Hero Section: "Your personal AI videography coach" */}
        <HeroSection />

        {/* 3. Scene Analysis: "Transforms your ideas into a stunning visual art" */}
        <SceneAnalysisSection />

        {/* 4. Bento Grid: "Recommend settings" & "Capture or improve" */}
        <BentoFeaturesSection />

        {/* 5. Feature Grid: "Powerful features designed for creators and videographers" */}
        <FeatureGridSection />
      </main>

      {/* 6. Footer & Newsletter: "Your exclusive backstage pass" */}
      <FooterSection />
    </div>
  );
}

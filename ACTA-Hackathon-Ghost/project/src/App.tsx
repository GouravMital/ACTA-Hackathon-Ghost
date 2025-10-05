import { ArrowRight, Zap, Users, Network, BarChart3, Github, Linkedin } from 'lucide-react';
import ProjectCard from './components/ProjectCard';
import Hero from './components/Hero';
import Footer from './components/Footer';
import LiquidBackground from './components/LiquidBackground';
import VideoSection from './components/VideoSection';

function App() {
  const projects = [
    {
      id: 1,
      title: "GigfinTech Analyser",
      subtitle: "AI-Powered Startup Analysis Platform",
      description: "Validate your fintech and gig economy startup ideas with AI-powered market research, comprehensive business analysis, and visual intelligence through customizable workflows.",
      icon: BarChart3,
      color: "from-blue-500 to-cyan-500",
      features: [
        "AI-powered market research engine",
        "9-section business evaluation",
        "6 interactive chart types",
        "Export to JSON/PDF"
      ],
      tags: ["Fintech", "Market Analysis", "AI Research"],
      appLink: "https://gigfintech-analyser.netlify.app/"
    },
    {
      id: 2,
      title: "AgentBlocks",
      subtitle: "No-Code AI Agency Builder",
      description: "Build sophisticated AI automation workflows without code. Drag-drop agent modules to create custom business operations, from research to content generation.",
      icon: Network,
      color: "from-emerald-500 to-teal-500",
      features: [
        "Visual drag-drop editor",
        "Pre-built agent modules",
        "Live workflow preview",
        "Share via public URLs"
      ],
      tags: ["No-Code", "Automation", "Workflow"],
      appLink: "https://agent-blocks.netlify.app/"
    },
    {
      id: 3,
      title: "SkillBridge",
      subtitle: "Social AI Mentorship Network",
      description: "Connect with industry experts instantly through AI-powered matching. Get personalized mentorship, track your progress, and accelerate your career growth.",
      icon: Users,
      color: "from-orange-500 to-rose-500",
      features: [
        "AI skill-based matching",
        "LinkedIn/GitHub verification",
        "Smart question assistant",
        "Progress tracking & gamification"
      ],
      tags: ["Mentorship", "Career", "Networking"],
      appLink: "https://skillsbridge-ghost.netlify.app/"
    }
  ];

  return (
    <div className="min-h-screen relative">
      <LiquidBackground />
      <Hero />

      <VideoSection />

      <main id="projects" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div id="try-apps" className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-400 to-cyan-400 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <Zap className="w-4 h-4" />
            Featured Projects
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Innovation at Your Fingertips
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Explore our cutting-edge AI-powered platforms designed to transform how you work, learn, and grow.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;

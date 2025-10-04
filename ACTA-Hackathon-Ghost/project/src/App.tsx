import { ArrowRight, Zap, Users, Network, BarChart3, Github, Linkedin } from 'lucide-react';
import ProjectCard from './components/ProjectCard';
import Hero from './components/Hero';
import Footer from './components/Footer';

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
      appLink: "#gigfintech"
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
      appLink: "#skillbridge"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <Hero />

      <main id="projects" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div id="try-apps" className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <Zap className="w-4 h-4" />
            Featured Projects
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Innovation at Your Fingertips
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Explore our cutting-edge AI-powered platforms designed to transform how you work, learn, and grow.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        <section id="about" className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-12 md:p-16 text-center shadow-2xl">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Workflow?
          </h3>
          <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of innovators already using our platforms to accelerate their success.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="#try-apps"
              className="inline-flex items-center gap-2 bg-white text-slate-900 px-8 py-4 rounded-full font-semibold hover:bg-slate-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Try Apps Now
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="#learn-more"
              className="inline-flex items-center gap-2 bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-slate-900 transition-all duration-300"
            >
              Learn More
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default App;

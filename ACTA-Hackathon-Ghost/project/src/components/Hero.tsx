import { Sparkles, ArrowRight, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Hero() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="relative overflow-hidden z-20">
      <nav className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <a href="#" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">ACTA-Ghost</span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            <a href="#" className="text-slate-200 hover:text-white font-medium transition-colors">
              Home
            </a>
            <a href="#video" className="text-slate-200 hover:text-white font-medium transition-colors">
              Video
            </a>
            <a href="#projects" className="text-slate-200 hover:text-white font-medium transition-colors">
              Projects
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-2.5 rounded-full font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Contact Us
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-200 hover:text-white transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-slate-900/95 backdrop-blur-xl border-t border-white/10 shadow-xl z-50">
            <div className="px-4 py-6 space-y-4">
              <a
                href="#"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-slate-200 hover:text-white font-medium transition-colors py-2"
              >
                Home
              </a>
              <a
                href="#video"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-slate-200 hover:text-white font-medium transition-colors py-2"
              >
                Video
              </a>
              <a
                href="#projects"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-slate-200 hover:text-white font-medium transition-colors py-2"
              >
                Projects
              </a>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="inline-flex items-center justify-center gap-2 w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300"
              >
                Contact Us
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        )}
      </nav>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full text-sm font-medium text-white mb-8 shadow-lg">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            3 Live AI Platforms Ready to Use
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Transform Ideas Into
            <span className="block bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
              Intelligent Solutions
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed">
            Explore our suite of AI-powered platforms designed for startups, creators, and innovators.
            From market analysis to workflow automation and mentorship networks.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-4 rounded-full font-semibold hover:shadow-xl hover:shadow-blue-500/50 transition-all duration-300 transform hover:-translate-y-1"
            >
              Explore Projects
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="#try-apps"
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/20 transition-all duration-300 shadow-lg"
            >
              Try Apps
            </a>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {[
            { label: 'AI Models', value: '5+' },
            { label: 'Platforms', value: '3' },
            { label: 'Features', value: '20+' },
            { label: 'Industries', value: '10+' }
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-slate-400 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
    </header>
  );
}
import { Sparkles, ArrowRight, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Hero() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header id="overview" className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-cyan-50 opacity-70"></div>

      <nav className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <a href="#" className="text-2xl font-bold text-slate-900">ACTA-Ghost</a>

          <div className="hidden md:flex items-center gap-8">
            <a href="#overview" className="text-slate-700 hover:text-slate-900 font-medium transition-colors">
              Overview
            </a>
            <a href="#projects" className="text-slate-700 hover:text-slate-900 font-medium transition-colors">
              Projects
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-2.5 rounded-full font-semibold hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Contact Us
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-700 hover:text-slate-900 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-slate-200 shadow-xl z-50">
            <div className="px-4 py-6 space-y-4">
              <a
                href="#overview"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-slate-700 hover:text-slate-900 font-medium transition-colors py-2"
              >
                Overview
              </a>
              <a
                href="#projects"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-slate-700 hover:text-slate-900 font-medium transition-colors py-2"
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

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 md:py-32">
        <div className="text-center">
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold text-slate-900 mb-6 leading-tight">
            Transform Ideas Into
            <span className="block bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-500 bg-clip-text text-transparent">
              Intelligent Solutions
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto mb-12 leading-relaxed">
            Explore our suite of AI-powered platforms designed for startups, creators, and innovators.
            From market analysis to workflow automation and mentorship networks.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-full font-semibold hover:bg-slate-800 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
            >
              Explore Projects
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="#try-apps"
              className="inline-flex items-center gap-2 bg-white text-slate-900 px-8 py-4 rounded-full font-semibold border-2 border-slate-200 hover:border-slate-300 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Try Featured Projects
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
              <div className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-slate-600 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
    </header>
  );
}
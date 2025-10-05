import { Play } from 'lucide-react';

export default function VideoSection() {
  return (
    <section id="video" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-400 to-cyan-400 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
          <Play className="w-4 h-4" />
          Watch Demo
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          See Our Platforms in Action
        </h2>
        <p className="text-xl text-slate-300 max-w-2xl mx-auto">
          Watch this quick demo to discover how our AI-powered platforms can transform your workflow.
        </p>
      </div>

      <div className="relative max-w-5xl mx-auto">
        <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-white/5 backdrop-blur-xl">
          <div className="aspect-video">
            <iframe
              className="w-full h-full"
              src=" https://youtu.be/JVTYv3-TwDw "
              title="AI Studio Demo"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 via-cyan-500/20 to-teal-500/20 rounded-3xl blur-3xl -z-10"></div>
      </div>

      <div className="mt-12 text-center">
        <p className="text-slate-400 text-sm">
          Replace the video URL with your own YouTube video ID in the src attribute
        </p>
      </div>
    </section>
  );
}

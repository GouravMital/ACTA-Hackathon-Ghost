import { ArrowRight, Check, Video as LucideIcon } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  icon: LucideIcon;
  color: string;
  features: string[];
  tags: string[];
  appLink: string;
}

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const Icon = project.icon;

  return (
    <div className="group relative bg-white/5 backdrop-blur-xl rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-white/10 hover:border-white/20 transform hover:-translate-y-2">
      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${project.color}`}></div>

      <div className="p-8">
        <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${project.color} mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="w-8 h-8 text-white" />
        </div>

        <h3 className="text-2xl font-bold text-white mb-2">
          {project.title}
        </h3>
        <p className="text-sm font-semibold text-slate-400 mb-4">
          {project.subtitle}
        </p>
        <p className="text-slate-300 mb-6 leading-relaxed">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-white/10 text-slate-300 text-xs font-medium rounded-full border border-white/20"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="space-y-3 mb-8">
          {project.features.map((feature) => (
            <div key={feature} className="flex items-start gap-3">
              <div className={`mt-0.5 p-0.5 rounded-full bg-gradient-to-br ${project.color}`}>
                <Check className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm text-slate-300">{feature}</span>
            </div>
          ))}
        </div>

        <a
          href={project.appLink}
          className={`inline-flex items-center justify-center gap-2 w-full bg-gradient-to-r ${project.color} text-white px-6 py-3.5 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105`}
        >
          Try {project.title}
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </a>
      </div>

      <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-gradient-to-br from-white/10 to-transparent rounded-full opacity-50 group-hover:scale-150 transition-transform duration-700"></div>
    </div>
  );
}

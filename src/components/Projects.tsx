import { ExternalLink, Github } from 'lucide-react';

interface ProjectsProps {
  darkMode: boolean;
}

export default function Projects({ darkMode }: ProjectsProps) {
  const projects = [
  {
    title: 'UTUB',
    description:
      'A fully functional YouTube clone featuring video search, watch pages, and seamless routing for an intuitive viewing experience.',
    tech: ['React', 'Tailwind', 'YouTube API', 'React Router'],
    image: 'https://images.pexels.com/photos/1591062/pexels-photo-1591062.jpeg?auto=compress&cs=tinysrgb&w=800',
    gradient: 'from-red-500 to-pink-500',

    github: "https://github.com/ArunSeeram/UTUB",
    live: "https://utub-kappa.vercel.app/",
  },

  {
    title: 'Nutrition Meter',
    description:
      'Real-time macro calculator with manual and API-powered tracking, designed with a clean and interactive UI.',
    tech: ['React', 'JavaScript', 'Nutrition API', 'Tailwind'],
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
    gradient: 'from-green-500 to-emerald-500',

    github: "https://github.com/ArunSeeram/Nutrition-Meter",
    live: "https://utub-ay1j.vercel.app/ ",
  },

  {
    title: 'Business Profile Website',
    description:
      'Professional, responsive company website with modern UI/UX, optimized across all devices.',
    tech: ['React', 'Tailwind', 'Responsive Design'],
    image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
    gradient: 'from-blue-500 to-cyan-500',

    github: "#",
    live: "#",
  },

  {
    title: 'Company Management',
    description:
      'Enterprise-grade company management dashboard built with Angular & TypeScript for secure and scalable operations.',
    tech: ['Angular', 'TypeScript', 'Responsive Design'],
    image: 'https://images.pexels.com/photos/7394721/pexels-photo-7394721.jpeg',
    gradient: 'from-blue-500 to-cyan-500',

    github: "https://github.com/ArunSeeram/Company-CRUD",
    live: "https://company-crud-two.vercel.app/companies",
  },

  {
    title: 'Pneumonia Detection',
    description:
      'Deep learning-based pneumonia classifier using Python & TensorFlow, trained on chest X-ray datasets.',
    tech: ['Python', 'Deep Learning'],
    image: 'https://images.pexels.com/photos/7579819/pexels-photo-7579819.jpeg',
    gradient: 'from-blue-500 to-cyan-500',

    github: "https://github.com/ArunSeeram/Pneumonia-Detection",
    live: "#",
  },
];

    

 

  return (
    <section
      id="projects"
      className={`py-20 px-6 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2
            className={`text-4xl md:text-5xl font-bold mb-4 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}
          >
            Featured <span className="text-blue-500">Projects</span>
          </h2>
          <div className="w-20 h-1 bg-blue-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`group rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl animate-fadeInUp ${
                darkMode
                  ? 'bg-gray-800 shadow-xl'
                  : 'bg-white shadow-lg border border-gray-200'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative overflow-hidden h-48">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-90 group-hover:opacity-80 transition-opacity`}
                ></div>
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex gap-4">
                    <button  onClick={() => window.open(project.live, "_blank")} className="p-3 bg-white rounded-full hover:scale-110 transition-transform">
                      <ExternalLink size={20} className="text-gray-900" />
                    </button>
                    <button
                          onClick={() => window.open(project.github, "_blank")}
                              className="p-3 bg-white rounded-full hover:scale-110 transition-transform"
                                >
                          <Github size={20} className="text-gray-900" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3
                  className={`text-2xl font-bold mb-3 ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {project.title}
                </h3>
                <p
                  className={`mb-4 leading-relaxed ${
                    darkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}
                >
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        darkMode
                          ? 'bg-blue-500/20 text-blue-300'
                          : 'bg-blue-100 text-blue-600'
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <button
                           onClick={() => window.open(project.live, "_blank")}
                            className={`w-full py-3 rounded-lg font-medium transition-all hover:scale-105 flex items-center justify-center gap-2 ${
                            darkMode
                             ? 'bg-blue-500 text-white hover:bg-blue-600'
                             : 'bg-blue-500 text-white hover:bg-blue-600'
                              }`}
                              >
                        View Project
                        <ExternalLink size={16} />
                      </button>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

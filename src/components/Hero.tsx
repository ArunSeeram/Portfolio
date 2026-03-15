import { Download, ArrowRight } from 'lucide-react';

interface HeroProps {
  darkMode: boolean;
}

export default function Hero({ darkMode }: HeroProps) {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className={`min-h-screen flex items-center justify-center px-6 py-20 relative overflow-hidden ${
        darkMode ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'
      }`}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl opacity-20 animate-float ${
          darkMode ? 'bg-blue-500' : 'bg-blue-300'
        }`} style={{ animationDelay: '0s' }}></div>
        <div className={`absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl opacity-20 animate-float ${
          darkMode ? 'bg-purple-500' : 'bg-purple-300'
        }`} style={{ animationDelay: '2s' }}></div>
        <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-3xl opacity-10 animate-float ${
          darkMode ? 'bg-cyan-500' : 'bg-cyan-300'
        }`} style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="mb-6 animate-fadeInUp">
          <span className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${
            darkMode ? 'bg-blue-500/20 text-blue-300' : 'bg-blue-100 text-blue-600'
          }`}>
            Welcome to my portfolio
          </span>
        </div>

        <h1
          className={`text-5xl md:text-7xl font-bold mb-6 animate-fadeInUp ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}
          style={{ animationDelay: '0.1s' }}
        >
          Hi, I'm <span className="text-blue-500">Arun Kumar</span>
        </h1>

        <p
          className={`text-xl md:text-2xl mb-4 animate-fadeInUp ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}
          style={{ animationDelay: '0.2s' }}
        >
          Frontend & MERN Stack Developer
        </p>

        <p
          className={`text-lg md:text-xl mb-12 max-w-2xl mx-auto animate-fadeInUp ${
            darkMode ? 'text-gray-400' : 'text-gray-500'
          }`}
          style={{ animationDelay: '0.3s' }}
        >
          I build fast, interactive, user-focused digital experiences.
        </p>

        <div
          className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeInUp"
          style={{ animationDelay: '0.4s' }}
        >
          <button
            onClick={() => scrollToSection('projects')}
            className="group px-8 py-4 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-all hover:scale-105 hover:shadow-xl flex items-center justify-center gap-2"
          >
            View Projects
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <button
  onClick={() => window.open("/ATS_RESUME.pdf", "_blank")}
  className={`px-8 py-4 rounded-lg font-medium transition-all hover:scale-105 hover:shadow-xl flex items-center justify-center gap-2 ${
    darkMode
      ? "bg-gray-800 text-white hover:bg-gray-700"
      : "bg-white text-gray-900 hover:bg-gray-50 shadow-lg"
  }`}
>
  <Download size={20} />
  Download Resume
</button>


        </div>
      </div>
    </section>
  );
}

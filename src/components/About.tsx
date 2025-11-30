import { Code2, Layers, Zap, Users } from 'lucide-react';

interface AboutProps {
  darkMode: boolean;
}

export default function About({ darkMode }: AboutProps) {
  const highlights = [
    { icon: Code2, text: 'Clean, maintainable code' },
    { icon: Layers, text: 'Component architecture' },
    { icon: Zap, text: 'Performance optimization' },
    { icon: Users, text: 'User-focused design' },
  ];

  return (
    <section
      id="about"
      className={`py-20 px-6 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2
            className={`text-4xl md:text-5xl font-bold mb-4 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}
          >
            About <span className="text-blue-500">Me</span>
          </h2>
          <div className="w-20 h-1 bg-blue-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div
            className={`rounded-2xl p-8 ${
              darkMode
                ? 'bg-gradient-to-br from-gray-800 to-gray-900 shadow-2xl'
                : 'bg-gradient-to-br from-gray-50 to-white shadow-xl'
            }`}
          >
            <div className="aspect-square rounded-xl overflow-hidden mb-6 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <Code2 size={120} className="text-white opacity-80" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              {highlights.map((item, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg ${
                    darkMode ? 'bg-gray-800/50' : 'bg-white/50'
                  }`}
                >
                  <item.icon size={24} className="text-blue-500 mb-2" />
                  <p
                    className={`text-sm ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p
              className={`text-lg leading-relaxed mb-6 ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}
            >
              I'm a passionate developer with strong expertise in{' '}
              <span className="text-blue-500 font-semibold">React</span>,{' '}
              <span className="text-blue-500 font-semibold">JavaScript</span>, and{' '}
              <span className="text-blue-500 font-semibold">Angular</span>.
            </p>
            <p
              className={`text-lg leading-relaxed mb-6 ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}
            >
              With hands-on experience in the{' '}
              <span className="text-blue-500 font-semibold">MERN stack</span>{' '}
              (MongoDB, Express, Node.js), I specialize in building full-stack
              applications that are both powerful and elegant.
            </p>
            <p
              className={`text-lg leading-relaxed mb-6 ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}
            >
              I have a deep passion for creating{' '}
              <span className="text-blue-500 font-semibold">clean user interfaces</span>,
              implementing robust{' '}
              <span className="text-blue-500 font-semibold">component architectures</span>,
              and optimizing for{' '}
              <span className="text-blue-500 font-semibold">performance</span>.
            </p>
            <p
              className={`text-lg leading-relaxed ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}
            >
              My goal is to craft{' '}
              <span className="text-blue-500 font-semibold">production-ready applications</span>{' '}
              that deliver exceptional user experiences and solve real-world problems.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

import { useState } from 'react';
import { Mail, Github, Linkedin, Send } from 'lucide-react';

interface ContactProps {
  darkMode: boolean;
}

export default function Contact({ darkMode }: ContactProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section
      id="contact"
      className={`py-20 px-6 relative overflow-hidden ${
        darkMode ? 'bg-gray-800' : 'bg-gray-50'
      }`}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute -top-20 -left-20 w-80 h-80 rounded-full blur-3xl opacity-10 animate-float ${
          darkMode ? 'bg-blue-500' : 'bg-blue-300'
        }`}></div>
        <div className={`absolute -bottom-20 -right-20 w-80 h-80 rounded-full blur-3xl opacity-10 animate-float ${
          darkMode ? 'bg-purple-500' : 'bg-purple-300'
        }`} style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2
            className={`text-4xl md:text-5xl font-bold mb-4 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}
          >
            Get In <span className="text-blue-500">Touch</span>
          </h2>
          <div className="w-20 h-1 bg-blue-500 mx-auto rounded-full"></div>
          <p
            className={`mt-6 text-lg ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            Have a project in mind? Let's work together!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={`w-full px-6 py-4 rounded-lg transition-all focus:ring-2 focus:ring-blue-500 outline-none ${
                    darkMode
                      ? 'bg-gray-900 text-white border border-gray-700'
                      : 'bg-white text-gray-900 border border-gray-300'
                  }`}
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={`w-full px-6 py-4 rounded-lg transition-all focus:ring-2 focus:ring-blue-500 outline-none ${
                    darkMode
                      ? 'bg-gray-900 text-white border border-gray-700'
                      : 'bg-white text-gray-900 border border-gray-300'
                  }`}
                />
              </div>
              <div>
                <textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className={`w-full px-6 py-4 rounded-lg transition-all focus:ring-2 focus:ring-blue-500 outline-none resize-none ${
                    darkMode
                      ? 'bg-gray-900 text-white border border-gray-700'
                      : 'bg-white text-gray-900 border border-gray-300'
                  }`}
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full py-4 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-all hover:scale-105 hover:shadow-xl flex items-center justify-center gap-2"
              >
                Send Message
                <Send size={20} />
              </button>
            </form>
          </div>

          <div className="flex flex-col justify-center space-y-6">
            <div
              className={`p-6 rounded-2xl ${
                darkMode ? 'bg-gray-900' : 'bg-white'
              }`}
            >
              <Mail size={32} className="text-blue-500 mb-4" />
              <h3
                className={`text-xl font-bold mb-2 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}
              >
                Email
              </h3>
              <a
                href="mailto:arunseeram111@example.com"
                className="text-blue-500 hover:underline"
              >
                arunseeram111@example.com
              </a>
            </div>

            <div
              className={`p-6 rounded-2xl ${
                darkMode ? 'bg-gray-900' : 'bg-white'
              }`}
            >
              <Github size={32} className="text-blue-500 mb-4" />
              <h3
                className={`text-xl font-bold mb-2 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}
              >
                GitHub
              </h3>
              <a
                href="hhttps://github.com/ArunSeeram"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                github.com/ArunSeeram
              </a>
            </div>

            <div
              className={`p-6 rounded-2xl ${
                darkMode ? 'bg-gray-900' : 'bg-white'
              }`}
            >
              <Linkedin size={32} className="text-blue-500 mb-4" />
              <h3
                className={`text-xl font-bold mb-2 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}
              >
                LinkedIn
              </h3>
              <a
                href="https://www.linkedin.com/in/arun-kumar-7432b2250"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                linkedin.com/in/arun-kumar
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

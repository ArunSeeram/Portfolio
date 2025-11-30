import { Heart } from 'lucide-react';

interface FooterProps {
  darkMode: boolean;
}

export default function Footer({ darkMode }: FooterProps) {
  return (
    <footer
      className={`py-8 px-6 border-t ${
        darkMode
          ? 'bg-gray-900 border-gray-800'
          : 'bg-white border-gray-200'
      }`}
    >
      <div className="max-w-6xl mx-auto text-center">
        <p
          className={`flex items-center justify-center gap-2 ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}
        >
          Built with <Heart size={16} className="text-red-500 fill-current" /> by{' '}
          <span className="text-blue-500 font-semibold">Arun Kumar</span>
        </p>
        <p
          className={`mt-2 text-sm ${
            darkMode ? 'text-gray-500' : 'text-gray-500'
          }`}
        >
          © {new Date().getFullYear()} All rights reserved.
        </p>
      </div>
    </footer>
  );
}

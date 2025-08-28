import { Sun, Moon } from 'lucide-react';

const ThemeToggle = ({ isDarkMode, setIsDarkMode }) => (
  <button aria-label="Toggle theme" 
    onClick={() => setIsDarkMode(!isDarkMode)}
    className={`p-3 rounded-full transition-colors ${
      isDarkMode 
        ? 'bg-yellow-500 hover:bg-yellow-400 text-gray-900' 
        : 'bg-gray-800 hover:bg-gray-700 text-white'
    }`}
  >
    {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
  </button>
);

export default ThemeToggle;

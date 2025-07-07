import React from 'react';
import { CheckSquare, Moon, Sun, LogOut } from 'lucide-react';

export const Header = ({ darkMode, toggleDarkMode, onLogout }) => {
  return (
    <header className="text-center mb-12">
      <div className="flex items-center justify-center gap-4 mb-6 relative">
        <div className="p-3 bg-blue-500 rounded-2xl shadow-lg">
          <CheckSquare className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent">
          Personal Task Tracker
        </h1>
        <button
          onClick={toggleDarkMode}
          className="p-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
          aria-label="Toggle dark mode"
        >
          {darkMode ? (
            <Sun className="w-5 h-5 text-yellow-500" />
          ) : (
            <Moon className="w-5 h-5 text-gray-600" />
          )}
        </button>

        {/* Logout button */}
        <button
          onClick={onLogout}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-red-500 text-white px-4 py-2 rounded-xl shadow-md hover:bg-red-600 transition"
        >
          <LogOut className="inline w-4 h-4 mr-1" />
          Logout
        </button>
      </div>

      <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
        Stay organized and boost your productivity with our intuitive task management system. 
        Create, organize, and track your daily tasks with ease.
      </p>
    </header>
  );
};

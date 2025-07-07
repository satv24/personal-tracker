import React from 'react';
import { Heart, Github, ExternalLink } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400">
          <span>Built with</span>
          <Heart className="w-4 h-4 text-red-500" />
          <span>using React, JavaScript, and Tailwind CSS</span>
        </div>
        
        <div className="flex items-center justify-center gap-6">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
          >
            <Github className="w-5 h-5" />
            <span>View on GitHub</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
        
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Personal Task Tracker - Stay organized, stay productive
        </p>
      </div>
    </footer>
  );
};
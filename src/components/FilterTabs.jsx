import React from 'react';

export const FilterTabs = ({ filter, onFilterChange, tasksCount }) => {
  const tabs = [
    { key: 'all', label: 'All Tasks', count: tasksCount.all },
    { key: 'active', label: 'Active', count: tasksCount.active },
    { key: 'completed', label: 'Completed', count: tasksCount.completed },
  ];

  return (
    <div className="border-b border-gray-200 dark:border-gray-700">
      <nav className="flex">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => onFilterChange(tab.key)}
            className={`flex-1 py-4 px-6 text-sm font-medium transition-all duration-200 relative ${
              filter === tab.key
                ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50'
            }`}
          >
            <span className="flex items-center justify-center gap-2">
              {tab.label}
              <span className={`inline-flex items-center justify-center min-w-[1.5rem] h-6 px-2 text-xs rounded-full ${
                filter === tab.key
                  ? 'bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
              }`}>
                {tab.count}
              </span>
            </span>
            {filter === tab.key && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400"></div>
            )}
          </button>
        ))}
      </nav>
    </div>
  );
};
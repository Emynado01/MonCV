import React from 'react';

interface Props {
  title: string;
  tech: string;
  description: string;
  status: string;
}

const ProjectCard: React.FC<Props> = ({ title, tech, description, status }) => (
  <div className="bg-gray-100 dark:bg-gray-900/50 p-6 rounded-lg border border-purple-500/30 hover:border-gold transition-colors duration-300 transform hover:scale-105">
    <div className="flex items-start justify-between mb-4">
      <h3 className="text-xl font-heading text-gray-900 dark:text-white transition-colors">{title}</h3>
      <span
        className={`px-3 py-1 rounded-full text-xs font-bold ${
          status === 'TERMINÉ'
            ? 'bg-green-600/20 text-green-700 dark:text-green-300 border border-green-500/30'
            : 'bg-gold text-black'
        }`}
      >
        {status}
      </span>
    </div>
    <p className="text-purple-700 dark:text-purple-300 text-sm mb-3 font-medium">{tech}</p>
    <p className="text-gray-700 dark:text-gray-300 mb-4">{description}</p>
    <button className="flex items-center text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors font-medium">
      Voir plus
    </button>
  </div>
);

export default ProjectCard;

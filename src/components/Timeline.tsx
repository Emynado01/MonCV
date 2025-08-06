import React from 'react';

interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
}

const Timeline: React.FC<{ experiences: Experience[] }> = ({ experiences }) => (
  <div className="relative border-l border-purple-500/30 ml-4">
    {experiences.map((exp, idx) => (
      <div key={idx} className="mb-8 ml-6">
        <div className="absolute w-3 h-3 bg-gold rounded-full -left-1.5 border border-purple-500" />
        <h3 className="text-xl font-heading text-gray-900 dark:text-white">{exp.title}</h3>
        <span className="text-purple-700 dark:text-purple-300 text-sm">{exp.period}</span>
        <p className="text-gray-700 dark:text-gray-300 mt-2">{exp.description}</p>
      </div>
    ))}
  </div>
);

export default Timeline;

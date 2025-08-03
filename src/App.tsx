import React, { useState } from 'react';
import {
  User,
  Code2,
  Briefcase,
  Trophy,
  Mail,
  Github,
  Gamepad2,
  Zap,
  Star,
  ChevronRight
} from 'lucide-react';
import emailjs from '@emailjs/browser';

function App() {
  const [activeTab, setActiveTab] = useState<'profile' | 'skills' | 'experience' | 'projects' | 'contact'>('profile');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '' });
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  // EmailJS IDs
  const SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID!;
  const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID!;
  const PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY!;

  const tabs = [
    { id: 'profile',     label: 'PROFIL',       icon: User      },
    { id: 'skills',      label: 'COMPÉTENCES',  icon: Code2     },
    { id: 'experience',  label: 'EXPÉRIENCE',   icon: Briefcase },
    { id: 'projects',    label: 'RÉALISATIONS', icon: Trophy    },
    { id: 'contact',     label: 'CONTACT',      icon: Mail      }
  ] as const;

  const skills = {
    frontend: ['React', 'Next.js', 'React Native'],
    backend:  ['Node.js', 'JavaScript', 'SQL', 'MongoDB'],
    tools:    ['Git', 'Visual Studio Code', 'Docker', 'GitHub', 'Figma', 'Jira', 'Postman', 'Prisma']
  };

  const experiences = [
    {
      title: 'Développeur Junior',
      company: '',
      period: '2025',
      description: 'Diplômé en programmation, à la recherche de premières expériences professionnelles.',
      level: 50
    }
  ];

  const projects = [
    { title: 'Gestionnaire de vol',        tech: 'React, TypeScript, Node.js',      description: 'Système de gestion de réservations de vols.',         status: 'TERMINÉ' },
    { title: 'Site météo provinciale',     tech: 'React, Next.js, API météo',        description: 'Affichage des statistiques météo par province.',        status: 'TERMINÉ' },
    { title: 'Application iOS',            tech: 'React Native, Swift',               description: "Application mobile iOS de gestion d'événements.",        status: 'EN COURS' },
    { title: 'Site festivals africains',   tech: 'Next.js, Tailwind CSS',            description: 'Présentation des différents festivals africains.',     status: 'TERMINÉ' },
    { title: 'Gestion des tâches innovante',tech: 'React, Node.js, MongoDB',          description: 'Nouveau projet de gestion des tâches en cours.',        status: 'EN COURS' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('sending');
    emailjs
      .send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          name:    formData.name,
          email:   formData.email,
          subject: formData.subject,
          time:    new Date().toLocaleString()
        },
        PUBLIC_KEY
      )
      .then(() => {
        setSubmitStatus('sent');
        setTimeout(() => {
          setShowModal(false);
          setSubmitStatus('idle');
          setFormData({ name: '', email: '', subject: '' });
        }, 1500);
      })
      .catch(() => {
        setSubmitStatus('error');
        setTimeout(() => setSubmitStatus('idle'), 3000);
      });
  };

  const TabButton = ({ tab, isActive, onClick }: any) => {
    const Icon = tab.icon;
    return (
      <button
        onClick={onClick}
        className={`
          relative group px-6 py-4 font-bold text-sm tracking-wider transition-all duration-300
          ${isActive
            ? 'bg-gradient-to-r from-purple-600 to-purple-800 text-white shadow-lg shadow-purple-500/50'
            : 'bg-gray-900 text-gray-400 hover:text-purple-300 hover:bg-gray-800'}
          border border-purple-500/30 hover:border-purple-400/50
          transform hover:scale-105 active:scale-95
        `}
        style={{ clipPath: 'polygon(0 0, calc(100% - 15px) 0, 100% 100%, 15px 100%)' }}
      >
        <div className="flex items-center space-x-3">
          <Icon size={18} />
          <span>{tab.label}</span>
        </div>
        {isActive && (
          <div
            className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-purple-800/20 animate-pulse"
            style={{ clipPath: 'polygon(0 0, calc(100% - 15px) 0, 100% 100%, 15px 100%)' }}
          />
        )}
      </button>
    );
  };

  const SkillBar = ({ skill, level }: { skill: string; level: number }) => (
    <div className="mb-4">
      <div className="flex justify-between mb-2">
        <span className="text-purple-300 font-medium">{skill}</span>
        <span className="text-purple-400 text-sm">{level}%</span>
      </div>
      <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-purple-500 to-violet-400 rounded-full transition-all duration-1000 ease-out shadow-lg shadow-purple-500/50"
          style={{ width: `${level}%` }}
        />
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-8">
            <div className="text-center">
              <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-purple-600 to-violet-800 rounded-full flex items-center justify-center shadow-xl shadow-purple-500/30">
                <User size={60} className="text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">Joachim Cishugi</h2>
              <p className="text-purple-300 text-xl mb-4">Développeur Full Stack Junior</p>
              <div className="flex justify-center space-x-4">
                <div className="bg-purple-600/20 px-4 py-2 rounded-lg border border-purple-500/30">
                  <span className="text-purple-300">0 ans d'expérience</span>
                </div>
                <div className="bg-purple-600/20 px-4 py-2 rounded-lg border border-purple-500/30">
                  <span className="text-purple-300">5 projets</span>
                </div>
              </div>
            </div>
            <div className="bg-gray-900/50 p-6 rounded-lg border border-purple-500/30">
              <h3 className="text-xl font-bold text-purple-400 mb-4 flex items-center">
                <Gamepad2 className="mr-2" /> À PROPOS
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Jeune diplômé en programmation avec plusieurs projets personnels incluant un gestionnaire de vol,
                un site de statistiques météo provinciale, une application iOS, et un site de présentation des festivals
                africains. Passionné par les nouvelles technologies et la création de solutions innovantes, actuellement
                engagé dans un projet de gestion des tâches.
              </p>
            </div>
          </div>
        );

      case 'skills':
        return (
          <div className="space-y-8">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gray-900/50 p-6 rounded-lg border border-purple-500/30">
                <h3 className="text-xl font-bold text-purple-400 mb-4 flex items-center">
                  <Zap className="mr-2" /> FRONTEND
                </h3>
                <div className="space-y-3">
                  {skills.frontend.map((skill, i) => (
                    <SkillBar key={skill} skill={skill} level={90 - i * 5} />
                  ))}
                </div>
              </div>
              <div className="bg-gray-900/50 p-6 rounded-lg border border-purple-500/30">
                <h3 className="text-xl font-bold text-purple-400 mb-4 flex items-center">
                  <Code2 className="mr-2" /> BACKEND
                </h3>
                <div className="space-y-3">
                  {skills.backend.map((skill, i) => (
                    <SkillBar key={skill} skill={skill} level={85 - i * 5} />
                  ))}
                </div>
              </div>
              <div className="bg-gray-900/50 p-6 rounded-lg border border-purple-500/30">
                <h3 className="text-xl font-bold text-purple-400 mb-4 flex items-center">
                  <Star className="mr-2" /> OUTILS
                </h3>
                <div className="space-y-3">
                  {skills.tools.map((skill, i) => (
                    <SkillBar key={skill} skill={skill} level={80 - i * 3} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'experience':
        return (
          <div className="space-y-6">
            {experiences.map((exp, i) => (
              <div key={i} className="bg-gray-900/50 p-6 rounded-lg border border-purple-500/30 hover:border-purple-400/50 transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">{exp.title}</h3>
                    <p className="text-purple-300 font-medium">{exp.company}</p>
                    <p className="text-gray-400 text-sm">{exp.period}</p>
                  </div>
                  <div className="bg-purple-600/20 px-3 py-1 rounded-full border border-purple-500/30">  
                    <span className="text-purple-300 text-sm">LVL {exp.level}</span>
                  </div>
                </div>
                <p className="text-gray-300 mb-4">{exp.description}</p>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-violet-400 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${exp.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        );

      case 'projects':
        return (
          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project, i) => (
              <div key={i} className="bg-gray-900/50 p-6 rounded-lg border border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 group hover:scale-105">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">{project.title}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    project.status === 'TERMINÉ'
                      ? 'bg-green-600/20 text-green-300 border border-green-500/30'
                      : 'bg-yellow-600/20 text-yellow-300 border border-yellow-500/30'
                  }`}>
                    {project.status}
                  </span>
                </div>
                <p className="text-purple-300 text-sm mb-3 font-medium">{project.tech}</p>
                <p className="text-gray-300 mb-4">{project.description}</p>
                <button className="flex items-center text-purple-400 hover:text-purple-300 transition-colors font-medium">
                  Voir plus <ChevronRight size={16} className="ml-1" />
                </button>
              </div>
            ))}
          </div>
        );

      case 'contact':
        return (
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">CONTACTEZ-MOI</h2>
              <p className="text-gray-300">Prêt pour une nouvelle mission ?</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <a href="mailto:cishugijoachim@gmail.com" className="bg-gray-900/50 p-6 rounded-lg border border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 group">
                <Mail className="text-purple-400 mb-3 group-hover:scale-110 transition-transform" size={24} />
                <h3 className="text-white font-bold mb-2">Email</h3>
                <p className="text-gray-300">cishugijoachim@gmail.com</p>
              </a>
              <a href="https://github.com/Emynado01" className="bg-gray-900/50 p-6 rounded-lg border border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 group">
                <Github className="text-purple-400 mb-3 group-hover:scale-110 transition-transform" size={24} />
                <h3 className="text-white font-bold mb-2">GitHub</h3>
                <p className="text-gray-300">@Emynado01</p>
              </a>
            </div>
            <div className="bg-gray-900/50 p-8 rounded-lg border border-purple-500/30 text-center">
              <h3 className="text-xl font-bold text-purple-400 mb-4">DISPONIBLE POUR MISSIONS</h3>
              <p className="text-gray-300 mb-6">
                Ouvert aux opportunités de collaboration et aux offres d'emploi
              </p>
              <button
                onClick={() => setShowModal(true)}
                className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-500/30"
              >
                LANCER MISSION
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* background effects here */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        <header className="mb-12">
          <nav className="flex justify-center space-x-4">
            {tabs.map(tab => (
              <TabButton
                key={tab.id}
                tab={tab}
                isActive={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
              />
            ))}
          </nav>
        </header>
        {renderContent()}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-gray-900/80 p-8 rounded-xl border border-purple-500/30 w-full max-w-md">
            <h3 className="text-xl font-bold text-white mb-4">Lancer une mission</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-purple-300 mb-1">Nom</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full bg-gray-800 text-white px-3 py-2 rounded-lg border border-purple-500/30 focus:outline-none focus:ring-2 focus:ring-purple-600"
                  required
                />
              </div>
              <div>
                <label className="block text-purple-300 mb-1">Adresse mail</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full bg-gray-800 text-white px-3 py-2 rounded-lg border border-purple-500/30 focus:outline-none focus:ring-2 focus:ring-purple-600"
                  required
                />
              </div>
              <div>
                <label className="block text-purple-300 mb-1">Sujet</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full bg-gray-800 text-white px-3 py-2 rounded-lg border border-purple-500/30 focus:outline-none focus:ring-2 focus:ring-purple-600"
                  required
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={submitStatus === 'sending'}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
                >
                  {submitStatus === 'sending'
                    ? 'Envoi…'
                    : submitStatus === 'sent'
                      ? '✔️ Envoyé'
                      : 'Envoyer'}
                </button>
              </div>
              {submitStatus === 'error' && (
                <p className="text-red-500 mt-2 text-center">Erreur lors de l’envoi, réessaie !</p>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

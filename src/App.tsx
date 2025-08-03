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
  const [activeTab, setActiveTab] = useState<'profile'|'skills'|'experience'|'projects'|'contact'>('profile');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '' });
  const [submitStatus, setSubmitStatus] = useState<'idle'|'sending'|'sent'|'error'>('idle');

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
    emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      { ...formData, time: new Date().toLocaleString() },
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
      case 'profile':    /* … contenu profil … */ return <div className="space-y-8">…</div>;
      case 'skills':     /* … contenu compétences … */ return <div className="space-y-8">…</div>;
      case 'experience': /* … contenu expérience … */ return <div className="space-y-6">…</div>;
      case 'projects':   /* … contenu réalisations … */ return <div className="grid md:grid-cols-2 gap-6">…</div>;
      case 'contact':
        return (
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">CONTACTEZ-MOI</h2>
              <p className="text-gray-300">Prêt pour une nouvelle mission ?</p>
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
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-black" />  {/* :contentReference[oaicite:2]{index=2} */}
      <div className="absolute top-0 left-0 w-full h-full">                             {/* :contentReference[oaicite:3]{index=3} */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

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
        <main className="max-w-6xl mx-auto">
          <div className="bg-black/50 backdrop-blur-sm border border-purple-500/30 rounded-lg p-8 shadow-2xl shadow-purple-500/20">
            {renderContent()}
          </div>
        </main>
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

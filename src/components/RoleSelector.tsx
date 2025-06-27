
import React from 'react';
import { UserRole } from '../pages/Index';
import { CheckIcon, MessageSquareIcon, VideoIcon } from 'lucide-react';

interface RoleSelectorProps {
  onRoleSelect: (role: UserRole) => void;
}

export const RoleSelector = ({ onRoleSelect }: RoleSelectorProps) => {
  const roles = [
    {
      id: 'editor' as const,
      title: 'Editor',
      description: 'Edit captions, tag speakers, trim video, style captions, respond to feedback',
      icon: VideoIcon,
      color: 'from-green-500 to-emerald-600',
      features: ['Caption Timeline Editing', 'AI Speaker Tagging', 'Video Trimming', 'Style Controls', 'Music Detection']
    },
    {
      id: 'reviewer' as const,
      title: 'Reviewer',
      description: 'Comment on issues, run accessibility checks, approve or send back for revisions',
      icon: MessageSquareIcon,
      color: 'from-orange-500 to-red-600',
      features: ['Accessibility Scanning', 'Comment System', 'AI Validation', 'Version Comparison', 'Quality Checks']
    },
    {
      id: 'client' as const,
      title: 'Client',
      description: 'Final approval stage – view finished captions and confirm completion',
      icon: CheckIcon,
      color: 'from-blue-500 to-purple-600',
      features: ['Final Review', 'Approval Checkboxes', 'Export Options', 'Client Portal', 'Sign-off Process']
    }
  ];

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-white mb-4">
          Choose Your Role
        </h2>
        <p className="text-xl text-slate-300 max-w-2xl mx-auto">
          Access your personalized workspace designed for collaborative caption creation and review
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {roles.map((role) => {
          const IconComponent = role.icon;
          return (
            <div
              key={role.id}
              onClick={() => onRoleSelect(role.id)}
              className="group relative cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-2xl blur-xl"
                   style={{backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))`}}></div>
              
              <div className="relative backdrop-blur-sm bg-slate-800/50 border border-slate-700/50 rounded-2xl p-8 hover:border-slate-600/50 transition-all duration-300 hover:scale-105">
                <div className="text-center mb-6">
                  <div className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${role.color} mb-4`}>
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{role.title}</h3>
                  <p className="text-slate-300">{role.description}</p>
                </div>

                <div className="space-y-3">
                  {role.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${role.color}`}></div>
                      <span className="text-sm text-slate-300">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8">
                  <button className={`w-full py-3 px-6 rounded-xl bg-gradient-to-r ${role.color} text-white font-semibold hover:shadow-lg transition-all duration-300`}>
                    Enter {role.title} Workspace
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

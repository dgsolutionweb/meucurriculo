import React from 'react';
import type { ResumeData } from '../types/resume';
import { Mail, Phone, MapPin, Globe, Linkedin } from 'lucide-react';

interface ResumePreviewProps {
  data: ResumeData;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ data }) => {
  const { personalInfo, experience, education, skills, languages } = data;

  const formatDate = (date: string) => {
    if (!date) return '';
    const [year, month] = date.split('-');
    const monthNames = [
      'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
      'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
    ];
    return `${monthNames[parseInt(month) - 1]} ${year}`;
  };

  const renderSkillLevel = (level: number) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full ${
              i <= level ? 'bg-primary-600' : 'bg-gray-200'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div id="resume-preview" className="bg-white p-8 shadow-lg rounded-lg max-w-4xl mx-auto">
      {/* Header */}
      <div className="border-b-2 border-primary-600 pb-6 mb-6">
        <div className="flex items-start space-x-6">
          {personalInfo.photo && (
            <img
              src={personalInfo.photo}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-4 border-gray-200"
            />
          )}
          
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {personalInfo.fullName || 'Seu Nome'}
            </h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
              {personalInfo.email && (
                <div className="flex items-center space-x-2">
                  <Mail size={14} />
                  <span>{personalInfo.email}</span>
                </div>
              )}
              
              {personalInfo.phone && (
                <div className="flex items-center space-x-2">
                  <Phone size={14} />
                  <span>{personalInfo.phone}</span>
                </div>
              )}
              
              {personalInfo.address && (
                <div className="flex items-center space-x-2">
                  <MapPin size={14} />
                  <span>{personalInfo.address}</span>
                </div>
              )}
              
              {personalInfo.linkedin && (
                <div className="flex items-center space-x-2">
                  <Linkedin size={14} />
                  <span>{personalInfo.linkedin}</span>
                </div>
              )}
              
              {personalInfo.website && (
                <div className="flex items-center space-x-2">
                  <Globe size={14} />
                  <span>{personalInfo.website}</span>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {personalInfo.summary && (
          <p className="mt-4 text-gray-700 leading-relaxed">
            {personalInfo.summary}
          </p>
        )}
      </div>

      {/* Experience */}
      {experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 border-l-4 border-primary-600 pl-3">
            EXPERIÊNCIA PROFISSIONAL
          </h2>
          
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id} className="border-l-2 border-gray-200 pl-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-gray-800">{exp.position}</h3>
                    <p className="text-primary-600 font-medium">{exp.company}</p>
                  </div>
                  <div className="text-sm text-gray-500">
                    {formatDate(exp.startDate)} - {exp.current ? 'Atual' : formatDate(exp.endDate)}
                  </div>
                </div>
                {exp.description && (
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {exp.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 border-l-4 border-primary-600 pl-3">
            EDUCAÇÃO
          </h2>
          
          <div className="space-y-3">
            {education.map((edu) => (
              <div key={edu.id} className="border-l-2 border-gray-200 pl-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {edu.degree} em {edu.field}
                    </h3>
                    <p className="text-primary-600">{edu.institution}</p>
                  </div>
                  <div className="text-sm text-gray-500">
                    {edu.endDate}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Skills */}
        {skills.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-4 border-l-4 border-primary-600 pl-3">
              HABILIDADES
            </h2>
            
            <div className="space-y-3">
              {skills.map((skill) => (
                <div key={skill.id} className="flex justify-between items-center">
                  <span className="text-gray-700 font-medium">{skill.name}</span>
                  {renderSkillLevel(skill.level)}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-4 border-l-4 border-primary-600 pl-3">
              IDIOMAS
            </h2>
            
            <div className="space-y-2">
              {languages.map((lang) => (
                <div key={lang.id} className="flex justify-between">
                  <span className="text-gray-700 font-medium">{lang.name}</span>
                  <span className="text-gray-500 text-sm">{lang.level}</span>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ResumePreview;
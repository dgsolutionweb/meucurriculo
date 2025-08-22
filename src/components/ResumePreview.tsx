import React from 'react';
import type { ResumeData } from '../types/resume';
import { getThemeById } from '../types/resume';
import { Mail, Phone, MapPin, Globe, Linkedin } from 'lucide-react';

interface ResumePreviewProps {
  data: ResumeData;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ data }) => {
  const { personalInfo, experience, education, skills, languages, theme: themeId } = data;
  const theme = getThemeById(themeId || 'classic');
  
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
      <div className="flex space-x-0.5 print:space-x-0.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className={`w-2.5 h-2.5 print:w-2 print:h-2 rounded-full ${
              i <= level ? 'bg-primary-600' : 'bg-gray-200'
            }`}
            style={{
              backgroundColor: i <= level ? theme.colors.primary : '#e5e7eb'
            }}
          />
        ))}
      </div>
    );
  };

  const headingFont = theme.fonts.heading === 'serif' ? 'font-serif' : 'font-sans';
  const bodyFont = theme.fonts.body === 'serif' ? 'font-serif' : 'font-sans';

  return (
    <div 
      id="resume-preview" 
      className={`bg-white shadow-lg rounded-lg w-full mx-auto p-4 sm:p-6 print:shadow-none print:rounded-none pdf-optimized ${bodyFont}`} 
      style={{ 
        pageBreakInside: 'avoid',
        fontFamily: theme.fonts.body === 'serif' ? 'Georgia, serif' : 'system-ui, sans-serif',
        color: theme.colors.text,
        maxWidth: '100%'
      }}
    >
      {/* Header */}
      <div 
        className="border-b-2 pb-4 mb-6 print:pb-3 print:mb-3" 
        style={{ 
          pageBreakAfter: 'avoid',
          borderBottomColor: theme.colors.primary,
          borderBottomWidth: '2px'
        }}
      >
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 print:gap-3">
          {personalInfo.photo && (
            <div className="flex-shrink-0 text-center sm:text-left">
              <img
                src={personalInfo.photo}
                alt="Profile"
                className="w-20 h-20 print:w-16 print:h-16 rounded-full object-cover border-2 border-gray-200 mx-auto sm:mx-0"
              />
            </div>
          )}
          
          <div className="flex-1 min-w-0 w-full text-center sm:text-left">
            <h1 
              className={`text-2xl sm:text-3xl print:text-xl font-bold mb-2 print:mb-1 break-words ${headingFont}`}
              style={{
                color: theme.colors.primary,
                fontFamily: theme.fonts.heading === 'serif' ? 'Georgia, serif' : 'system-ui, sans-serif'
              }}
            >
              {personalInfo.fullName || 'Seu Nome'}
            </h1>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 print:gap-1 text-sm print:text-xs text-gray-600">
              {personalInfo.email && (
                <div className="flex items-center gap-2 print:gap-1 justify-center sm:justify-start">
                  <Mail size={14} className="flex-shrink-0 print:w-3 print:h-3" />
                  <span className="truncate">{personalInfo.email}</span>
                </div>
              )}
              
              {personalInfo.phone && (
                <div className="flex items-center gap-2 print:gap-1 justify-center sm:justify-start">
                  <Phone size={14} className="flex-shrink-0 print:w-3 print:h-3" />
                  <span className="truncate">{personalInfo.phone}</span>
                </div>
              )}
              
              {personalInfo.address && (
                <div className="flex items-center gap-2 print:gap-1 justify-center sm:justify-start">
                  <MapPin size={14} className="flex-shrink-0 print:w-3 print:h-3" />
                  <span className="truncate">{personalInfo.address}</span>
                </div>
              )}
              
              {personalInfo.linkedin && (
                <div className="flex items-center gap-2 print:gap-1 justify-center sm:justify-start">
                  <Linkedin size={14} className="flex-shrink-0 print:w-3 print:h-3" />
                  <span className="truncate">{personalInfo.linkedin}</span>
                </div>
              )}
              
              {personalInfo.website && (
                <div className="flex items-center gap-2 print:gap-1 sm:col-span-2 justify-center sm:justify-start">
                  <Globe size={14} className="flex-shrink-0 print:w-3 print:h-3" />
                  <span className="truncate">{personalInfo.website}</span>
                </div>
              )}
            </div>
            
            {personalInfo.summary && (
              <div className="mt-4 print:mt-2">
                <p className="text-gray-700 text-sm print:text-xs leading-relaxed print:leading-snug">
                  {personalInfo.summary}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Experience */}
      {experience.length > 0 && (
        <section className="mb-6 print:mb-4" style={{ pageBreakInside: 'avoid' }}>
          <h2 
            className={`text-xl print:text-base font-bold mb-4 print:mb-2 border-l-4 pl-3 print:pl-2 ${headingFont}`}
            style={{
              color: theme.colors.text,
              borderLeftColor: theme.colors.primary,
              fontFamily: theme.fonts.heading === 'serif' ? 'Georgia, serif' : 'system-ui, sans-serif'
            }}
          >
            EXPERIÊNCIA PROFISSIONAL
          </h2>
          
          <div className="space-y-4 print:space-y-2">
            {experience.map((exp) => (
              <div key={exp.id} className="border-l-2 border-gray-200 pl-4 print:pl-2" style={{ pageBreakInside: 'avoid' }}>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 mb-2 print:mb-1">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-base print:text-sm break-words" style={{ color: theme.colors.text }}>{exp.position}</h3>
                    <p className="font-medium text-sm print:text-xs break-words" style={{ color: theme.colors.primary }}>{exp.company}</p>
                  </div>
                  <div className="text-sm print:text-xs text-gray-500 whitespace-nowrap">
                    {formatDate(exp.startDate)} - {exp.current ? 'Atual' : formatDate(exp.endDate)}
                  </div>
                </div>
                {exp.description && (
                  <p className="text-gray-700 text-sm print:text-xs leading-relaxed print:leading-snug break-words">
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
        <section className="mb-6 print:mb-4" style={{ pageBreakInside: 'avoid' }}>
          <h2 
            className={`text-xl print:text-base font-bold mb-4 print:mb-2 border-l-4 pl-3 print:pl-2 ${headingFont}`}
            style={{
              color: theme.colors.text,
              borderLeftColor: theme.colors.primary,
              fontFamily: theme.fonts.heading === 'serif' ? 'Georgia, serif' : 'system-ui, sans-serif'
            }}
          >
            EDUCAÇÃO
          </h2>
          
          <div className="space-y-3 print:space-y-2">
            {education.map((edu) => (
              <div key={edu.id} className="border-l-2 border-gray-200 pl-4 print:pl-2" style={{ pageBreakInside: 'avoid' }}>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-base print:text-sm break-words" style={{ color: theme.colors.text }}>
                      {edu.degree} em {edu.field}
                    </h3>
                    <p className="text-sm print:text-xs break-words" style={{ color: theme.colors.primary }}>{edu.institution}</p>
                  </div>
                  <div className="text-sm print:text-xs text-gray-500 whitespace-nowrap">
                    {edu.endDate}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills and Languages in Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 print:gap-4 print:grid-cols-2">
        {/* Skills */}
        {skills.length > 0 && (
          <section style={{ pageBreakInside: 'avoid' }}>
            <h2 
              className={`text-xl print:text-base font-bold mb-4 print:mb-2 border-l-4 pl-3 print:pl-2 ${headingFont}`}
              style={{
                color: theme.colors.text,
                borderLeftColor: theme.colors.primary,
                fontFamily: theme.fonts.heading === 'serif' ? 'Georgia, serif' : 'system-ui, sans-serif'
              }}
            >
              HABILIDADES
            </h2>
            
            <div className="space-y-3 print:space-y-2">
              {skills.map((skill) => (
                <div key={skill.id} className="flex justify-between items-center">
                  <span className="text-gray-700 font-medium text-sm print:text-xs break-words flex-1 min-w-0 mr-3">{skill.name}</span>
                  <div className="flex-shrink-0">{renderSkillLevel(skill.level)}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <section style={{ pageBreakInside: 'avoid' }}>
            <h2 
              className={`text-xl print:text-base font-bold mb-4 print:mb-2 border-l-4 pl-3 print:pl-2 ${headingFont}`}
              style={{
                color: theme.colors.text,
                borderLeftColor: theme.colors.primary,
                fontFamily: theme.fonts.heading === 'serif' ? 'Georgia, serif' : 'system-ui, sans-serif'
              }}
            >
              IDIOMAS
            </h2>
            
            <div className="space-y-3 print:space-y-2">
              {languages.map((lang) => (
                <div key={lang.id} className="flex justify-between items-center">
                  <span className="text-gray-700 font-medium text-sm print:text-xs break-words flex-1 min-w-0 mr-3">{lang.name}</span>
                  <span className="text-gray-500 text-sm print:text-xs flex-shrink-0">{lang.level}</span>
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
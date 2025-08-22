export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  photo?: string;
  linkedin?: string;
  website?: string;
  summary: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  current: boolean;
}

export interface Skill {
  id: string;
  name: string;
  level: number; // 1-5
}

export interface Language {
  id: string;
  name: string;
  level: string; // Iniciante, Intermediário, Avançado, Nativo
}

export interface Theme {
  id: string;
  name: string;
  description: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    text: string;
    textLight: string;
    background: string;
    border: string;
  };
  fonts: {
    heading: string;
    body: string;
  };
  styles: {
    borderStyle: 'solid' | 'dashed' | 'dotted';
    borderRadius: string;
    spacing: 'compact' | 'normal' | 'spacious';
    headerStyle: 'traditional' | 'modern' | 'creative';
  };
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  languages: Language[];
  theme?: string; // ID do tema selecionado
}

// Temas predefinidos
export const themes: Theme[] = [
  {
    id: 'classic',
    name: 'Clássico',
    description: 'Design tradicional e elegante, ideal para áreas conservadoras',
    colors: {
      primary: '#1f2937',
      secondary: '#374151',
      accent: '#3b82f6',
      text: '#111827',
      textLight: '#6b7280',
      background: '#ffffff',
      border: '#e5e7eb'
    },
    fonts: {
      heading: 'serif',
      body: 'sans-serif'
    },
    styles: {
      borderStyle: 'solid',
      borderRadius: '0.125rem',
      spacing: 'normal',
      headerStyle: 'traditional'
    }
  },
  {
    id: 'modern',
    name: 'Moderno',
    description: 'Visual contemporâneo com cores vibrantes, perfeito para tech',
    colors: {
      primary: '#0f172a',
      secondary: '#475569',
      accent: '#06b6d4',
      text: '#0f172a',
      textLight: '#64748b',
      background: '#ffffff',
      border: '#cbd5e1'
    },
    fonts: {
      heading: 'sans-serif',
      body: 'sans-serif'
    },
    styles: {
      borderStyle: 'solid',
      borderRadius: '0.5rem',
      spacing: 'normal',
      headerStyle: 'modern'
    }
  },
  {
    id: 'creative',
    name: 'Criativo',
    description: 'Estilo único e colorido, ideal para design e comunicação',
    colors: {
      primary: '#7c3aed',
      secondary: '#a855f7',
      accent: '#f59e0b',
      text: '#1f2937',
      textLight: '#6b7280',
      background: '#ffffff',
      border: '#e5e7eb'
    },
    fonts: {
      heading: 'sans-serif',
      body: 'sans-serif'
    },
    styles: {
      borderStyle: 'solid',
      borderRadius: '0.75rem',
      spacing: 'spacious',
      headerStyle: 'creative'
    }
  },
  {
    id: 'corporate',
    name: 'Corporativo',
    description: 'Profissional e sóbrio, excelente para negócios e finanças',
    colors: {
      primary: '#1e40af',
      secondary: '#3b82f6',
      accent: '#dc2626',
      text: '#1f2937',
      textLight: '#4b5563',
      background: '#ffffff',
      border: '#d1d5db'
    },
    fonts: {
      heading: 'sans-serif',
      body: 'sans-serif'
    },
    styles: {
      borderStyle: 'solid',
      borderRadius: '0.25rem',
      spacing: 'compact',
      headerStyle: 'traditional'
    }
  },
  {
    id: 'minimalist',
    name: 'Minimalista',
    description: 'Clean e simples, foco total no conteúdo',
    colors: {
      primary: '#000000',
      secondary: '#404040',
      accent: '#666666',
      text: '#000000',
      textLight: '#666666',
      background: '#ffffff',
      border: '#e0e0e0'
    },
    fonts: {
      heading: 'sans-serif',
      body: 'sans-serif'
    },
    styles: {
      borderStyle: 'solid',
      borderRadius: '0rem',
      spacing: 'spacious',
      headerStyle: 'modern'
    }
  }
];

export const getThemeById = (id: string): Theme => {
  return themes.find(theme => theme.id === id) || themes[0];
};
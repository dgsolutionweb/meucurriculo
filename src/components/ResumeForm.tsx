import { useForm, useFieldArray } from 'react-hook-form';
import { Plus, Trash2 } from 'lucide-react';
import type { ResumeData } from '../types/resume';
import PhotoUpload from './PhotoUpload';
import InlinePromo from './ads/InlinePromo';
import { useEffect } from 'react';

interface ResumeFormProps {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
}

const ResumeForm: React.FC<ResumeFormProps> = ({ data, onChange }) => {
  const { register, control, watch, setValue } = useForm<ResumeData>({
    defaultValues: data
  });

  const {
    fields: experienceFields,
    append: appendExperience,
    remove: removeExperience
  } = useFieldArray({
    control,
    name: 'experience'
  });

  const {
    fields: educationFields,
    append: appendEducation,
    remove: removeEducation
  } = useFieldArray({
    control,
    name: 'education'
  });

  const {
    fields: skillFields,
    append: appendSkill,
    remove: removeSkill
  } = useFieldArray({
    control,
    name: 'skills'
  });

  const {
    fields: languageFields,
    append: appendLanguage,
    remove: removeLanguage
  } = useFieldArray({
    control,
    name: 'languages'
  });

  const watchedData = watch();

  useEffect(() => {
    onChange(watchedData);
  }, [watchedData, onChange]);

  const addExperience = () => {
    appendExperience({
      id: Date.now().toString(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    });
  };

  const addEducation = () => {
    appendEducation({
      id: Date.now().toString(),
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      current: false
    });
  };

  const addSkill = () => {
    appendSkill({
      id: Date.now().toString(),
      name: '',
      level: 3
    });
  };

  const addLanguage = () => {
    appendLanguage({
      id: Date.now().toString(),
      name: '',
      level: 'Intermediate'
    });
  };

  const handlePhotoChange = (photo: string | undefined) => {
    setValue('personalInfo.photo', photo);
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Informações Pessoais */}
      <section className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border">
        <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-800">Informações Pessoais</h2>
        
        <div className="mb-6">
          <PhotoUpload
            photo={watchedData.personalInfo?.photo}
            onPhotoChange={handlePhotoChange}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className="label">Nome Completo</label>
            <input
              {...register('personalInfo.fullName')}
              className="input"
              placeholder="Seu nome completo"
            />
          </div>
          
          <div>
            <label className="label">E-mail</label>
            <input
              {...register('personalInfo.email')}
              type="email"
              className="input"
              placeholder="seu@email.com"
            />
          </div>
          
          <div>
            <label className="label">Telefone</label>
            <input
              {...register('personalInfo.phone')}
              className="input"
              placeholder="(11) 99999-9999"
            />
          </div>
          
          <div className="sm:col-span-2">
            <label className="label">Endereço</label>
            <input
              {...register('personalInfo.address')}
              className="input"
              placeholder="Cidade, Estado"
            />
          </div>
          
          <div>
            <label className="label">LinkedIn (opcional)</label>
            <input
              {...register('personalInfo.linkedin')}
              className="input"
              placeholder="linkedin.com/in/seu-perfil"
            />
          </div>
          
          <div>
            <label className="label">Website (opcional)</label>
            <input
              {...register('personalInfo.website')}
              className="input"
              placeholder="www.seusite.com"
            />
          </div>
        </div>
        
        <div className="mt-4">
          <label className="label">Resumo Profissional</label>
          <textarea
            {...register('personalInfo.summary')}
            className="input h-20 sm:h-24 resize-none"
            placeholder="Descreva brevemente sua experiência e objetivos profissionais..."
          />
        </div>
      </section>

      {/* Experiência Profissional */}
      <section className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 space-y-2 sm:space-y-0">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Experiência Profissional</h2>
          <button
            type="button"
            onClick={addExperience}
            className="btn btn-primary flex items-center justify-center space-x-2 w-full sm:w-auto"
          >
            <Plus size={16} />
            <span>Adicionar</span>
          </button>
        </div>

        <div className="space-y-4">
          {experienceFields.map((field, index) => (
            <div key={field.id} className="border rounded-lg p-3 sm:p-4 relative">
              <button
                type="button"
                onClick={() => removeExperience(index)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700 p-1"
              >
                <Trash2 size={16} />
              </button>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pr-8">
                <div className="sm:col-span-1">
                  <label className="label">Empresa</label>
                  <input
                    {...register(`experience.${index}.company`)}
                    className="input"
                    placeholder="Nome da empresa"
                  />
                </div>
                
                <div className="sm:col-span-1">
                  <label className="label">Cargo</label>
                  <input
                    {...register(`experience.${index}.position`)}
                    className="input"
                    placeholder="Ex: Vendedor, Enfermeiro, Analista, etc."
                  />
                </div>
                
                <div>
                  <label className="label">Data de Início</label>
                  <input
                    {...register(`experience.${index}.startDate`)}
                    type="month"
                    className="input"
                  />
                </div>
                
                <div>
                  <label className="label">Data de Término</label>
                  <input
                    {...register(`experience.${index}.endDate`)}
                    type="month"
                    className="input"
                    disabled={watchedData.experience?.[index]?.current}
                  />
                </div>
              </div>
              
              <div className="mt-4">
                <label className="flex items-center space-x-2">
                  <input
                    {...register(`experience.${index}.current`)}
                    type="checkbox"
                    className="rounded"
                  />
                  <span className="text-sm text-gray-700">Trabalho atual</span>
                </label>
              </div>
              
              <div className="mt-4">
                <label className="label">Descrição</label>
                <textarea
                  {...register(`experience.${index}.description`)}
                  className="input h-16 sm:h-20 resize-none"
                  placeholder="Descreva suas responsabilidades e conquistas..."
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Banner Promocional Inline */}
      <InlinePromo />

      {/* Educação */}
      <section className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Educação</h2>
          <button
            type="button"
            onClick={addEducation}
            className="btn btn-primary flex items-center space-x-2"
          >
            <Plus size={16} />
            <span>Adicionar</span>
          </button>
        </div>

        <div className="space-y-4">
          {educationFields.map((field, index) => (
            <div key={field.id} className="border rounded-lg p-4 relative">
              <button
                type="button"
                onClick={() => removeEducation(index)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
              >
                <Trash2 size={16} />
              </button>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="label">Instituição</label>
                  <input
                    {...register(`education.${index}.institution`)}
                    className="input"
                    placeholder="Nome da instituição"
                  />
                </div>
                
                <div>
                  <label className="label">Grau</label>
                  <input
                    {...register(`education.${index}.degree`)}
                    className="input"
                    placeholder="Ex: Ensino Médio, Técnico, Superior, etc."
                  />
                </div>
                
                <div>
                  <label className="label">Área de Estudo</label>
                  <input
                    {...register(`education.${index}.field`)}
                    className="input"
                    placeholder="Ex: Administração, Enfermagem, Direito, etc."
                  />
                </div>
                
                <div>
                  <label className="label">Ano de Conclusão</label>
                  <input
                    {...register(`education.${index}.endDate`)}
                    type="number"
                    min="1950"
                    max="2030"
                    className="input"
                    placeholder="2023"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Habilidades */}
      <section className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Habilidades</h2>
          <button
            type="button"
            onClick={addSkill}
            className="btn btn-primary flex items-center space-x-2"
          >
            <Plus size={16} />
            <span>Adicionar</span>
          </button>
        </div>

        <div className="space-y-4">
          {skillFields.map((field, index) => (
            <div key={field.id} className="border rounded-lg p-4 relative">
              <button
                type="button"
                onClick={() => removeSkill(index)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
              >
                <Trash2 size={16} />
              </button>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="label">Habilidade</label>
                  <input
                    {...register(`skills.${index}.name`)}
                    className="input"
                    placeholder="Ex: Comunicação, Excel, Vendas, etc."
                  />
                </div>
                
                <div>
                  <label className="label">Nível (1-5)</label>
                  <select
                    {...register(`skills.${index}.level`, { valueAsNumber: true })}
                    className="input"
                  >
                    <option value={1}>1 - Iniciante</option>
                    <option value={2}>2 - Básico</option>
                    <option value={3}>3 - Intermediário</option>
                    <option value={4}>4 - Avançado</option>
                    <option value={5}>5 - Expert</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Idiomas */}
      <section className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Idiomas</h2>
          <button
            type="button"
            onClick={addLanguage}
            className="btn btn-primary flex items-center space-x-2"
          >
            <Plus size={16} />
            <span>Adicionar</span>
          </button>
        </div>

        <div className="space-y-4">
          {languageFields.map((field, index) => (
            <div key={field.id} className="border rounded-lg p-4 relative">
              <button
                type="button"
                onClick={() => removeLanguage(index)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
              >
                <Trash2 size={16} />
              </button>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="label">Idioma</label>
                  <input
                    {...register(`languages.${index}.name`)}
                    className="input"
                    placeholder="Português, Inglês, etc."
                  />
                </div>
                
                <div>
                  <label className="label">Nível</label>
                  <select
                    {...register(`languages.${index}.level`)}
                    className="input"
                  >
                    <option value="Beginner">Iniciante</option>
                    <option value="Intermediate">Intermediário</option>
                    <option value="Advanced">Avançado</option>
                    <option value="Native">Nativo</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ResumeForm;
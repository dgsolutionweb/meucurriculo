# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# Gerador de Currículo Moderno

Um gerador de currículo completo e moderno desenvolvido com React, TypeScript e Tailwind CSS. Permite criar currículos profissionais com foto e fazer download em PDF.

## 🚀 Funcionalidades

- ✅ Interface moderna e responsiva
- ✅ Upload de foto de perfil
- ✅ Formulário completo para todas as seções do currículo
- ✅ Visualização em tempo real
- ✅ Download do currículo em PDF
- ✅ Validação de formulários
- ✅ Design profissional

## 🛠️ Tecnologias Utilizadas

- **React 18** - Biblioteca para interface do usuário
- **TypeScript** - Tipagem estática
- **Vite** - Build tool moderna e rápida
- **Tailwind CSS** - Framework CSS utilitário
- **React Hook Form** - Gerenciamento de formulários
- **jsPDF** - Geração de PDFs
- **html2canvas** - Captura de elementos HTML
- **Lucide React** - Ícones modernos

## 📦 Instalação

1. Clone ou baixe o projeto
2. Instale as dependências:
```bash
npm install
```

3. Execute o projeto em modo de desenvolvimento:
```bash
npm run dev
```

4. Abra [http://localhost:5173](http://localhost:5173) no seu navegador

## 🎯 Como Usar

### 1. Preenchimento dos Dados
- Na aba "Editar", preencha todas as informações pessoais
- Adicione sua foto clicando no círculo de upload
- Preencha experiências profissionais, educação, habilidades e idiomas

### 2. Visualização
- Na aba "Visualizar", veja como seu currículo ficará formatado
- O layout é otimizado para impressão em formato A4

### 3. Download em PDF
- Clique no botão "Baixar PDF" para gerar e baixar seu currículo
- O arquivo será salvo como "meu-curriculo.pdf"

## 📋 Seções do Currículo

### Informações Pessoais
- Nome completo
- E-mail e telefone
- Endereço
- LinkedIn e website (opcionais)
- Foto de perfil
- Resumo profissional

### Experiência Profissional
- Empresa e cargo
- Período de trabalho
- Descrição das atividades
- Opção para marcar trabalho atual

### Educação
- Instituição de ensino
- Grau e área de estudo
- Ano de conclusão

### Habilidades
- Nome da habilidade
- Nível de 1 a 5 (representado visualmente)

### Idiomas
- Nome do idioma
- Nível (Iniciante, Intermediário, Avançado, Nativo)

## 🎨 Personalização

O design utiliza Tailwind CSS e pode ser facilmente personalizado:

- **Cores**: Edite as cores primárias em `tailwind.config.js`
- **Fontes**: A fonte padrão é Inter, importada do Google Fonts
- **Layout**: Modifique os componentes em `src/components/`

## 🏗️ Estrutura do Projeto

```
src/
├── components/           # Componentes React
│   ├── PhotoUpload.tsx  # Upload de foto
│   ├── ResumeForm.tsx   # Formulário de dados
│   └── ResumePreview.tsx # Visualização do currículo
├── hooks/               # Custom hooks
│   └── usePDFGenerator.ts # Hook para geração de PDF
├── types/               # Definições de tipos TypeScript
│   └── resume.ts        # Tipos do currículo
├── App.tsx             # Componente principal
├── main.tsx            # Ponto de entrada
└── index.css           # Estilos globais
```

## 📱 Responsividade

O aplicativo é totalmente responsivo e funciona em:
- Desktop
- Tablets
- Smartphones

## 🔧 Scripts Disponíveis

- `npm run dev` - Executa em modo de desenvolvimento
- `npm run build` - Gera build de produção
- `npm run preview` - Visualiza build de produção
- `npm run lint` - Executa linting do código

## 🤝 Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para:
- Reportar bugs
- Sugerir melhorias
- Enviar pull requests

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

---

**Desenvolvido com ❤️ usando React e TypeScript**

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

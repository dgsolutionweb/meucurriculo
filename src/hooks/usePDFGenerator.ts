import { useCallback } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const usePDFGenerator = () => {
  const generatePDF = useCallback(async (elementId: string, filename: string = 'curriculo.pdf') => {
    try {
      console.log('🔍 Procurando elemento com ID:', elementId);
      const element = document.getElementById(elementId);
      
      if (!element) {
        console.error('❌ Elemento não encontrado no DOM');
        console.log('🔎 Elementos disponíveis:', Array.from(document.querySelectorAll('[id]')).map(el => el.id));
        throw new Error(`Elemento com ID "${elementId}" não encontrado no DOM`);
      }

      console.log('✅ Elemento encontrado!');
      console.log('📐 Dimensões do elemento:', {
        width: element.offsetWidth,
        height: element.offsetHeight,
        scrollHeight: element.scrollHeight,
        isVisible: element.offsetParent !== null
      });

      // Verificar se o elemento está visível
      if (element.offsetParent === null) {
        console.warn('⚠️ Elemento pode não estar visível');
      }

      // Salvar estilos originais
      const originalStyle = element.style.cssText;
      const originalTransform = element.parentElement?.style.transform;
      
      // Resetar transform do container pai se existir
      if (element.parentElement) {
        element.parentElement.style.transform = 'scale(1)';
      }

      // Aplicar estilos otimizados para PDF
      element.style.cssText = `
        ${originalStyle}
        transform: scale(1) !important;
        max-width: 800px !important;
        width: 800px !important;
        margin: 0 auto !important;
        padding: 20px !important;
        font-size: 13px !important;
        line-height: 1.4 !important;
        box-shadow: none !important;
        overflow: visible !important;
        min-height: auto !important;
        position: relative !important;
        display: block !important;
      `;

      // Aguardar um momento para aplicação dos estilos
      await new Promise(resolve => setTimeout(resolve, 100));

      // Forçar reflow se necessário
      element.style.display = 'none';
      element.offsetHeight; // trigger reflow
      element.style.display = 'block';
      await new Promise(resolve => setTimeout(resolve, 100));

      // Capturar elemento com configurações otimizadas para captura completa
      const canvas = await html2canvas(element, {
        scale: 1.5, // Reduzir scale para evitar problemas de memória
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: true,
        foreignObjectRendering: false,
        removeContainer: true,
        imageTimeout: 15000,
        width: element.scrollWidth, // Usar scrollWidth para capturar tudo
        height: element.scrollHeight, // Usar scrollHeight para capturar tudo
        windowWidth: 800, // Forçar largura específica
        windowHeight: element.scrollHeight + 100, // Altura extra para segurança
        onclone: (clonedDoc: Document) => {
          const clonedElement = clonedDoc.getElementById(elementId);
          if (clonedElement) {
            // Aplicar estilos que garantem captura completa
            clonedElement.style.width = '800px';
            clonedElement.style.minWidth = '800px';
            clonedElement.style.maxWidth = '800px';
            clonedElement.style.padding = '20px';
            clonedElement.style.margin = '0';
            clonedElement.style.backgroundColor = '#ffffff';
            clonedElement.style.fontFamily = 'system-ui, -apple-system, sans-serif';
            clonedElement.style.overflow = 'visible';
            clonedElement.style.height = 'auto';
            clonedElement.style.minHeight = 'auto';
            
            // Garantir que todos os elementos sejam visíveis
            const allElements = clonedElement.querySelectorAll('*');
            allElements.forEach((el: Element) => {
              const element = el as HTMLElement;
              element.style.overflow = 'visible';
              element.style.textOverflow = 'clip';
              element.style.whiteSpace = 'normal';
              element.style.wordWrap = 'break-word';
              element.style.maxWidth = 'none';
              element.style.maxHeight = 'none';
            });

            // **CORREÇÃO ESPECÍFICA PARA LAYOUT LADO A LADO NO RESUMEPREVIEW**
            // Detectar o grid específico que contém Habilidades e Idiomas
            const skillsLanguagesGrid = clonedElement.querySelector('.grid.grid-cols-1.lg\\:grid-cols-2');
            if (skillsLanguagesGrid) {
              const grid = skillsLanguagesGrid as HTMLElement;
              
              // Forçar layout de duas colunas para PDF
              grid.style.display = 'grid';
              grid.style.gridTemplateColumns = '1fr 1fr';
              grid.style.gap = '24px';
              grid.style.width = '100%';
              
              console.log('📋 Grid Skills/Languages encontrado e ajustado para PDF');
              
              // Garantir que os itens filhos (seções) não quebrem
              const sections = grid.children;
              for (let i = 0; i < sections.length; i++) {
                const section = sections[i] as HTMLElement;
                section.style.breakInside = 'avoid';
                section.style.pageBreakInside = 'avoid';
                section.style.overflow = 'visible';
              }
            }

            // **CORREÇÃO GENÉRICA PARA GRIDS RESPONSIVOS**
            const responsiveGrids = clonedElement.querySelectorAll('.grid');
            responsiveGrids.forEach((gridContainer: Element) => {
              const grid = gridContainer as HTMLElement;
              
              // Verificar se className existe e é uma string antes de usar includes
              if (grid.className && typeof grid.className === 'string') {
                // Se o grid tem classes que indicam layout responsivo, forçar comportamento desktop
                if (grid.className.includes('lg:grid-cols-2') || 
                    grid.className.includes('md:grid-cols-2') ||
                    grid.className.includes('print:grid-cols-2')) {
                  
                  grid.style.display = 'grid';
                  grid.style.gridTemplateColumns = '1fr 1fr';
                  grid.style.gap = '24px';
                  grid.style.width = '100%';
                  
                  console.log('📐 Grid responsivo ajustado:', grid.className);
                  
                  // Garantir que os itens filhos não quebrem o layout
                  const gridItems = grid.children;
                  for (let i = 0; i < gridItems.length; i++) {
                    const item = gridItems[i] as HTMLElement;
                    item.style.breakInside = 'avoid';
                    item.style.pageBreakInside = 'avoid';
                    item.style.overflow = 'visible';
                  }
                }
              }
            });

            // **FORÇA ESTILOS PRINT/PDF PARA TODOS OS ELEMENTOS**
            // Garantir que todas as classes print: sejam aplicadas
            const printElements = clonedElement.querySelectorAll('[class*="print:"]');
            printElements.forEach((element: Element) => {
              const el = element as HTMLElement;
              
              // Verificar se className existe e é uma string
              if (el.className && typeof el.className === 'string') {
                // Forçar aplicação das classes print no PDF
                if (el.className.includes('print:grid-cols-2')) {
                  el.style.gridTemplateColumns = '1fr 1fr';
                }
                if (el.className.includes('print:gap-4')) {
                  el.style.gap = '1rem';
                }
              }
            });

            console.log('🎨 Ajustes de layout concluídos para PDF');
          }
        }
      });

      console.log('🖼️ Canvas gerado:', {
        width: canvas.width,
        height: canvas.height,
        isEmpty: canvas.width === 0 || canvas.height === 0
      });

      if (canvas.width === 0 || canvas.height === 0) {
        throw new Error('Canvas vazio - elemento não foi capturado corretamente');
      }

      // Restaurar estilos originais
      element.style.cssText = originalStyle;
      if (element.parentElement && originalTransform !== undefined) {
        element.parentElement.style.transform = originalTransform;
      }

      // Gerar PDF com ajustes para conteúdo completo
      const imgData = canvas.toDataURL('image/png', 0.95);
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true
      });

      console.log('📄 Gerando PDF...');

      const pdfWidth = 210; // A4 width em mm
      const pdfHeight = 297; // A4 height em mm
      const margin = 8; // Margens menores para aproveitar mais espaço
      
      const availableWidth = pdfWidth - (margin * 2);
      const availableHeight = pdfHeight - (margin * 2);
      
      // Calcular proporções mantendo aspect ratio
      const canvasAspectRatio = canvas.height / canvas.width;
      let imgWidth = availableWidth;
      let imgHeight = imgWidth * canvasAspectRatio;

      console.log('📏 Dimensões calculadas:', {
        canvasWidth: canvas.width,
        canvasHeight: canvas.height,
        aspectRatio: canvasAspectRatio,
        pdfWidth,
        pdfHeight,
        imgWidth,
        imgHeight,
        availableHeight,
        needsResize: imgHeight > availableHeight
      });

      // Se a altura for maior que o disponível, ajustar baseado na altura
      if (imgHeight > availableHeight) {
        imgHeight = availableHeight;
        imgWidth = imgHeight / canvasAspectRatio;
        
        // Se ainda assim a largura for maior, usar múltiplas páginas
        if (imgWidth > availableWidth) {
          imgWidth = availableWidth;
          imgHeight = imgWidth * canvasAspectRatio;
        }
      }

      // Centralizar horizontalmente se necessário
      const xOffset = margin + (availableWidth - imgWidth) / 2;

      console.log('📐 Posicionamento final:', {
        xOffset,
        yOffset: margin,
        finalWidth: imgWidth,
        finalHeight: imgHeight,
        fitsInOnePage: imgHeight <= availableHeight
      });

      if (imgHeight <= availableHeight) {
        // Cabe em uma página
        pdf.addImage(imgData, 'PNG', xOffset, margin, imgWidth, imgHeight);
      } else {
        // Dividir em páginas proporcionalmente
        const pagesNeeded = Math.ceil(imgHeight / availableHeight);
        
        for (let page = 0; page < pagesNeeded; page++) {
          if (page > 0) {
            pdf.addPage();
          }
          
          const sourceY = (page * availableHeight / imgHeight) * canvas.height;
          const sourceHeight = Math.min(
            (availableHeight / imgHeight) * canvas.height,
            canvas.height - sourceY
          );
          
          // Criar canvas para esta página específica
          const pageCanvas = document.createElement('canvas');
          const pageCtx = pageCanvas.getContext('2d');
          pageCanvas.width = canvas.width;
          pageCanvas.height = sourceHeight;
          
          if (pageCtx) {
            pageCtx.drawImage(
              canvas,
              0, sourceY, canvas.width, sourceHeight,
              0, 0, canvas.width, sourceHeight
            );
            
            const pageImgData = pageCanvas.toDataURL('image/png', 0.95);
            const pageImgHeight = (sourceHeight / canvas.height) * imgHeight;
            
            pdf.addImage(pageImgData, 'PNG', xOffset, margin, imgWidth, pageImgHeight);
          }
        }
      }

      console.log('✅ PDF gerado com sucesso!');
      pdf.save(filename);
      
      return { success: true };
    } catch (error) {
      console.error('❌ Erro ao gerar PDF:', error);
      return { success: false, error: error as Error };
    }
  }, []);

  return { generatePDF };
};
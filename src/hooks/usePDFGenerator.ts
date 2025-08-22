import { useCallback } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const usePDFGenerator = () => {
  const generatePDF = useCallback(async (elementId: string, filename: string = 'curriculo.pdf') => {
    try {
      const element = document.getElementById(elementId);
      if (!element) {
        throw new Error('Elemento não encontrado');
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
      `;

      // Aguardar um momento para aplicação dos estilos
      await new Promise(resolve => setTimeout(resolve, 100));

      // Capturar elemento com configurações otimizadas
      const canvas = await html2canvas(element, {
        scale: 1.5,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        width: 800,
        height: element.scrollHeight,
        scrollX: 0,
        scrollY: 0,
        logging: false,
        onclone: (clonedDoc) => {
          const clonedElement = clonedDoc.getElementById(elementId);
          if (clonedElement) {
            // Garantir que todo o conteúdo seja visível
            clonedElement.style.width = '800px';
            clonedElement.style.maxWidth = '800px';
            clonedElement.style.overflow = 'visible';
            clonedElement.style.minHeight = 'auto';
            clonedElement.style.transform = 'none';
            clonedElement.style.position = 'static';
            
            // Resetar todos os elementos para garantir renderização correta
            const allElements = clonedElement.querySelectorAll('*');
            allElements.forEach(el => {
              const element = el as HTMLElement;
              
              // Garantir que truncate não interfira
              if (element.classList.contains('truncate')) {
                element.style.overflow = 'visible';
                element.style.textOverflow = 'clip';
                element.style.whiteSpace = 'normal';
              }
              
              // Garantir break-words
              if (element.classList.contains('break-words')) {
                element.style.wordBreak = 'break-word';
                element.style.overflowWrap = 'break-word';
              }
            });
            
            // **CORREÇÃO ESPECÍFICA DO CABEÇALHO**
            const headerSection = clonedElement.querySelector('.border-b-2');
            if (headerSection) {
              const header = headerSection as HTMLElement;
              header.style.display = 'block';
              header.style.width = '100%';
              header.style.paddingBottom = '16px';
              header.style.marginBottom = '24px';
              header.style.borderBottom = '2px solid #2563eb';
              header.style.pageBreakAfter = 'avoid';
              
              // Encontrar o container flex principal
              const flexContainer = header.querySelector('.flex');
              if (flexContainer) {
                const flex = flexContainer as HTMLElement;
                
                // **FORÇAR LAYOUT SIMPLES PARA PDF**
                flex.style.display = 'block';
                flex.style.width = '100%';
                flex.style.position = 'relative';
                
                // Tratar a foto
                const photoDiv = flex.querySelector('.flex-shrink-0');
                if (photoDiv) {
                  const photo = photoDiv as HTMLElement;
                  photo.style.float = 'left';
                  photo.style.marginRight = '16px';
                  photo.style.marginBottom = '8px';
                  
                  const img = photo.querySelector('img');
                  if (img) {
                    (img as HTMLElement).style.width = '80px';
                    (img as HTMLElement).style.height = '80px';
                    (img as HTMLElement).style.borderRadius = '50%';
                    (img as HTMLElement).style.objectFit = 'cover';
                    (img as HTMLElement).style.border = '2px solid #e5e7eb';
                    (img as HTMLElement).style.display = 'block';
                  }
                }
                
                // Tratar as informações
                const infoDiv = flex.querySelector('.flex-1');
                if (infoDiv) {
                  const info = infoDiv as HTMLElement;
                  info.style.display = 'block';
                  info.style.marginLeft = '96px'; // Largura da foto + gap
                  info.style.width = 'auto';
                  
                  // Corrigir o título
                  const title = info.querySelector('h1');
                  if (title) {
                    (title as HTMLElement).style.fontSize = '22px';
                    (title as HTMLElement).style.fontWeight = 'bold';
                    (title as HTMLElement).style.color = '#1f2937';
                    (title as HTMLElement).style.marginBottom = '8px';
                    (title as HTMLElement).style.lineHeight = '1.2';
                    (title as HTMLElement).style.display = 'block';
                    (title as HTMLElement).style.width = '100%';
                  }
                  
                  // **RECRIAR O GRID DE CONTATOS MANUALMENTE**
                  const contactGrid = info.querySelector('.grid');
                  if (contactGrid) {
                    const grid = contactGrid as HTMLElement;
                    grid.style.display = 'block';
                    grid.style.width = '100%';
                    grid.style.marginTop = '8px';
                    
                    // Pegar todos os itens de contato
                    const contactItems = Array.from(grid.querySelectorAll('.flex'));
                    
                    // Limpar o grid e recriar manualmente
                    grid.innerHTML = '';
                    
                    // Criar duas colunas manualmente
                    const leftColumn = clonedDoc.createElement('div');
                    leftColumn.style.float = 'left';
                    leftColumn.style.width = '48%';
                    leftColumn.style.marginRight = '4%';
                    
                    const rightColumn = clonedDoc.createElement('div');
                    rightColumn.style.float = 'left';
                    rightColumn.style.width = '48%';
                    
                    contactItems.forEach((item, index) => {
                      const contactDiv = clonedDoc.createElement('div');
                      contactDiv.style.display = 'block';
                      contactDiv.style.marginBottom = '4px';
                      contactDiv.style.fontSize = '11px';
                      contactDiv.style.color = '#6b7280';
                      contactDiv.style.lineHeight = '1.3';
                      
                      // Copiar o conteúdo do item original
                      contactDiv.innerHTML = item.innerHTML;
                      
                      // Corrigir ícones dentro do item
                      const icon = contactDiv.querySelector('svg');
                      if (icon) {
                        (icon as unknown as HTMLElement).style.width = '12px';
                        (icon as unknown as HTMLElement).style.height = '12px';
                        (icon as unknown as HTMLElement).style.verticalAlign = 'middle';
                        (icon as unknown as HTMLElement).style.marginRight = '6px';
                        (icon as unknown as HTMLElement).style.color = '#3b82f6';
                      }
                      
                      const span = contactDiv.querySelector('span');
                      if (span) {
                        (span as HTMLElement).style.verticalAlign = 'middle';
                        (span as HTMLElement).style.wordBreak = 'break-all';
                      }
                      
                      // Alternar entre colunas
                      if (index % 2 === 0) {
                        leftColumn.appendChild(contactDiv);
                      } else {
                        rightColumn.appendChild(contactDiv);
                      }
                    });
                    
                    grid.appendChild(leftColumn);
                    grid.appendChild(rightColumn);
                    
                    // Clearfix
                    const clearfix = clonedDoc.createElement('div');
                    clearfix.style.clear = 'both';
                    grid.appendChild(clearfix);
                  }
                  
                  // Corrigir resumo se existir
                  const summaryDiv = info.querySelector('div:has(p)');
                  if (summaryDiv) {
                    const summary = summaryDiv.querySelector('p');
                    if (summary && summary.textContent) {
                      (summaryDiv as HTMLElement).style.clear = 'both';
                      (summaryDiv as HTMLElement).style.marginTop = '12px';
                      (summary as HTMLElement).style.fontSize = '11px';
                      (summary as HTMLElement).style.color = '#374151';
                      (summary as HTMLElement).style.lineHeight = '1.4';
                    }
                  }
                }
                
                // Clearfix para o cabeçalho
                const clearfix = clonedDoc.createElement('div');
                clearfix.style.clear = 'both';
                flex.appendChild(clearfix);
              }
            }
            
            // Ajustar outras seções
            const h2s = clonedElement.querySelectorAll('h2');
            h2s.forEach(h2 => {
              (h2 as HTMLElement).style.fontSize = '15px';
              (h2 as HTMLElement).style.fontWeight = 'bold';
              (h2 as HTMLElement).style.color = '#1f2937';
              (h2 as HTMLElement).style.marginBottom = '10px';
              (h2 as HTMLElement).style.marginTop = '16px';
              (h2 as HTMLElement).style.borderLeft = '4px solid #3b82f6';
              (h2 as HTMLElement).style.paddingLeft = '12px';
            });

            const h3s = clonedElement.querySelectorAll('h3');
            h3s.forEach(h3 => {
              (h3 as HTMLElement).style.fontSize = '13px';
              (h3 as HTMLElement).style.marginBottom = '4px';
              (h3 as HTMLElement).style.lineHeight = '1.3';
            });

            const paragraphs = clonedElement.querySelectorAll('p');
            paragraphs.forEach(p => {
              if (!(p as HTMLElement).closest('h1, h2, h3')) {
                (p as HTMLElement).style.fontSize = '11px';
                (p as HTMLElement).style.lineHeight = '1.4';
              }
            });

            // Compactar seções
            const sections = clonedElement.querySelectorAll('section');
            sections.forEach(section => {
              (section as HTMLElement).style.marginBottom = '14px';
              (section as HTMLElement).style.pageBreakInside = 'avoid';
            });
          }
        }
      });

      // Restaurar estilos originais
      element.style.cssText = originalStyle;
      if (element.parentElement && originalTransform !== undefined) {
        element.parentElement.style.transform = originalTransform;
      }

      // Gerar PDF
      const imgData = canvas.toDataURL('image/png', 0.9);
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const pdfWidth = 210;
      const pdfHeight = 297;
      const margin = 10;
      
      const imgWidth = pdfWidth - (margin * 2);
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      if (imgHeight <= pdfHeight - (margin * 2)) {
        // Cabe em uma página
        pdf.addImage(imgData, 'PNG', margin, margin, imgWidth, imgHeight);
      } else {
        // Dividir em duas páginas
        const firstPageHeight = pdfHeight - (margin * 2);
        
        // Primeira página
        pdf.addImage(imgData, 'PNG', margin, margin, imgWidth, firstPageHeight);
        
        // Segunda página
        pdf.addPage();
        const offsetY = margin - firstPageHeight;
        pdf.addImage(imgData, 'PNG', margin, offsetY, imgWidth, imgHeight);
      }

      pdf.save(filename);
      
      return { success: true };
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      return { success: false, error: error as Error };
    }
  }, []);

  return { generatePDF };
};
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas-pro';
import { type MarkdownDocument } from '@/store/useDocumentStore';

type DocumentToPDF = Pick<MarkdownDocument, 'name'>;

interface PDFDimensions {
  pageWidth: number;
  pageHeight: number;
  margin: number;
  contentWidth: number;
  contentHeight: number;
}

export const exportToPDF = async (currentDocument: DocumentToPDF | null) => {
  if (!currentDocument) return;

  const element = document.querySelector('#preview-content') as HTMLElement;
  if (!element) return;

  try {
    const originalScrollPos = window.scrollY;

    const originalStyle = element.style.cssText;
    element.style.maxHeight = 'none';
    element.style.height = 'auto';
    if (element.parentElement) {
      element.parentElement.style.maxHeight = 'none';
      element.parentElement.style.height = 'auto';
      element.parentElement.style.overflow = 'visible';
    }

    const pageWidth = 595.28;
    const pageHeight = 841.89;
    const margin = 40;
    const dimensions: PDFDimensions = {
      pageWidth: pageWidth,
      pageHeight: pageHeight,
      margin: margin,
      contentWidth: pageWidth - (2 * margin),
      contentHeight: pageHeight - (2 * margin),
    };

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'pt',
      format: 'a4',
    });

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#fff',
      height: element.scrollHeight,
      windowHeight: element.scrollHeight,
      onclone: (clonedDoc) => {
        const clonedElement = clonedDoc.querySelector('#preview-content') as HTMLElement;
        if (clonedElement) {
          clonedElement.style.maxHeight = 'none';
          clonedElement.style.height = 'auto';
          clonedElement.className += ' prose-blockquote:bg-gray-100';
          clonedElement.className = clonedElement.className
            .replace('prose-invert', '')
            .replace('prose-p:text-gray-300', 'prose-p:text-gray-700')
            .replace('prose-code:text-gray-300', 'prose-code:text-gray-700')
            .replace('prose-pre:bg-[#252526]', 'prose-pre:bg-gray-100');

          if (clonedElement.parentElement) {
            clonedElement.parentElement.style.maxHeight = 'none';
            clonedElement.parentElement.style.height = 'auto';
            clonedElement.parentElement.style.overflow = 'visible';
          }
        }
      }
    });

    const imgWidth = dimensions.contentWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    const imgData = canvas.toDataURL('image/png');

    let heightLeft = imgHeight;
    let position = 0;
    let pageNumber = 0;

    pdf.addImage(
      imgData,
      'PNG',
      dimensions.margin,
      dimensions.margin + position,
      imgWidth,
      imgHeight
    );
    heightLeft -= (dimensions.pageHeight - 2 * dimensions.margin);

    while (heightLeft > 0) {
      pageNumber++;
      position = -(dimensions.pageHeight - 2 * dimensions.margin) * pageNumber;

      pdf.addPage();
      pdf.addImage(
        imgData,
        'PNG',
        dimensions.margin,
        dimensions.margin + position,
        imgWidth,
        imgHeight
      );

      heightLeft -= (dimensions.pageHeight - 2 * dimensions.margin);
    }

    element.style.cssText = originalStyle;
    if (element.parentElement) {
      element.parentElement.style.maxHeight = '';
      element.parentElement.style.height = '';
      element.parentElement.style.overflow = '';
    }

    window.scrollTo(0, originalScrollPos);
    pdf.save(`${currentDocument.name || 'document'}.pdf`);
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw new Error('Failed to generate PDF');
  }
};
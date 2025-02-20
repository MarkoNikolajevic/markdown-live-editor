import jsPDF from 'jspdf';
import html2canvas from 'html2canvas-pro';
import { type MarkdownDocument } from '@/store/useDocumentStore';

type DocumentToPDF = Pick<MarkdownDocument, 'name'>;

export const exportToPDF = async (currentDocument: DocumentToPDF | null) => {
  if (!currentDocument) return;

  const element = document.querySelector('#preview-content') as HTMLElement;
  if (!element) return;

  try {
    const cloneElement = element.cloneNode(true) as HTMLElement;
    cloneElement.style.position = 'absolute';
    cloneElement.style.left = '-9999px';
    cloneElement.style.width = `${element.offsetWidth}px`;
    document.body.appendChild(cloneElement);

    cloneElement.style.height = 'auto';
    cloneElement.style.overflow = 'visible';
    cloneElement.style.maxHeight = 'none';
    cloneElement.className += ' prose-blockquote:bg-gray-100';
    cloneElement.className = cloneElement.className
      .replace('prose-invert', '')
      .replace('prose-p:text-gray-300', 'prose-p:text-gray-700')
      .replace('prose-code:text-gray-300', 'prose-code:text-gray-700')
      .replace('prose-pre:bg-[#252526]', 'prose-pre:bg-gray-100');

    const allTextElements = cloneElement.querySelectorAll('p, h1, h2, h3, h4, h5, h6, li, code');
    allTextElements.forEach(el => {
      (el as HTMLElement).style.color = '#374151';
    });

    const pdf = new jsPDF('p', 'pt', 'a4');
    const canvas = await html2canvas(cloneElement, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#fff',
      windowHeight: cloneElement.scrollHeight,
      height: cloneElement.scrollHeight
    });

    document.body.removeChild(cloneElement);

    const pageWidth = 595.28;
    const pageHeight = 841.89;
    const margin = 20;
    const imgWidth = pageWidth - (margin * 2);
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    const imgData = canvas.toDataURL('image/png');
    pdf.addImage(imgData, 'PNG', margin, margin, imgWidth, imgHeight);

    let heightLeft = imgHeight - (pageHeight - (margin * 2));
    let position = -(pageHeight - (margin * 2));

    while (heightLeft >= 0) {
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
      heightLeft -= (pageHeight - (margin * 2));
      position -= (pageHeight - (margin * 2));
    }

    pdf.save(`${currentDocument.name || 'document'}.pdf`);
  } catch (error) {
    console.error('Error generating PDF:', error);
  }
};
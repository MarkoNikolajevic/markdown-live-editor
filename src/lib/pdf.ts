import jsPDF from 'jspdf';
import html2canvas from 'html2canvas-pro';
import { type MarkdownDocument } from '@/store/useDocumentStore';

type DocumentToPDF = Pick<MarkdownDocument, 'name'>;

export const exportToPDF = async (currentDocument: DocumentToPDF | null) => {
  if (!currentDocument) return;

  const element = document.querySelector('#preview-content') as HTMLElement;
  if (!element) return;

  try {
    const pdf = new jsPDF('p', 'pt', 'a4');
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#1e1e1e'
    });

    const imgWidth = 595.28;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    const pageHeight = 841.89;

    const imgData = canvas.toDataURL('image/png');
    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

    let heightLeft = imgHeight - pageHeight;
    let position = -pageHeight;

    while (heightLeft >= 0) {
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      position -= pageHeight;
    }

    pdf.save(`${currentDocument.name || 'document'}.pdf`);
  } catch (error) {
    console.error('Error generating PDF:', error);
  }
};
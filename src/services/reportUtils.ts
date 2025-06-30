import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { saveAs } from 'file-saver';
import Papa from 'papaparse';

// Extend jsPDF type to include autoTable
declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}

// Generic function to export data as PDF
export const exportToPDF = (
  title: string,
  headers: string[],
  data: any[],
  orientation: 'portrait' | 'landscape' = 'portrait'
) => {
  const doc = new jsPDF({
    orientation: orientation,
    unit: 'mm',
    format: 'a4',
  });

  // Add title
  doc.setFontSize(16);
  doc.text(title, 14, 10);
  doc.setFontSize(10);
  doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 20);

  // Add table
  doc.autoTable({
    head: [headers],
    body: data,
    startY: 25,
    styles: { fontSize: 8 },
    headStyles: { fillColor: [128, 0, 0] }, // Maroon color for header
  });

  // Save the PDF
  doc.save(`${title.toLowerCase().replace(/\s+/g, '_')}_${Date.now()}.pdf`);
};

// Generic function to export data as CSV
export const exportToCSV = (
  filename: string,
  data: any[]
) => {
  const csv = Papa.unparse(data);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  saveAs(blob, `${filename.toLowerCase().replace(/\s+/g, '_')}_${Date.now()}.csv`);
};

// Generic function to import data from CSV
export const importFromCSV = (file: File): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    Papa.parse<any>(file, {
      complete: (results: Papa.ParseResult<any>) => {
        resolve(results.data);
      },
      header: true,
      error: (error: Error, file: File) => {
        reject(error);
      }
    });
  });
};

// Function to format date for reports
export const formatReportDate = (date: string | Date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Function to generate report filename
export const generateReportFilename = (prefix: string, extension: string) => {
  const date = new Date().toISOString().split('T')[0];
  return `${prefix}_report_${date}.${extension}`;
}; 
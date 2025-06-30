import jsPDF from 'jspdf';
import { feeStructure } from '../data/feeStructure';

// Alternative function to download a static PDF file
export const downloadStaticFeeStructurePDF = () => {
  const link = document.createElement('a');
  link.href = '/fee-structure.pdf';
  link.download = 'Ambassador-Academy-Fee-Structure-2025.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const generateFeeStructurePDF = (level?: 'kindergarten' | 'primary' | 'juniorSecondary') => {
  const doc = new jsPDF();
  
  // Define beautiful colors
  const primaryColor = [139, 69, 19]; // Maroon
  const secondaryColor = [59, 130, 246]; // Blue
  const accentColor = [34, 197, 94]; // Green
  const warningColor = [251, 191, 36]; // Yellow
  const lightGray = [243, 244, 246];
  const darkGray = [55, 65, 81];
  
  // Helper function to draw rounded rectangle
  const drawRoundedRect = (x: number, y: number, w: number, h: number, r: number, color: number[]) => {
    doc.setFillColor(color[0], color[1], color[2]);
    doc.roundedRect(x, y, w, h, r, r, 'F');
  };
  
  // Helper function to add text with shadow
  const addTextWithShadow = (text: string, x: number, y: number, options: any = {}) => {
    // Shadow effect
    doc.setTextColor(100, 100, 100);
    doc.text(text, x + 1, y + 1, options);
    // Main text
    doc.setTextColor(0, 0, 0);
    doc.text(text, x, y, options);
  };

  if (level) {
    // Single level PDF (Day + Boarding if available)
    // Header section
    drawRoundedRect(10, 10, 190, 50, 10, [255, 255, 255]);
    doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.setLineWidth(3);
    doc.roundedRect(10, 10, 190, 50, 10, 10, 'S');
    doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.circle(25, 35, 12, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('A', 20, 40);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    addTextWithShadow(feeStructure.schoolName, 105, 30, { align: 'center' });
    doc.setFontSize(14);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
    doc.text(`Fee Structure ${feeStructure.academicYear}`, 105, 40, { align: 'center' });
    // Contact info
    drawRoundedRect(10, 70, 190, 30, 8, [248, 250, 252]);
    doc.setDrawColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
    doc.setLineWidth(2);
    doc.roundedRect(10, 70, 190, 30, 8, 8, 'S');
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
    doc.text('📞 Contact Information', 20, 80);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
    doc.text(`Phone: ${feeStructure.contactInfo.phone}`, 20, 90);
    doc.text(`Email: ${feeStructure.contactInfo.email}`, 70, 90);
    doc.text(`Address: ${feeStructure.contactInfo.address}`, 120, 90);
    // Day School Fee for this level
    const day = feeStructure.daySchool[level];
    let yPosition = 115;
    if (day) {
      doc.setFontSize(18);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      addTextWithShadow('🎓 DAY SCHOOL FEES', 105, yPosition, { align: 'center' });
      doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.setLineWidth(4);
      doc.line(30, yPosition + 5, 180, yPosition + 5);
      yPosition += 15;
      // Level header
      drawRoundedRect(15, yPosition, 180, 18, 6, primaryColor);
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(13);
      doc.setFont('helvetica', 'bold');
      doc.text(day.title, 25, yPosition + 12);
      if (day.subtitle) {
        doc.setFontSize(9);
        doc.setFont('helvetica', 'italic');
        doc.text(day.subtitle, 25, yPosition + 25);
        yPosition += 10;
      }
      // Fees table
      const tableY = yPosition + 25;
      const tableHeight = (day.fees.length + 1) * 15 + 15;
      drawRoundedRect(15, tableY, 180, tableHeight, 6, [255, 255, 255]);
      doc.setDrawColor(200, 200, 200);
      doc.setLineWidth(1);
      doc.roundedRect(15, tableY, 180, tableHeight, 6, 6, 'S');
      drawRoundedRect(15, tableY, 180, 15, 6, primaryColor);
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.text('Fee Type', 25, tableY + 10);
      doc.text('Amount', 120, tableY + 10);
      doc.text('Description', 150, tableY + 10);
      doc.setFont('helvetica', 'normal');
      day.fees.forEach((fee, feeIndex) => {
        const rowY = tableY + 15 + (feeIndex * 15);
        if (feeIndex % 2 === 0) {
          doc.setFillColor(248, 250, 252);
          doc.roundedRect(15, rowY, 180, 15, 0, 0, 'F');
        }
        doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
        doc.text(fee.name, 25, rowY + 10);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
        doc.text(fee.amount, 120, rowY + 10);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
        doc.text(fee.description || '', 150, rowY + 10);
      });
      // Total row
      const totalY = tableY + 15 + (day.fees.length * 15);
      doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.roundedRect(15, totalY, 180, 15, 6, 6, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.text('💰 TOTAL PER TERM:', 25, totalY + 10);
      doc.setFontSize(12);
      doc.text(day.total, 120, totalY + 10);
      yPosition = totalY + 20;
      // Notes
      if (day.notes && day.notes.length > 0) {
        const notesY = yPosition;
        const notesHeight = day.notes.length * 10 + 15;
        drawRoundedRect(15, notesY, 180, notesHeight, 6, [255, 248, 220]);
        doc.setDrawColor(warningColor[0], warningColor[1], warningColor[2]);
        doc.setLineWidth(2);
        doc.roundedRect(15, notesY, 180, notesHeight, 6, 6, 'S');
        doc.setTextColor(146, 64, 14);
        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        doc.text('📋 Program Notes:', 20, notesY + 10);
        doc.setFont('helvetica', 'normal');
        day.notes.forEach((note, noteIndex) => {
          doc.text(`• ${note}`, 20, notesY + 20 + (noteIndex * 10));
        });
        yPosition = notesY + notesHeight + 15;
      }
    }
    // Boarding School Fee for this level (if available)
    const boarding = feeStructure.boardingSchool[level as keyof typeof feeStructure.boardingSchool];
    if (boarding) {
      doc.addPage();
      doc.setFontSize(18);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      addTextWithShadow('🏠 BOARDING SCHOOL FEES', 105, 25, { align: 'center' });
      doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.setLineWidth(4);
      doc.line(30, 30, 180, 30);
      let yPositionB = 45;
      // Level header
      drawRoundedRect(15, yPositionB, 180, 18, 6, secondaryColor);
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(13);
      doc.setFont('helvetica', 'bold');
      doc.text(boarding.title, 25, yPositionB + 12);
      if (boarding.subtitle) {
        doc.setFontSize(9);
        doc.setFont('helvetica', 'italic');
        doc.text(boarding.subtitle, 25, yPositionB + 25);
        yPositionB += 10;
      }
      // Fees table
      const tableY = yPositionB + 25;
      const tableHeight = (boarding.fees.length + 1) * 15 + 15;
      drawRoundedRect(15, tableY, 180, tableHeight, 6, [255, 255, 255]);
      doc.setDrawColor(200, 200, 200);
      doc.setLineWidth(1);
      doc.roundedRect(15, tableY, 180, tableHeight, 6, 6, 'S');
      drawRoundedRect(15, tableY, 180, 15, 6, secondaryColor);
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.text('Fee Type', 25, tableY + 10);
      doc.text('Amount', 120, tableY + 10);
      doc.text('Description', 150, tableY + 10);
      doc.setFont('helvetica', 'normal');
      boarding.fees.forEach((fee, feeIndex) => {
        const rowY = tableY + 15 + (feeIndex * 15);
        if (feeIndex % 2 === 0) {
          doc.setFillColor(248, 250, 252);
          doc.roundedRect(15, rowY, 180, 15, 0, 0, 'F');
        }
        doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
        doc.text(fee.name, 25, rowY + 10);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
        doc.text(fee.amount, 120, rowY + 10);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
        doc.text(fee.description || '', 150, rowY + 10);
      });
      // Total row
      const totalY = tableY + 15 + (boarding.fees.length * 15);
      doc.setFillColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
      doc.roundedRect(15, totalY, 180, 15, 6, 6, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.text('💰 TOTAL PER TERM:', 25, totalY + 10);
      doc.setFontSize(12);
      doc.text(boarding.total, 120, totalY + 10);
      yPositionB = totalY + 20;
      // Notes
      if (boarding.notes && boarding.notes.length > 0) {
        const notesY = yPositionB;
        const notesHeight = boarding.notes.length * 10 + 15;
        drawRoundedRect(15, notesY, 180, notesHeight, 6, [255, 248, 220]);
        doc.setDrawColor(warningColor[0], warningColor[1], warningColor[2]);
        doc.setLineWidth(2);
        doc.roundedRect(15, notesY, 180, notesHeight, 6, 6, 'S');
        doc.setTextColor(146, 64, 14);
        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        doc.text('📋 Program Notes:', 20, notesY + 10);
        doc.setFont('helvetica', 'normal');
        boarding.notes.forEach((note, noteIndex) => {
          doc.text(`• ${note}`, 20, notesY + 20 + (noteIndex * 10));
        });
        yPositionB = notesY + notesHeight + 15;
      }
    }
    // Payment Info (always included)
    const paymentY = (level === 'kindergarten') ? yPosition : 200;
    drawRoundedRect(15, paymentY, 180, 70, 8, [240, 249, 255]);
    doc.setDrawColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
    doc.setLineWidth(3);
    doc.roundedRect(15, paymentY, 180, 70, 8, 8, 'S');
    doc.setFontSize(13);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
    doc.text('💳 Payment Information', 25, paymentY + 15);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
    let paymentTextY = paymentY + 25;
    feeStructure.paymentInfo.terms.forEach((term, index) => {
      doc.text(`• ${term}`, 25, paymentTextY + (index * 7));
    });
    paymentTextY += feeStructure.paymentInfo.terms.length * 7 + 5;
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(accentColor[0], accentColor[1], accentColor[2]);
    doc.text('💰 Discounts:', 25, paymentTextY);
    doc.setFont('helvetica', 'normal');
    feeStructure.paymentInfo.discounts.forEach((discount, index) => {
      doc.text(`• ${discount}`, 25, paymentTextY + 10 + (index * 7));
    });
    // What's Included in Boarding
    const includeY = paymentY + 80;
    drawRoundedRect(15, includeY, 180, 60, 8, [236, 253, 245]);
    doc.setDrawColor(accentColor[0], accentColor[1], accentColor[2]);
    doc.setLineWidth(3);
    doc.roundedRect(15, includeY, 180, 60, 8, 8, 'S');
    doc.setFontSize(13);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(accentColor[0], accentColor[1], accentColor[2]);
    doc.text('🏠 Boarding Package Includes:', 25, includeY + 15);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
    feeStructure.boardingIncludes.forEach((item, index) => {
      doc.text(`✓ ${item}`, 25, includeY + 25 + (index * 7));
    });
    // Save the PDF for this level
    const fileName = `${feeStructure.schoolName.replace(/\s+/g, '_')}_Fee_Structure_${level}_${feeStructure.academicYear}.pdf`;
    doc.save(fileName);
    return;
  }

  // Page 1 - Header and Day School Fees
  // Header section with beautiful background
  drawRoundedRect(10, 10, 190, 50, 10, [255, 255, 255]);
  doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.setLineWidth(3);
  doc.roundedRect(10, 10, 190, 50, 10, 10, 'S');
  
  // School logo/icon
  doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.circle(25, 35, 12, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('A', 20, 40);
  
  // School name and title with beautiful typography
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  addTextWithShadow(feeStructure.schoolName, 105, 30, { align: 'center' });
  
  doc.setFontSize(14);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
  doc.text(`Fee Structure ${feeStructure.academicYear}`, 105, 40, { align: 'center' });
  
  // Contact information box with gradient effect
  drawRoundedRect(10, 70, 190, 30, 8, [248, 250, 252]);
  doc.setDrawColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
  doc.setLineWidth(2);
  doc.roundedRect(10, 70, 190, 30, 8, 8, 'S');
  
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
  doc.text('📞 Contact Information', 20, 80);
  
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
  doc.text(`Phone: ${feeStructure.contactInfo.phone}`, 20, 90);
  doc.text(`Email: ${feeStructure.contactInfo.email}`, 70, 90);
  doc.text(`Address: ${feeStructure.contactInfo.address}`, 120, 90);
  
  // Day School Fees Section with beautiful header
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  addTextWithShadow('🎓 DAY SCHOOL FEES', 105, 115, { align: 'center' });
  
  // Decorative line with gradient effect
  doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.setLineWidth(4);
  doc.line(30, 120, 180, 120);
  
  let yPosition = 135;
  
  Object.entries(feeStructure.daySchool).forEach(([key, level], index) => {
    // Level header box with alternating colors
    const headerHeight = 18;
    const isEven = index % 2 === 0;
    const headerColor = isEven ? primaryColor : secondaryColor;
    
    drawRoundedRect(15, yPosition, 180, headerHeight, 6, headerColor);
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(13);
    doc.setFont('helvetica', 'bold');
    doc.text(level.title, 25, yPosition + 12);
    
    if (level.subtitle) {
      doc.setFontSize(9);
      doc.setFont('helvetica', 'italic');
      doc.text(level.subtitle, 25, yPosition + 25);
      yPosition += 10;
    }
    
    // Fees table with beautiful styling
    const tableY = yPosition + 25;
    const tableHeight = (level.fees.length + 1) * 15 + 15;
    
    // Table background with subtle gradient
    drawRoundedRect(15, tableY, 180, tableHeight, 6, [255, 255, 255]);
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(1);
    doc.roundedRect(15, tableY, 180, tableHeight, 6, 6, 'S');
    
    // Table header with gradient
    drawRoundedRect(15, tableY, 180, 15, 6, headerColor);
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('Fee Type', 25, tableY + 10);
    doc.text('Amount', 120, tableY + 10);
    doc.text('Description', 150, tableY + 10);
    
    // Table rows with alternating colors
    doc.setFont('helvetica', 'normal');
    level.fees.forEach((fee, feeIndex) => {
      const rowY = tableY + 15 + (feeIndex * 15);
      const isEvenRow = feeIndex % 2 === 0;
      
      if (isEvenRow) {
        doc.setFillColor(248, 250, 252);
        doc.roundedRect(15, rowY, 180, 15, 0, 0, 'F');
      }
      
      doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
      doc.text(fee.name, 25, rowY + 10);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(headerColor[0], headerColor[1], headerColor[2]);
      doc.text(fee.amount, 120, rowY + 10);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
      doc.text(fee.description || '', 150, rowY + 10);
    });
    
    // Total row with emphasis
    const totalY = tableY + 15 + (level.fees.length * 15);
    doc.setFillColor(headerColor[0], headerColor[1], headerColor[2]);
    doc.roundedRect(15, totalY, 180, 15, 6, 6, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text('💰 TOTAL PER TERM:', 25, totalY + 10);
    doc.setFontSize(12);
    doc.text(level.total, 120, totalY + 10);
    
    yPosition = totalY + 20;
    
    // Notes section with beautiful styling
    if (level.notes && level.notes.length > 0) {
      const notesY = yPosition;
      const notesHeight = level.notes.length * 10 + 15;
      
      drawRoundedRect(15, notesY, 180, notesHeight, 6, [255, 248, 220]);
      doc.setDrawColor(warningColor[0], warningColor[1], warningColor[2]);
      doc.setLineWidth(2);
      doc.roundedRect(15, notesY, 180, notesHeight, 6, 6, 'S');
      
      doc.setTextColor(146, 64, 14);
      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.text('📋 Program Notes:', 20, notesY + 10);
      
      doc.setFont('helvetica', 'normal');
      level.notes.forEach((note, noteIndex) => {
        doc.text(`• ${note}`, 20, notesY + 20 + (noteIndex * 10));
      });
      
      yPosition = notesY + notesHeight + 15;
    }
  });
  
  // Page 2 - Boarding School Fees
  doc.addPage();
  
  // Header with beautiful styling
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  addTextWithShadow('🏠 BOARDING SCHOOL FEES', 105, 25, { align: 'center' });
  
  // Decorative line
  doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.setLineWidth(4);
  doc.line(30, 30, 180, 30);
  
  yPosition = 45;
  
  Object.entries(feeStructure.boardingSchool).forEach(([key, level], index) => {
    // Level header box
    const headerHeight = 18;
    const isEven = index % 2 === 0;
    const headerColor = isEven ? primaryColor : secondaryColor;
    
    drawRoundedRect(15, yPosition, 180, headerHeight, 6, headerColor);
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(13);
    doc.setFont('helvetica', 'bold');
    doc.text(level.title, 25, yPosition + 12);
    
    if (level.subtitle) {
      doc.setFontSize(9);
      doc.setFont('helvetica', 'italic');
      doc.text(level.subtitle, 25, yPosition + 25);
      yPosition += 10;
    }
    
    // Fees table
    const tableY = yPosition + 25;
    const tableHeight = (level.fees.length + 1) * 15 + 15;
    
    drawRoundedRect(15, tableY, 180, tableHeight, 6, [255, 255, 255]);
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(1);
    doc.roundedRect(15, tableY, 180, tableHeight, 6, 6, 'S');
    
    // Table header
    drawRoundedRect(15, tableY, 180, 15, 6, headerColor);
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('Fee Type', 25, tableY + 10);
    doc.text('Amount', 120, tableY + 10);
    doc.text('Description', 150, tableY + 10);
    
    // Table rows
    doc.setFont('helvetica', 'normal');
    level.fees.forEach((fee, feeIndex) => {
      const rowY = tableY + 15 + (feeIndex * 15);
      const isEvenRow = feeIndex % 2 === 0;
      
      if (isEvenRow) {
        doc.setFillColor(248, 250, 252);
        doc.roundedRect(15, rowY, 180, 15, 0, 0, 'F');
      }
      
      doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
      doc.text(fee.name, 25, rowY + 10);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(headerColor[0], headerColor[1], headerColor[2]);
      doc.text(fee.amount, 120, rowY + 10);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
      doc.text(fee.description || '', 150, rowY + 10);
    });
    
    // Total row
    const totalY = tableY + 15 + (level.fees.length * 15);
    doc.setFillColor(headerColor[0], headerColor[1], headerColor[2]);
    doc.roundedRect(15, totalY, 180, 15, 6, 6, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text('💰 TOTAL PER TERM:', 25, totalY + 10);
    doc.setFontSize(12);
    doc.text(level.total, 120, totalY + 10);
    
    yPosition = totalY + 20;
    
    // Notes section
    if (level.notes && level.notes.length > 0) {
      const notesY = yPosition;
      const notesHeight = level.notes.length * 10 + 15;
      
      drawRoundedRect(15, notesY, 180, notesHeight, 6, [255, 248, 220]);
      doc.setDrawColor(warningColor[0], warningColor[1], warningColor[2]);
      doc.setLineWidth(2);
      doc.roundedRect(15, notesY, 180, notesHeight, 6, 6, 'S');
      
      doc.setTextColor(146, 64, 14);
      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.text('📋 Program Notes:', 20, notesY + 10);
      
      doc.setFont('helvetica', 'normal');
      level.notes.forEach((note, noteIndex) => {
        doc.text(`• ${note}`, 20, notesY + 20 + (noteIndex * 10));
      });
      
      yPosition = notesY + notesHeight + 15;
    }
  });
  
  // Payment Information Section with beautiful styling
  const paymentY = yPosition + 10;
  drawRoundedRect(15, paymentY, 180, 70, 8, [240, 249, 255]);
  doc.setDrawColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
  doc.setLineWidth(3);
  doc.roundedRect(15, paymentY, 180, 70, 8, 8, 'S');
  
  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
  doc.text('💳 Payment Information', 25, paymentY + 15);
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
  
  let paymentTextY = paymentY + 25;
  feeStructure.paymentInfo.terms.forEach((term, index) => {
    doc.text(`• ${term}`, 25, paymentTextY + (index * 7));
  });
  
  paymentTextY += feeStructure.paymentInfo.terms.length * 7 + 5;
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(accentColor[0], accentColor[1], accentColor[2]);
  doc.text('💰 Discounts:', 25, paymentTextY);
  
  doc.setFont('helvetica', 'normal');
  feeStructure.paymentInfo.discounts.forEach((discount, index) => {
    doc.text(`• ${discount}`, 25, paymentTextY + 10 + (index * 7));
  });
  
  // What's Included in Boarding
  const includeY = paymentY + 80;
  drawRoundedRect(15, includeY, 180, 60, 8, [236, 253, 245]);
  doc.setDrawColor(accentColor[0], accentColor[1], accentColor[2]);
  doc.setLineWidth(3);
  doc.roundedRect(15, includeY, 180, 60, 8, 8, 'S');
  
  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(accentColor[0], accentColor[1], accentColor[2]);
  doc.text('🏠 Boarding Package Includes:', 25, includeY + 15);
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
  feeStructure.boardingIncludes.forEach((item, index) => {
    doc.text(`✓ ${item}`, 25, includeY + 25 + (index * 7));
  });
  
  // Page 3 - Additional Information
  doc.addPage();
  
  // Header
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  addTextWithShadow('📚 ADDITIONAL INFORMATION', 105, 25, { align: 'center' });
  
  // Decorative line
  doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.setLineWidth(4);
  doc.line(30, 30, 180, 30);
  
  // Scholarships Section
  const scholarshipY = 45;
  drawRoundedRect(15, scholarshipY, 180, 50, 8, [255, 243, 205]);
  doc.setDrawColor(warningColor[0], warningColor[1], warningColor[2]);
  doc.setLineWidth(3);
  doc.roundedRect(15, scholarshipY, 180, 50, 8, 8, 'S');
  
  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(146, 64, 14);
  doc.text('🎓 Scholarships and Financial Aid:', 25, scholarshipY + 15);
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
  feeStructure.scholarships.forEach((scholarship, index) => {
    doc.text(`• ${scholarship}`, 25, scholarshipY + 25 + (index * 7));
  });
  
  // Important Dates Section
  const datesY = scholarshipY + 60;
  drawRoundedRect(15, datesY, 180, 45, 8, [254, 226, 226]);
  doc.setDrawColor(239, 68, 68);
  doc.setLineWidth(3);
  doc.roundedRect(15, datesY, 180, 45, 8, 8, 'S');
  
  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(153, 27, 27);
  doc.text('📅 Important Dates 2025:', 25, datesY + 15);
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
  Object.entries(feeStructure.importantDates).forEach(([date, value], index) => {
    doc.text(`• ${date}: ${value}`, 25, datesY + 25 + (index * 7));
  });
  
  // Required Documents Section
  const reqY = datesY + 55;
  drawRoundedRect(15, reqY, 180, 55, 8, [237, 242, 247]);
  doc.setDrawColor(100, 116, 139);
  doc.setLineWidth(3);
  doc.roundedRect(15, reqY, 180, 55, 8, 8, 'S');
  
  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(51, 65, 85);
  doc.text('📋 Required Documents:', 25, reqY + 15);
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
  feeStructure.requiredDocuments.forEach((document, index) => {
    doc.text(`• ${document}`, 25, reqY + 25 + (index * 7));
  });
  
  // Contact Information Section
  const contactY = reqY + 65;
  drawRoundedRect(15, contactY, 180, 40, 8, [219, 234, 254]);
  doc.setDrawColor(59, 130, 246);
  doc.setLineWidth(3);
  doc.roundedRect(15, contactY, 180, 40, 8, 8, 'S');
  
  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(30, 58, 138);
  doc.text('📞 For More Information:', 25, contactY + 15);
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
  doc.text(`🌐 Visit our website: ${feeStructure.contactInfo.website}`, 25, contactY + 25);
  doc.text(`📧 Email: ${feeStructure.contactInfo.email}`, 25, contactY + 32);
  doc.text(`📱 Phone: ${feeStructure.contactInfo.phone}`, 25, contactY + 39);
  
  // Beautiful footer with decorative elements
  const footerY = 270;
  drawRoundedRect(10, footerY, 190, 20, 10, [255, 255, 255]);
  doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.setLineWidth(2);
  doc.roundedRect(10, footerY, 190, 20, 10, 10, 'S');
  
  // Decorative elements
  doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.circle(25, footerY + 10, 4, 'F');
  doc.circle(185, footerY + 10, 4, 'F');
  
  doc.setFontSize(9);
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
  if (feeStructure.additionalInfo && feeStructure.additionalInfo.length > 0) {
    feeStructure.additionalInfo.forEach((info, index) => {
      doc.text(info, 105, footerY + 8 - (index * 5), { align: 'center' });
    });
  }
  
  // Save the PDF with a beautiful filename
  const fileName = `${feeStructure.schoolName.replace(/\s+/g, '_')}_Fee_Structure_${feeStructure.academicYear}.pdf`;
  doc.save(fileName);
}; 
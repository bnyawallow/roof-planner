import { getImage } from "../lib/images";
import React from 'react';
import { MessageSquare, FileText, Building2, Hammer, ArrowRight } from 'lucide-react';
import { RoofingProfile, ColorOption, FinishOption } from '../constants';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface SummaryProps {
  profile: RoofingProfile;
  color: ColorOption;
  finish: FinishOption;
  data: {
    sqm: number;
    estimatedSheets: number;
    thickness: string;
    sheetLength: string;
    length: string;
    width: string;
  };
}

export const Summary: React.FC<SummaryProps> = React.memo(({ profile, color, finish, data }) => {
  const generatePDF = async () => {
    const doc = new jsPDF();
    const timestamp = new Date().toLocaleString();

    // Load custom fonts (Inter and Work Sans) if possible, with standard fallback
    let hasInter = false;
    let hasWorkSansBold = false;
    let hasWorkSansRegular = false;

    // Helper to convert array buffer to base64 safely
    const arrayBufferToBase64 = (buffer: ArrayBuffer): string => {
      let binary = '';
      const bytes = new Uint8Array(buffer);
      const len = bytes.byteLength;
      for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      return btoa(binary);
    };

    try {
      const interRes = await fetch('https://cdn.jsdelivr.net/npm/@fontsource/inter/files/inter-latin-400-normal.ttf');
      if (interRes.ok) {
        const interBuffer = await interRes.arrayBuffer();
        const interBase64 = arrayBufferToBase64(interBuffer);
        doc.addFileToVFS('Inter-Regular.ttf', interBase64);
        doc.addFont('Inter-Regular.ttf', 'Inter', 'normal');
        hasInter = true;
      }
    } catch (e) {
      console.warn("Failed to load Inter font for PDF", e);
    }

    try {
      const wsRes = await fetch('https://cdn.jsdelivr.net/npm/@fontsource/work-sans/files/work-sans-latin-700-normal.ttf');
      if (wsRes.ok) {
        const wsBuffer = await wsRes.arrayBuffer();
        const wsBase64 = arrayBufferToBase64(wsBuffer);
        doc.addFileToVFS('WorkSans-Bold.ttf', wsBase64);
        doc.addFont('WorkSans-Bold.ttf', 'Work Sans', 'bold');
        hasWorkSansBold = true;
      }
    } catch (e) {
      console.warn("Failed to load Work Sans Bold font for PDF", e);
    }

    try {
      const wsRegRes = await fetch('https://cdn.jsdelivr.net/npm/@fontsource/work-sans/files/work-sans-latin-400-normal.ttf');
      if (wsRegRes.ok) {
        const wsRegBuffer = await wsRegRes.arrayBuffer();
        const wsRegBase64 = arrayBufferToBase64(wsRegBuffer);
        doc.addFileToVFS('WorkSans-Regular.ttf', wsRegBase64);
        doc.addFont('WorkSans-Regular.ttf', 'Work Sans', 'normal');
        hasWorkSansRegular = true;
      }
    } catch (e) {
      console.warn("Failed to load Work Sans Regular font for PDF", e);
    }

    const setPDFFont = (family: 'sans' | 'headline', style: 'normal' | 'bold') => {
      if (family === 'headline' && style === 'bold' && hasWorkSansBold) {
        doc.setFont('Work Sans', 'bold');
      } else if (family === 'headline' && style === 'normal' && hasWorkSansRegular) {
        doc.setFont('Work Sans', 'normal');
      } else if (family === 'sans' && style === 'normal' && hasInter) {
        doc.setFont('Inter', 'normal');
      } else {
        doc.setFont('helvetica', style);
      }
    };

    // Helper to load image
    const loadImage = (url: string): Promise<string> => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'Anonymous';
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0);
          resolve(canvas.toDataURL('image/png'));
        };
        img.onerror = reject;
        img.src = url;
      });
    };

    // 1. BRAND BARS (Top Accent)
    doc.setFillColor(18, 26, 52); // Pinnacle Brand Navy
    doc.rect(0, 0, 210, 8, 'F');
    doc.setFillColor(254, 106, 52); // Pinnacle Brand Orange
    doc.rect(0, 8, 210, 2.5, 'F');

    // 2. HEADER - LOGO & BRAND INFO
    try {
      const logoData = await loadImage('/images/logo.png');
      doc.addImage(logoData, 'PNG', 14, 15, 34, 12);
    } catch (e) {
      console.error("Failed to load logo for PDF", e);
      // Fallback elegant brand text
      setPDFFont('headline', 'bold');
      doc.setFontSize(16);
      doc.setTextColor(18, 26, 52);
      doc.text('PINNACLE BUILDERS', 14, 24);
      doc.setFillColor(254, 106, 52);
      doc.rect(14, 26, 30, 1, 'F');
    }

    // Interactive Contacts Section (Left)
    setPDFFont('sans', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(69, 70, 77);
    doc.text('HQ Office: Industrial Area, Nairobi, Kenya', 14, 34);

    // Clickable Phone
    setPDFFont('sans', 'bold');
    doc.setTextColor(254, 106, 52); // Brand Orange
    doc.text('Tel: +254 116 893 804', 14, 39);
    doc.link(14, 36, 35, 4, { url: 'tel:+254116893804' });

    // Clickable Email
    doc.text('Email: sales@pinnacleroofing.co.ke', 14, 44);
    doc.link(14, 41, 54, 4, { url: 'mailto:sales@pinnacleroofing.co.ke' });

    // Clickable Website Link
    setPDFFont('sans', 'bold');
    doc.setTextColor(18, 26, 52); // Brand Navy
    doc.text('Visit: pinnacleroofing.co.ke', 14, 49);
    doc.link(14, 46, 42, 4, { url: 'https://pinnacleroofing.co.ke' });

    // 3. HEADER RIGHT - INVOICE/REPORT SPECIFICS
    setPDFFont('headline', 'bold');
    doc.setFontSize(16);
    doc.setTextColor(18, 26, 52);
    doc.text('MATERIALS ESTIMATE', 196, 22, { align: 'right' });

    const reportId = `PIN-EST-${Math.floor(100000 + Math.random() * 900000)}`;
    setPDFFont('sans', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(120);
    doc.text(`Reference ID: ${reportId}`, 196, 27, { align: 'right' });
    doc.text(`Generated At: ${timestamp}`, 196, 32, { align: 'right' });
    doc.text('Status: Professional Requisition', 196, 37, { align: 'right' });

    // Thin elegant divider line below header
    doc.setDrawColor(220, 225, 235);
    doc.line(14, 53, 196, 53);

    // 4. METADATA KPI CARDS (Interactive blocks)
    // Three Cards across 182mm available width. Each card is 56mm width, separated by 7mm.
    const cardY = 57;
    const cardH = 22;
    const cardW = 56;
    
    // Card 1: TOTAL SURFACE AREA
    doc.setFillColor(243, 246, 252);
    doc.roundedRect(14, cardY, cardW, cardH, 2, 2, 'F');
    setPDFFont('sans', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(110);
    doc.text('ESTIMATED SURFACE AREA', 18, cardY + 6);
    setPDFFont('headline', 'bold');
    doc.setFontSize(15);
    doc.setTextColor(18, 26, 52);
    doc.text(`${data.sqm.toFixed(1)} SQM`, 18, cardY + 15);

    // Card 2: ROOFING SHEETS
    doc.setFillColor(243, 246, 252);
    doc.roundedRect(14 + cardW + 7, cardY, cardW, cardH, 2, 2, 'F');
    setPDFFont('sans', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(110);
    doc.text('TOTAL ROOFING SHEETS', 14 + cardW + 11, cardY + 6);
    setPDFFont('headline', 'bold');
    doc.setFontSize(15);
    doc.setTextColor(254, 106, 52); // High attention orange
    doc.text(`${data.estimatedSheets} Pcs`, 14 + cardW + 11, cardY + 15);

    // Card 3: COMPATIBLE NAILS/SCREWS
    doc.setFillColor(243, 246, 252);
    doc.roundedRect(14 + (cardW * 2) + 14, cardY, cardW, cardH, 2, 2, 'F');
    setPDFFont('sans', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(110);
    doc.text('CORROSION-GUARD HARDWARE', 14 + (cardW * 2) + 18, cardY + 6);
    setPDFFont('headline', 'bold');
    doc.setFontSize(15);
    doc.setTextColor(18, 26, 52);
    doc.text(`${(data.estimatedSheets * 12).toLocaleString()} Pcs`, 14 + (cardW * 2) + 18, cardY + 15);

    // 5. SECTION 1: ARCHITECTURAL SPECIFICATIONS TABLE
    doc.setFillColor(18, 26, 52);
    doc.rect(14, 86, 3, 5, 'F');
    setPDFFont('headline', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(18, 26, 52);
    doc.text('1. INTEGRATED TECHNICAL SPECIFICATIONS', 20, 90);

    const bodyRows = [
      ['Roofing Profile Style', `${profile.title} (Authentic Pinnacle Standard)`],
      ['African Solar Protective Color Swatch', color.name],
      ['Dynamic Finish / Polish Treatment', finish.name],
      ['Roof Architectural Shape', `${data.shape ? data.shape.charAt(0).toUpperCase() + data.shape.slice(1) : 'Gable'}`],
    ];
    if (data.shape === 'hip') {
      bodyRows.push(['Hip Structural Runs (Side x End)', `${data.sideRun?.toFixed(2)}m (Side) x ${data.endRun?.toFixed(2)}m (End)`]);
    }
    bodyRows.push(
      ['Base Footprint Dimensions', `${data.length} Meters (L) x ${data.width} Meters (W)`],
      ['Pitch Angle & Overhang', `${data.pitch ? data.pitch + '°' : '30°'} Pitch | ${data.overhang ? data.overhang.toFixed(1) : '0.6'}m Overhang`],
      ['Engineered Material Thickness (Gauge)', `Gauge ${data.thickness}`],
      ['Custom Custom Cut Sheet Length', `${data.sheetLength}`]
    );

    autoTable(doc, {
      startY: 93,
      margin: { bottom: 25, top: 20, left: 14, right: 14 },
      head: [['Architectural Specification Code', 'Pinnacle Professional Selection']],
      body: bodyRows,
      theme: 'striped',
      headStyles: { 
        fillColor: [18, 26, 52], 
        textColor: 255, 
        fontStyle: 'bold', 
        fontSize: 8.5,
        font: hasWorkSansBold ? 'Work Sans' : 'helvetica'
      },
      styles: { 
        cellPadding: 4, 
        fontSize: 8, 
        font: hasInter ? 'Inter' : 'helvetica' 
      },
      columnStyles: { 0: { fontStyle: 'bold', cellWidth: 70 }, 1: { cellWidth: 112 } }
    });

    // 6. SECTION 2: COST ESTIMATE TABLE
    const finalTable1Y = (doc as any).lastAutoTable.finalY + 8;
    
    doc.setFillColor(18, 26, 52);
    doc.rect(14, finalTable1Y, 3, 5, 'F');
    setPDFFont('headline', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(18, 26, 52);
    doc.text('2. SPECIFIED BILL OF MATERIALS & COMMODITY PRICES', 20, finalTable1Y + 4);

    const fixingsCost = data.estimatedSheets * 12 * 8.5;
    const sheetsCost = data.sqm * 1250;
    const totalCost = sheetsCost + fixingsCost;

    autoTable(doc, {
      startY: finalTable1Y + 7,
      margin: { bottom: 25, top: 20, left: 14, right: 14 },
      head: [['Product Code / Item description', 'Technical Configuration', 'Unit Rate KES', 'Net Total KES']],
      body: [
        [
          `Pinnacle Premium ${profile.title} Sheets`, 
          `Gauge ${data.thickness} | Multi-Clad ${finish.name} Finish | Color Coated: ${color.name}`, 
          'KES 1,250 / SQM', 
          sheetsCost.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0})
        ],
        [
          'Weather-Guard Corrosive Resistant Screws', 
          '65mm self-drilling metal attachment screws with EPDM sealing washer', 
          'KES 8.5 / Pcs', 
          fixingsCost.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0})
        ],
      ],
      foot: [
        ['ESTIMATED TOTAL CONVEYED REQUISITION', '', 'GRAND KES TOTAL', totalCost.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0})]
      ],
      theme: 'grid',
      headStyles: { 
        fillColor: [18, 26, 52], 
        textColor: 255, 
        fontStyle: 'bold', 
        fontSize: 8.5,
        font: hasWorkSansBold ? 'Work Sans' : 'helvetica'
      },
      footStyles: { 
        fillColor: [254, 106, 52], 
        textColor: 255, 
        fontStyle: 'bold', 
        fontSize: 9,
        font: hasWorkSansBold ? 'Work Sans' : 'helvetica'
      },
      styles: { 
        cellPadding: 4.5, 
        fontSize: 8, 
        font: hasInter ? 'Inter' : 'helvetica' 
      },
      columnStyles: { 0: { fontStyle: 'bold' } }
    });

    // 7. MULTI-LAYER CAPTIVATING DESIGN PIECE (Technical Advisory Notice & Call to action)
    const finalTable2Y = (doc as any).lastAutoTable.finalY + 8;

    let targetY = finalTable2Y;
    // We need 22mm for Warrant Shield + 5mm gap + 28mm for CTA Banner + 5mm page buffer = 60mm.
    // The footer line is drawn at Y = 280, so we must complete rendering above 275.
    if (finalTable2Y + 60 > 275) {
      doc.addPage();
      targetY = 20; // Start at elegant top margin on new page
    }

    // Technical Warrant Shield
    doc.setFillColor(255, 249, 246); // Tender light orange/cream bg
    doc.setDrawColor(254, 106, 52, 0.4); // Subtle Orange Border style
    doc.roundedRect(14, targetY, 182, 22, 1.5, 1.5, 'FD');

    setPDFFont('headline', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(254, 106, 52);
    doc.text('PINNACLE 15-YEAR GUARANTEE & STRUCTURAL INTEGRITY', 18, targetY + 5);

    setPDFFont('sans', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(80);
    // Multi line wrapping of message text
    const warrantyText = "These high-durability roofing estimates are covered by our certified 15-Year Multi-Clad UV Anti-Fade guarantee when combined with authentic Pinnacle Weather-Guard self-drilling fasteners. We strongly request a site validation before loading physical roof frame timber boards.";
    doc.text(doc.splitTextToSize(warrantyText, 174), 18, targetY + 11);

    // Interactive CTA Consulting Banner
    const bannerY = targetY + 27;
    doc.setFillColor(18, 26, 52); // Brand Navy Block
    doc.roundedRect(14, bannerY, 182, 28, 1.5, 1.5, 'F');

    // Right-hand side Whatsapp button indicator box inside banner
    doc.setFillColor(254, 106, 52); // Bright Brand Orange
    doc.roundedRect(138, bannerY + 6, 52, 16, 1, 1, 'F');

    setPDFFont('sans', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(255);
    doc.text('TALK TO INTEGRATION LEAD', 142, bannerY + 15);
    
    // Set WhatsApp URL Link directly on top of the orange button
    doc.link(138, bannerY + 6, 52, 16, { url: 'https://wa.me/254116893804' });

    // Left block of banner text
    setPDFFont('headline', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(254, 106, 52); // Orange title
    doc.text('READY TO SECURE ARCHITECTURAL QUALITY?', 18, bannerY + 8);
    
    setPDFFont('sans', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(255);
    doc.text('Confirm dynamic project details, order raw sheet colors, and plan certified onsite', 18, bannerY + 14);
    doc.text('dimensional validations with our structural tech engineers instantly.', 18, bannerY + 19);

    // 8. PAGE FOOTER SYSTEM (Dynamic Page numbering & Standards)
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      
      doc.setDrawColor(220, 225, 235);
      doc.line(14, 280, 196, 280);

      setPDFFont('headline', 'bold');
      doc.setFontSize(7.5);
      doc.setTextColor(18, 26, 52);
      doc.text('PINNACLE BUILDERS • Premium Steel Standard', 14, 286);
      
      setPDFFont('sans', 'normal');
      doc.setFontSize(7.5);
      doc.text('Site Inspections • Multi-Clad Coating • Kenyan KEBS Standard', 14, 290);
      
      doc.text(`Page ${i} of ${pageCount}`, 196, 286, { align: 'right' });
    }

    doc.save(`Pinnacle_Estimate_${profile.title.replace(/\s+/g, '_')}.pdf`);
  };

  return (
    <div className="pt-12 pb-32 px-6 max-w-screen-2xl mx-auto min-h-screen">
      <header className="mb-12">
        <h1 className="font-headline font-black text-4xl md:text-5xl tracking-[-0.02em] text-primary-container mb-4">Estimate Summary</h1>
        <p className="text-on-surface-variant max-w-2xl font-sans text-lg">Your roofing project precision-calculated based on architectural specifications for lasting durability.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-8 flex flex-col gap-6">
          <div className="bg-surface-container-lowest rounded-xl p-8 shadow-ambient relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-secondary-container/5 rounded-bl-full"></div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              <div className="flex flex-col">
                <div className="text-on-surface-variant mb-2">Total Area</div>
                <div className="flex items-baseline gap-1">
                  <span className="font-headline font-black text-4xl text-primary-container tracking-[-0.02em]">{data.sqm.toFixed(1)}</span>
                  <span className="font-headline font-bold text-xl text-on-surface-variant/50">SQM</span>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="text-on-surface-variant mb-2">Roofing Sheets</div>
                <div className="flex items-baseline gap-1">
                  <span className="font-headline font-black text-4xl text-secondary-container tracking-[-0.02em]">{data.estimatedSheets}</span>
                  <span className="text-xs font-bold text-on-surface-variant/50 uppercase">PCS</span>
                </div>
                <span className="text-[10px] text-on-surface-variant mt-1 font-medium italic font-sans">Calculated: {data.sheetLength} Length / 0.8 Effective Cover</span>
              </div>
              <div className="flex flex-col">
                <div className="text-on-surface-variant mb-2">Est. Nails/Fixings</div>
                <div className="flex items-baseline gap-1">
                  <span className="font-headline font-black text-4xl text-primary-container tracking-[-0.02em]">{(data.estimatedSheets * 12).toLocaleString()}</span>
                  <span className="text-xs font-bold text-on-surface-variant/50 uppercase">Units</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-surface-container-low rounded-xl p-8">
            <div className="flex justify-between items-end mb-8">
              <h2 className="font-headline font-extrabold text-2xl tracking-[-0.02em]">Technical Breakdown</h2>
              <div className="text-secondary-container bg-surface-container-highest px-2 py-1 rounded-sm">Architectural Grade</div>
            </div>
            <div className="space-y-6">
              <div className="flex justify-between items-center bg-surface-container-lowest p-6 rounded-sm transition-all hover:translate-x-1 shadow-ambient">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary-container rounded-sm flex items-center justify-center text-white">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-headline font-bold text-primary-container tracking-[-0.02em]">Pinnacle {profile.title}</h4>
                    <p className="text-on-surface-variant text-sm font-sans flex flex-wrap items-center gap-2">
                      <span>Gauge {data.thickness} | {finish.name} | </span>
                      <span className="inline-flex items-center gap-1.5 font-bold text-primary-container bg-surface-container-high px-2 py-0.5 rounded-sm">
                        <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: color.hex }}></span>
                        {color.name}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="block font-headline font-bold text-lg text-primary-container tracking-[-0.02em]">KES 1,250</span>
                  <div className="text-on-surface-variant/50">Per SQM</div>
                </div>
              </div>

              <div className="flex justify-between items-center bg-surface-container-lowest p-6 rounded-sm transition-all hover:translate-x-1 shadow-ambient">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-surface-container-low rounded-sm flex items-center justify-center text-primary-container">
                    <Hammer className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-headline font-bold text-primary-container tracking-[-0.02em]">Self-Drilling Screws</h4>
                    <p className="text-on-surface-variant text-sm font-sans">65mm | Weather Guard Coating</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="block font-headline font-bold text-lg text-primary-container tracking-[-0.02em]">KES 8,550</span>
                  <div className="text-on-surface-variant/50">Estimated Total</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-4 flex flex-col gap-6">
          <div className="hero-gradient text-white p-8 rounded-xl relative overflow-hidden flex flex-col h-full shadow-ambient">
            <div className="relative z-10">
              <div className="text-white/60 mb-6 block">Direct Assistance</div>
              <h3 className="font-headline font-black text-3xl tracking-[-0.02em] mb-4">Consult with our Technical Lead</h3>
              <p className="text-white/80 mb-8 leading-relaxed font-sans">Book a comprehensive <strong>site assessment</strong> and ensure <strong>professional installation</strong> by speaking directly with our technical lead.</p>
              <a 
                href="https://wa.me/254116893804" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-whatsapp-green w-full py-4 rounded-md flex items-center justify-center gap-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:bg-[#20bd5a] active:scale-95 shadow-ambient group">
                <MessageSquare className="w-6 h-6 fill-current group-hover:scale-110 transition-transform" />
                <span className="font-bold text-sm font-sans">FREE CONSULT</span>
              </a>
            </div>
            <div className="mt-auto pt-12">
              <div className="border-l-4 border-secondary-container pl-6">
                <div className="text-white/60">Nairobi HQ</div>
                <div className="not-italic text-sm text-white space-y-1 mt-2 font-sans">
                  <p className="font-bold">Industrial Area</p>
                  <p>sales@pinnacleroofing.co.ke</p>
                  <p className="text-secondary-container font-black text-lg pt-1">+254 116 893 804</p>
                </div>
              </div>
            </div>
          </div>

          <button 
            onClick={generatePDF}
            className="w-full bg-secondary-container text-white p-5 rounded-xl flex items-center justify-center gap-3 group cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:bg-[#ff7b4b] active:scale-95 shadow-ambient font-bold"
          >
            <FileText className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="font-headline tracking-[-0.01em] text-sm md:text-base">Download Estimate</span>
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </div>
  );
});
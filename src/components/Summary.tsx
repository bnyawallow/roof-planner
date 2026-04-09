import React from 'react';
import { MessageSquare, FileText, Building2, Hammer, ArrowRight } from 'lucide-react';
import { RoofingProfile } from '../constants';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface SummaryProps {
  profile: RoofingProfile;
  data: {
    sqm: number;
    estimatedSheets: number;
    thickness: string;
    sheetLength: string;
    length: string;
    width: string;
  };
}

export const Summary: React.FC<SummaryProps> = ({ profile, data }) => {
  const generatePDF = async () => {
    const doc = new jsPDF();
    const timestamp = new Date().toLocaleString();

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

    try {
      const logoData = await loadImage('/logo.png');
      // Add logo at top left
      doc.addImage(logoData, 'PNG', 14, 15, 40, 15);
    } catch (e) {
      console.error("Failed to load logo for PDF", e);
      // Fallback text if logo fails
      doc.setFontSize(20);
      doc.setTextColor(18, 26, 52);
      doc.text('PINNACLE ROOFING', 14, 25);
    }

    // Header Right
    doc.setFontSize(24);
    doc.setTextColor(18, 26, 52); // Pinnacle Navy
    doc.text('ESTIMATE REPORT', 196, 22, { align: 'right' });
    
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Generated: ${timestamp}`, 196, 28, { align: 'right' });

    // Contact Info
    doc.setFontSize(10);
    doc.setTextColor(69, 70, 77);
    doc.text('Pinnacle Roofing Systems', 14, 40);
    doc.text('Industrial Area, Nairobi, Kenya', 14, 45);
    doc.text('+254 116 893 804', 14, 50);
    doc.text('sales@pinnacleroofing.co.ke', 14, 55);

    // Project Details Section
    doc.setFontSize(14);
    doc.setTextColor(18, 26, 52);
    doc.text('PROJECT SPECIFICATIONS', 14, 70);
    
    autoTable(doc, {
      startY: 75,
      head: [['Specification', 'Selection']],
      body: [
        ['Roofing Profile', profile.title],
        ['Base Dimensions', `${data.length}M (Length) x ${data.width}M (Width)`],
        ['Material Thickness', data.thickness],
        ['Sheet Length', data.sheetLength],
        ['Total Surface Area', `${data.sqm.toFixed(1)} SQM`],
        ['Estimated Sheets', `${data.estimatedSheets} Units`],
        ['Estimated Fixings', `${(data.estimatedSheets * 12).toLocaleString()} Units`],
      ],
      theme: 'grid',
      headStyles: { fillColor: [18, 26, 52], textColor: 255, fontStyle: 'bold' },
      alternateRowStyles: { fillColor: [248, 249, 255] },
      styles: { cellPadding: 6, fontSize: 10 },
    });

    // Cost Breakdown Section
    const finalY = (doc as any).lastAutoTable.finalY;
    
    doc.setFontSize(14);
    doc.setTextColor(18, 26, 52);
    doc.text('TECHNICAL BREAKDOWN', 14, finalY + 15);

    const fixingsCost = data.estimatedSheets * 12 * 8.5;
    const sheetsCost = data.sqm * 1250;
    const totalCost = sheetsCost + fixingsCost;

    autoTable(doc, {
      startY: finalY + 20,
      head: [['Item', 'Description', 'Unit Price', 'Total']],
      body: [
        [`Pinnacle ${profile.title}`, `Gauge ${data.thickness} | Matte Finish`, 'KES 1,250 / SQM', `KES ${sheetsCost.toLocaleString(undefined, {maximumFractionDigits: 0})}`],
        ['Self-Drilling Screws', '65mm | Weather Guard Coating', 'KES 8.5 / Unit', `KES ${fixingsCost.toLocaleString(undefined, {maximumFractionDigits: 0})}`],
      ],
      foot: [
        ['', '', 'Estimated Total', `KES ${totalCost.toLocaleString(undefined, {maximumFractionDigits: 0})}`]
      ],
      theme: 'grid',
      headStyles: { fillColor: [18, 26, 52], textColor: 255, fontStyle: 'bold' },
      footStyles: { fillColor: [254, 106, 52], textColor: 255, fontStyle: 'bold' },
      alternateRowStyles: { fillColor: [248, 249, 255] },
      styles: { cellPadding: 6, fontSize: 10 },
    });

    // Footer in PDF
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      
      // Draw a line
      doc.setDrawColor(200);
      doc.line(14, 280, 196, 280);

      doc.setFontSize(8);
      doc.setTextColor(150);
      doc.text('Pinnacle Roofing Systems | The Standard of Steel', 14, 287);
      doc.text(`Page ${i} of ${pageCount}`, 196, 287, { align: 'right' });
    }

    doc.save(`Pinnacle_Estimate_${profile.title.replace(/\s+/g, '_')}.pdf`);
  };

  return (
    <div className="pt-28 pb-32 px-6 max-w-screen-2xl mx-auto min-h-screen">
      <header className="mb-12">
        <h1 className="font-headline font-black text-5xl md:text-6xl tracking-[-0.02em] text-primary-container mb-4">Estimate Summary</h1>
        <p className="text-on-surface-variant max-w-2xl font-sans text-lg">Your roofing project precision-calculated based on architectural specifications for lasting durability.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-8 flex flex-col gap-6">
          <div className="bg-surface-container-lowest rounded-xl p-8 shadow-ambient relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-secondary-container/5 rounded-bl-full"></div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              <div className="flex flex-col">
                <span className="tech-label text-on-surface-variant mb-2">Total Area</span>
                <div className="flex items-baseline gap-1">
                  <span className="font-headline font-black text-4xl text-primary-container tracking-[-0.02em]">{data.sqm.toFixed(1)}</span>
                  <span className="font-headline font-bold text-xl text-on-surface-variant/50">SQM</span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="tech-label text-on-surface-variant mb-2">Roofing Sheets</span>
                <div className="flex items-baseline gap-1">
                  <span className="font-headline font-black text-4xl text-secondary-container tracking-[-0.02em]">{data.estimatedSheets}</span>
                  <span className="text-xs font-bold text-on-surface-variant/50 uppercase">PCS</span>
                </div>
                <span className="text-[10px] text-on-surface-variant mt-1 font-medium italic font-sans">Calculated: {data.sheetLength} Length / 0.8 Effective Cover</span>
              </div>
              <div className="flex flex-col">
                <span className="tech-label text-on-surface-variant mb-2">Est. Nails/Fixings</span>
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
              <span className="tech-label text-secondary-container bg-surface-container-highest px-2 py-1 rounded-sm">Architectural Grade</span>
            </div>
            <div className="space-y-6">
              <div className="flex justify-between items-center bg-surface-container-lowest p-6 rounded-sm transition-all hover:translate-x-1 shadow-ambient">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary-container rounded-sm flex items-center justify-center text-white">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-headline font-bold text-primary-container tracking-[-0.02em]">Pinnacle {profile.title}</h4>
                    <p className="text-on-surface-variant text-sm font-sans">Gauge {data.thickness} | Matte Finish | Brick Red</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="block font-headline font-bold text-lg text-primary-container tracking-[-0.02em]">KES 1,250</span>
                  <span className="tech-label text-on-surface-variant/50">Per SQM</span>
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
                  <span className="tech-label text-on-surface-variant/50">Estimated Total</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-4 flex flex-col gap-6">
          <div className="hero-gradient text-white p-8 rounded-xl relative overflow-hidden flex flex-col h-full shadow-ambient">
            <div className="relative z-10">
              <span className="tech-label text-white/60 mb-6 block">Direct Assistance</span>
              <h3 className="font-headline font-black text-3xl tracking-[-0.02em] mb-4">Consult with our Technical Lead</h3>
              <p className="text-white/80 mb-8 leading-relaxed font-sans">Book a comprehensive <strong>site assessment</strong> and ensure <strong>professional installation</strong> by speaking directly with our technical lead.</p>
              <button className="bg-whatsapp-green w-full py-4 rounded-md flex items-center justify-center gap-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:bg-[#20bd5a] active:scale-95 shadow-ambient group">
                <MessageSquare className="w-6 h-6 fill-current group-hover:scale-110 transition-transform" />
                <span className="font-bold text-sm font-sans">Chat on WhatsApp</span>
              </button>
            </div>
            <div className="mt-auto pt-12">
              <div className="border-l-4 border-secondary-container pl-6">
                <span className="tech-label text-white/60">Nairobi HQ</span>
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
            className="bg-surface-container-lowest p-6 rounded-xl flex items-center justify-between group cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:bg-surface-container-low active:scale-95 shadow-ambient"
          >
            <div className="flex items-center gap-3">
              <FileText className="w-6 h-6 text-primary-container" />
              <span className="font-headline font-bold tracking-[-0.02em]">Download Full Report</span>
            </div>
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>

      <section className="mt-24">
        <div className="flex justify-between items-center mb-10">
          <h2 className="font-headline font-black text-3xl tracking-[-0.02em]">Installed Examples</h2>
          <button className="text-primary-container font-headline font-bold text-sm underline underline-offset-4">View All Projects</button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            "https://lh3.googleusercontent.com/aida-public/AB6AXuAcGV-ciCqSMpBTdy0y6rIAhgrtVIFkE6-zP0OOjenAPRY0GFfG4BY-gef_OC3cy4BRUda4omDvjuss9nU_ZEgQeMBofgkxvdxFVa6w8aDtlxRzl2fNTGQbgCHClnsk5Fe1kF-ttxp7_DR2aOwdWkagbBr_tz17hlezCjMqSEjkxUH0-O-WGeBWhWmIIrtPC3SKEnO0tsDsWqJJDR3b8BGuseiGrab5hW2ufzjDnvtJwLhj2hhHFJ1MRHgU82i9f0oIHw6wgU-z3MY",
            "https://lh3.googleusercontent.com/aida-public/AB6AXuBqztcEh3r08BUqA8UG9JuJIKvXczvTOlEnzbCibLy9qODPRG5zTJv8U-S3lT0JEoT7nTyniDkwpPNfZ8mrAhtXV4TPOmdjs1TYQRyCWvZI7Tzwm54ungWaTNrVkD4LBv7RuJG38cP9-h-JgZJvFa3XZRLL6_qmcXrM19adCxx6FqPrsSHIRLeY2z1CCc5ilxgmVcVTW-x_izcGFEN-uzp74ApCgJ0GxXN3ty2h74kEZ4DvI1T_a60jzCiZQDvusJw3xROW6K9VDmI",
            "https://lh3.googleusercontent.com/aida-public/AB6AXuCWo856zTA4UfUZlwVwywZEZeFfSlVI8m9ZxOBvEmD1k6IcPhXElgx4Kqb3oppychuyPXxZqc6W4gLuCb66l9jWcbp05HYWRXKhueparWsN5aqKoJtdbBR9P1k239V7kBcCLNkyTFvsiTKZYpu6B2OK5mTBJ5Qd-SpYphJpF49NLwzOCE3cJQ6DaMhgZWQjNrhDpQebvUFmc8_49iRwMZWuKWfo2CANnEHSi9q_5kLHo_k4CWLL5pF8zNnvEcPTWQE4iu_pR1rewig",
            "https://lh3.googleusercontent.com/aida-public/AB6AXuBLftsEDbpbJw1xQyldQhbaKdW_hKlphhLACzVM7t7cdYwV01BHCgkRRKZxnZCLbTQLUuEBF8diSJnJU4DmGFbT3UHG6F5_3WXN_cM-Z0yuq7p-MGmIGL1F245v8Lmp-y6m_iRULEgIKVWfZs2RaY_jw0lI4IxdVrO1FdqycBBJLLHabH26nfgi9bCfn5we-KKJgLhwPoQIV71leLjk8M1ylrWvQbDIxMQi3G6d77JQ5IaeiqHb3i7gLX3AMPOw95heMUM9-GyVUlU"
          ].map((src, i) => (
            <div key={i} className="aspect-square bg-surface-container-low rounded-xl overflow-hidden group shadow-ambient">
              <img 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500 scale-105 group-hover:scale-100" 
                src={src}
                alt={`Installed Example ${i + 1}`}
                referrerPolicy="no-referrer"
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};


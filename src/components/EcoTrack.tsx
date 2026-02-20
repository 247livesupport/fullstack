import { useState } from 'react';

export default function EcoTrack() {
  const [miles, setMiles] = useState(50);
  const factor = 0.404;

  const generatePDF = async () => {
    try {
      const response = await fetch('https://022fc716-84bf-4ba4-9f90-0350115b9cb4-00-267rz18hpx4zp.worf.replit.dev/generate-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ miles })
      });
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'EcoTrack_Report.pdf');
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
    } catch (e) {
      alert("Error generating PDF. Is the Replit server running?");
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-indigo-500/5 border border-indigo-500/10 p-5 rounded-3xl text-center">
        <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-1">Carbon Impact</p>
        <h4 className="text-4xl font-black text-white">{(miles * factor).toFixed(2)}<span className="text-sm font-medium text-slate-500 ml-1">kg</span></h4>
      </div>

      <div className="space-y-4">
        <input 
          type="range" min="0" max="500" step="10" value={miles} 
          onChange={(e) => setMiles(parseInt(e.target.value))} 
          className="w-full accent-indigo-600" 
        />
        <button 
          onClick={generatePDF}
          className="w-full py-3 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-indigo-400 hover:text-white transition-all"
        >
          Download PDF Report
        </button>
      </div>
    </div>
  );
}
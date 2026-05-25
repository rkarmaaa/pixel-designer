import React, { useState, useRef, useEffect } from 'react';
import { ChevronsLeftRight } from 'lucide-react';

function App() {
  const [px, setPx] = useState<string>('');
  const [physical, setPhysical] = useState<string>('');
  const [unit, setUnit] = useState<'cm' | 'mm'>('cm');
  
  const getRatio = (u: 'cm' | 'mm') => u === 'cm' ? 72 / 2.54 : 72 / 25.4;

  const handlePxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setPx(val);
    if (val === '') {
      setPhysical('');
      return;
    }
    const num = parseFloat(val);
    if (!isNaN(num)) {
      const calcPhysical = num / getRatio(unit);
      setPhysical(parseFloat(calcPhysical.toFixed(2)).toString());
    }
  };

  const handlePhysicalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setPhysical(val);
    if (val === '') {
      setPx('');
      return;
    }
    const num = parseFloat(val);
    if (!isNaN(num)) {
      const calcPx = num * getRatio(unit);
      setPx(Math.round(calcPx).toString());
    }
  };

  const handleUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newUnit = e.target.value as 'cm' | 'mm';
    setUnit(newUnit);
    if (physical !== '') {
      const num = parseFloat(physical);
      if (!isNaN(num)) {
        if (newUnit === 'mm' && unit === 'cm') {
          setPhysical(parseFloat((num * 10).toFixed(2)).toString());
        } else if (newUnit === 'cm' && unit === 'mm') {
          setPhysical(parseFloat((num / 10).toFixed(2)).toString());
        }
      }
    }
  };

  const pxInputRef = useRef<HTMLInputElement>(null);
  const physicalInputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent, current: 'px' | 'physical') => {
    if (e.key === 'Tab') {
      e.preventDefault();
      if (current === 'px') {
        physicalInputRef.current?.focus();
        physicalInputRef.current?.select();
      } else {
        pxInputRef.current?.focus();
        pxInputRef.current?.select();
      }
    }
  };

  useEffect(() => {
    const rootDiv = document.getElementById('root');
    if (rootDiv && (window as any).electronAPI?.resizeWindow) {
      const observer = new ResizeObserver((entries) => {
        for (let entry of entries) {
          // Aggiungiamo un piccolo margine per la finestra
          (window as any).electronAPI.resizeWindow(entry.target.scrollWidth, entry.target.scrollHeight);
        }
      });
      observer.observe(rootDiv);
      return () => observer.disconnect();
    }
  }, []);

  return (
    <div className="app-container">
      <div className="header">
        <label className="preset-label">Preset Tabella di Calcolo</label>
        <select className="preset-select" defaultValue="figma">
          <option value="figma">Figma (72 DPI)</option>
        </select>
      </div>

      <div className="converter-panel-horizontal">
        <div className="input-group">
          <div className="label-with-dropdown" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
            <label style={{ marginBottom: 0 }}>{unit === 'cm' ? 'Centimetri' : 'Millimetri'}</label>
            <select value={unit} onChange={handleUnitChange} style={{ fontSize: '0.75rem', padding: '2px 0px', width: '20px', borderRadius: '4px', backgroundColor: '#333', color: 'transparent', border: '1px solid #444', outline: 'none', cursor: 'pointer' }} title="Cambia unità">
              <option value="cm" style={{ color: '#fff', backgroundColor: '#333' }}>cm</option>
              <option value="mm" style={{ color: '#fff', backgroundColor: '#333' }}>mm</option>
            </select>
          </div>
          <div className="input-wrapper">
            <input
              ref={physicalInputRef}
              type="number"
              value={physical}
              onChange={handlePhysicalChange}
              onKeyDown={(e) => handleKeyDown(e, 'physical')}
              placeholder="0"
              step={unit === 'cm' ? "0.01" : "0.1"}
              autoFocus
            />
            <span className="unit-suffix">{unit}</span>
          </div>
        </div>

        <div className="icon-exchange-horizontal" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <ChevronsLeftRight size={20} color="#888" />
        </div>

        <div className="input-group">
          <label>Pixel</label>
          <div className="input-wrapper">
            <input
              ref={pxInputRef}
              type="number"
              value={px}
              onChange={handlePxChange}
              onKeyDown={(e) => handleKeyDown(e, 'px')}
              placeholder="0"
            />
            <span className="unit-suffix">px</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

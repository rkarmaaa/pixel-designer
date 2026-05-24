import React, { useState, useRef } from 'react';

const RATIO_PX_PER_CM = 72 / 2.54; // Figma 72 DPI

function App() {
  const [px, setPx] = useState<string>('');
  const [cm, setCm] = useState<string>('');
  
  const handlePxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setPx(val);
    if (val === '') {
      setCm('');
      return;
    }
    const num = parseFloat(val);
    if (!isNaN(num)) {
      const calcCm = num / RATIO_PX_PER_CM;
      setCm(parseFloat(calcCm.toFixed(2)).toString());
    }
  };

  const handleCmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setCm(val);
    if (val === '') {
      setPx('');
      return;
    }
    const num = parseFloat(val);
    if (!isNaN(num)) {
      const calcPx = num * RATIO_PX_PER_CM;
      setPx(Math.round(calcPx).toString());
    }
  };

  const pxInputRef = useRef<HTMLInputElement>(null);
  const cmInputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent, current: 'px' | 'cm') => {
    if (e.key === 'Tab') {
      e.preventDefault();
      if (current === 'px') {
        cmInputRef.current?.focus();
        cmInputRef.current?.select();
      } else {
        pxInputRef.current?.focus();
        pxInputRef.current?.select();
      }
    }
  };

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
          <label>Pixel</label>
          <div className="input-wrapper">
            <input
              ref={pxInputRef}
              type="number"
              value={px}
              onChange={handlePxChange}
              onKeyDown={(e) => handleKeyDown(e, 'px')}
              placeholder="0"
              autoFocus
            />
            <span className="unit-suffix">px</span>
          </div>
        </div>
        
        <div className="icon-exchange-horizontal">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17 8L21 12M21 12L17 16M21 12H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        <div className="input-group">
          <label>Centimetri</label>
          <div className="input-wrapper">
            <input
              ref={cmInputRef}
              type="number"
              value={cm}
              onChange={handleCmChange}
              onKeyDown={(e) => handleKeyDown(e, 'cm')}
              placeholder="0"
              step="0.01"
            />
            <span className="unit-suffix">cm</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

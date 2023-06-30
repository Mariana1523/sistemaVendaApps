import React, { useState } from 'react';
import "./Dashboard.css"
// Componente do Dashboard
export default function Dashpage() {
  const [activeContent, setActiveContent] = useState('content1');

  const handleItemClick = (content) => {
    setActiveContent(content);
  };

  return (
    <div className="dashboard">
      <div className="sidebar">
        <ul>
          <li onClick={() => handleItemClick('content1')}>Faturamento</li>
          <li onClick={() => handleItemClick('content2')}>Conteúdo 2</li>
          <li onClick={() => handleItemClick('content3')}>Conteúdo 3</li>
        </ul>
      </div>

      <div className="main-content">
        {activeContent === 'content1' && (
          <div>
            <h2>Faturamento</h2>
            <p>Este é o conteúdo 1 da página de dashboard.</p>
          </div>
        )}
        {activeContent === 'content2' && (
          <div>
            <h2>Conteúdo 2</h2>
            <p>Este é o conteúdo 2 da página de dashboard.</p>
          </div>
        )}
        {activeContent === 'content3' && (
          <div>
            <h2>Conteúdo 3</h2>
            <p>Este é o conteúdo 3 da página de dashboard.</p>
          </div>
        )}
      </div>
    </div>
  );
}



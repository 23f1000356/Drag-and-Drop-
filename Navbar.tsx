import React from 'react';
import Element from './Element';
import '../styles/Navbar.css';

const Navbar: React.FC = () => {
  const elements = [
    { type: 'textbox', label: 'Text Box' },
    { type: 'email', label: 'Email' },
    { type: 'phone', label: 'Phone' },
    { type: 'image', label: 'Image' },
    { type: 'box', label: 'Step Box' },
    { type: 'button', label: 'Sign Up' },
  ];

  return (
    <nav className="elements-navbar">
      <div className="elements-list">
        {elements.map((element) => (
          <div key={element.type} className="element-item">
            <span className="element-label">{element.label}</span>
            <Element type={element.type} />
          </div>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
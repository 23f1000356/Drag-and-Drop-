import React from 'react';
import Element from './Element';
import '../styles/Toolbar.css';

const Toolbar: React.FC = () => {
  const elements = [
    { type: 'name', label: 'Name Input' },
    { type: 'email', label: 'Email Input' },
    { type: 'password', label: 'Password Input' },
    { type: 'number', label: 'Phone Number' },
    { type: 'button', label: 'Sign Up Button' },
    { type: 'steps', label: 'Steps Component' },
  ];

  return (
    <div className="toolbar">
      <h2>Elements</h2>
      <div className="elements-container">
        {elements.map((element) => (
          <div key={element.type} className="toolbar-element">
            <p>{element.label}</p>
            <Element type={element.type} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Toolbar; 
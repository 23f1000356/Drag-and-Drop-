import React from 'react';
import Element from './Element';

const Sidebar: React.FC = () => {
  return (
    <div className="sidebar">
      <h3>Drag Elements</h3>
      <Element type="name" />
      <Element type="email" />
      <Element type="password" />
      <Element type="number" />
      <Element type="button" />
      <Element type="steps" />
    </div>
  );
};

export default Sidebar;
import React from 'react';
import '../styles/ShapeControls.css';

interface ShapeControlsProps {
  onShapeChange: (shape: string) => void;
}

const ShapeControls: React.FC<ShapeControlsProps> = ({ onShapeChange }) => {
  const shapes = [
    { id: 'rectangle', label: '⬭', title: 'Rectangle' },
    { id: 'circle', label: '⬤', title: 'Circle' },
    { id: 'square', label: '■', title: 'Square' },
  ];

  return (
    <div className="shape-controls">
      <h3>Shapes</h3>
      <div className="shape-buttons">
        {shapes.map((shape) => (
          <button
            key={shape.id}
            className="shape-button"
            onClick={() => onShapeChange(shape.id)}
            title={shape.title}
          >
            {shape.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ShapeControls; 
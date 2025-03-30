import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import Element from './Element';
import Template from './Template';
import '../styles/Canvas.css';

interface DroppedElement {
  id: string;
  type: string;
  position: { x: number; y: number };
  text?: string;
  imageUrl?: string;
  style?: {
    color?: string;
    backgroundColor?: string;
    fontSize?: string;
    padding?: string;
    borderRadius?: string;
  };
}

interface CanvasProps {
  isPreview?: boolean;
  onPreview?: (elements: DroppedElement[]) => void;
  onFinish?: (elements: DroppedElement[]) => void;
}

const Canvas: React.FC<CanvasProps> = ({ isPreview = false, onPreview, onFinish }) => {
  const [elements, setElements] = useState<DroppedElement[]>([]);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'ELEMENT',
    drop: (item: { type: string; text?: string; imageUrl?: string }, monitor) => {
      const offset = monitor.getClientOffset();
      const canvas = document.getElementById('canvas');

      if (offset && canvas) {
        const canvasRect = canvas.getBoundingClientRect();
        const x = offset.x - canvasRect.left;
        const y = offset.y - canvasRect.top;

        const newElement: DroppedElement = {
          id: `${item.type}-${Date.now()}`,
          type: item.type,
          position: { x, y },
          text: item.text || '',
          imageUrl: item.imageUrl || '',
          style: {
            color: '#ffffff', // White text for better contrast
            backgroundColor: '#000000', // Black background for elements
            fontSize: '16px',
            padding: '10px',
            borderRadius: '4px',
          },
        };

        setElements((prev) => [...prev, newElement]);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  const handlePreview = () => {
    if (onPreview) {
      onPreview(elements); // Pass the elements to the parent component for preview
    }
  };

  const handleFinish = () => {
    if (onFinish) {
      onFinish(elements); // Pass the elements to the parent component
    }
    localStorage.setItem('savedCanvas', JSON.stringify(elements)); // Save to local storage
  };

  return (
    <div
      className="canvas-wrapper"
      style={{
        backgroundColor: '#000000', // Black background for the canvas
        padding: '20px',
        borderRadius: '8px',
        border: '2px solid #2196f3', // Blue border for the canvas
      }}
    >
      <Template isPreview={isPreview} />
      <div className="canvas-container">
        <div
          id="canvas"
          ref={!isPreview ? drop : null}
          className={`canvas ${isOver ? 'drag-over' : ''}`}
          style={{
            backgroundColor: '#1a1a1a', // Darker black for the inner canvas
            border: '2px dashed #2196f3', // Dashed blue border for drag-over effect
            minHeight: '500px',
            position: 'relative',
          }}
        >
          {elements.map((element) => (
            <div
              key={element.id}
              className="canvas-element"
              style={{
                position: 'absolute',
                left: element.position.x,
                top: element.position.y,
                ...element.style,
              }}
            >
              <Element
                type={element.type}
                isCanvas={true}
                imageUrl={element.imageUrl}
              />
            </div>
          ))}
        </div>
      </div>
      {!isPreview && (
        <div className="button-container" style={{ textAlign: 'center', marginTop: '20px' }}>
          <button
            className="preview-button"
            style={{
              padding: '10px 20px',
              backgroundColor: '#2196f3',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              marginRight: '10px',
            }}
            onClick={handlePreview}
          >
            Preview
          </button>
          <button
            className="finish-button"
            style={{
              padding: '10px 20px',
              backgroundColor: '#4caf50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
            onClick={handleFinish}
          >
            Finish
          </button>
        </div>
      )}
    </div>
  );
};

export default Canvas;
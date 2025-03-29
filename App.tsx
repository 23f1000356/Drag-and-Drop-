import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Navbar from './components/Navbar';
import Canvas from './components/Canvas';
import Element from './components/Element';
import './App.css';

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

const App: React.FC = () => {
  const [isPreview, setIsPreview] = useState(false);
  const [isFinalPreview, setIsFinalPreview] = useState(false);
  const [finalElements, setFinalElements] = useState<DroppedElement[]>([]);

  const handlePreview = (elements: DroppedElement[]) => {
    setFinalElements(elements); // Save the elements for preview
    setIsPreview(true); // Switch to preview mode
  };

  const handleFinish = (elements: DroppedElement[]) => {
    setFinalElements(elements); // Save the elements for final preview
    localStorage.setItem('savedCanvas', JSON.stringify(elements)); // Save to local storage
    setIsPreview(false);
    setIsFinalPreview(true); // Switch to final preview mode
  };

  const handleBackToEditor = () => {
    setIsPreview(false);
    setIsFinalPreview(false);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="app">
        <div className="top-bar">
          <div className="elements-bar">
            {!isPreview && !isFinalPreview && <Navbar />}
          </div>
          {(isPreview || isFinalPreview) && (
            <button
              className="back-button"
              onClick={handleBackToEditor}
              style={{
                backgroundColor: '#2196f3',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                padding: '10px 20px',
                cursor: 'pointer',
                fontSize: '16px',
              }}
            >
              Back to Editor
            </button>
          )}
        </div>
        <div className="main-content">
          {isFinalPreview ? (
            <div className="preview-mode">
              <h2
                style={{
                  color: '#2196f3',
                  textAlign: 'center',
                  marginBottom: '20px',
                }}
              >
                Final Website
              </h2>
              <div className="preview-container">
                {finalElements.map((element) => (
                  <div
                    key={element.id}
                    className="preview-element"
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
          ) : isPreview ? (
            <div className="preview-mode">
              <h2
                style={{
                  color: '#2196f3',
                  textAlign: 'center',
                  marginBottom: '20px',
                }}
              >
                Preview Mode
              </h2>
              <div className="preview-container">
                {finalElements.map((element) => (
                  <div
                    key={element.id}
                    className="preview-element"
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
          ) : (
            <Canvas
              isPreview={false}
              onPreview={handlePreview}
              onFinish={handleFinish}
            />
          )}
        </div>
      </div>
    </DndProvider>
  );
};

export default App;
import React, { useState } from 'react';
import { useDrag } from 'react-dnd';
import '../styles/Element.css';

interface ElementProps {
  type: string;
  isCanvas?: boolean;
  imageUrl?: string;
  text?: string;
  style?: React.CSSProperties;
  onImageUpload?: (imageUrl: string) => void;
}

const Element: React.FC<ElementProps> = ({
  type,
  isCanvas = false,
  imageUrl: initialImageUrl,
  text: initialText = '',
  style,
  onImageUpload,
}) => {
  const [text, setText] = useState(initialText);
  const [imageUrl, setImageUrl] = useState(initialImageUrl || '');
  const [isEditing, setIsEditing] = useState(false);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'ELEMENT',
    item: { type, text, imageUrl },
    canDrag: true, // Allow dragging for all elements
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const handleDoubleClickText = () => {
    if (isCanvas) {
      setIsEditing(true);
    }
  };

  const handleBlurText = () => {
    setIsEditing(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImageUrl(url);
      if (onImageUpload) {
        onImageUpload(url);
      }
    }
  };

  const handleDoubleClickImage = () => {
    if (isCanvas) {
      document.getElementById('hidden-file-input')?.click();
    }
  };

  const renderElement = () => {
    switch (type) {
      case 'textbox':
        return isEditing ? (
          <input
            type="text"
            className="element-textbox"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onBlur={handleBlurText}
            autoFocus
            style={{
              ...style,
              backgroundColor: '#ffffff', // White background
              color: '#000000', // Black text
              border: '1px solid #ccc',
              padding: '5px',
            }}
          />
        ) : (
          <div
            className="element-textbox"
            onDoubleClick={handleDoubleClickText}
            style={{
              ...style,
              backgroundColor: '#ffffff', // White background
              color: '#000000', // Black text
              padding: '5px',
              border: '1px solid #ccc',
            }}
          >
            {text || 'Double-click to edit text'}
          </div>
        );
      case 'email':
        return isEditing ? (
          <input
            type="email"
            className="element-input"
            value={text}
            placeholder="Enter Your Email Address"
            onChange={(e) => setText(e.target.value)}
            onBlur={handleBlurText}
            autoFocus
            style={{
              ...style,
              backgroundColor: '#ffffff', // White background
              color: '#000000', // Black text
              border: '1px solid #ccc',
              padding: '5px',
            }}
          />
        ) : (
          <div
            className="element-input"
            onDoubleClick={handleDoubleClickText}
            style={{
              ...style,
              backgroundColor: '#ffffff', // White background
              color: '#000000', // Black text
              padding: '5px',
              border: '1px solid #ccc',
            }}
          >
            {text || 'Double-click to edit email'}
          </div>
        );
      case 'phone':
        return isEditing ? (
          <input
            type="tel"
            className="element-input"
            value={text}
            placeholder="Enter Your Phone Number"
            onChange={(e) => setText(e.target.value)}
            onBlur={handleBlurText}
            autoFocus
            style={{
              ...style,
              backgroundColor: '#ffffff', // White background
              color: '#000000', // Black text
              border: '1px solid #ccc',
              padding: '5px',
            }}
          />
        ) : (
          <div
            className="element-input"
            onDoubleClick={handleDoubleClickText}
            style={{
              ...style,
              backgroundColor: '#ffffff', // White background
              color: '#000000', // Black text
              padding: '5px',
              border: '1px solid #ccc',
            }}
          >
            {text || 'Double-click to edit phone'}
          </div>
        );
      case 'image':
        return (
          <div
            className="image-upload"
            style={{
              ...style,
              backgroundColor: '#ffffff', // White background
              border: '1px solid #ccc',
              padding: '5px',
            }}
            onDoubleClick={handleDoubleClickImage}
          >
            {imageUrl ? (
              <img src={imageUrl} alt="Uploaded" className="uploaded-image" />
            ) : (
              <div className="upload-placeholder">
                <span>Double-click to upload image</span>
              </div>
            )}
          </div>
        );
      case 'box':
        return (
          <div
            className="step-box"
            contentEditable={isCanvas}
            suppressContentEditableWarning={true}
            style={{
              ...style,
              backgroundColor: '#ffffff', // White background
              color: '#000000', // Black text
              padding: '10px',
              border: '1px solid #ccc',
            }}
          >
            {isCanvas ? 'Add your step here...' : 'Step Box'}
          </div>
        );
      case 'button':
        return isEditing ? (
          <input
            type="text"
            className="element-button-edit"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onBlur={handleBlurText}
            autoFocus
            style={{
              ...style,
              backgroundColor: '#ffffff', // White background
              color: '#000000', // Black text
              border: '1px solid #ccc',
              padding: '5px',
            }}
          />
        ) : (
          <button
            className="signup-button"
            style={{
              ...style,
              backgroundColor: '#2196f3', // Blue background
              color: '#ffffff', // White text
              border: 'none',
              borderRadius: '4px',
              padding: '10px 20px',
              cursor: 'pointer',
            }}
            onDoubleClick={handleDoubleClickText}
          >
            {text || 'Sign Up for Free'}
          </button>
        );
      default:
        return <div style={style}>Unknown Element</div>;
    }
  };

  return (
    <div
      ref={drag}
      className={`element-wrapper ${isDragging ? 'dragging' : ''}`}
      style={{
        ...style,
        opacity: isDragging ? 0.5 : 1,
      }}
    >
      {renderElement()}
    </div>
  );
};

export default Element;
import React from 'react';
import Element from './Element';
import '../styles/Template.css';

interface TemplateProps {
  isPreview?: boolean;
}

const Template: React.FC<TemplateProps> = ({ isPreview = false }) => {
  return (
    <div className={`template ${isPreview ? 'preview' : ''}`}>
      <div className="template-header">
        <h1 className="main-title">Create your smart website instantly! For Free</h1>
      </div>
      <div className="template-content">
        <div className="content-section">
          <div className="steps-container">
            <div className="step">
              <div className="step-icon">1</div>
              <div className="step-label">Step 1</div>
              <div className="step-text">Register Yourself</div>
            </div>
            <div className="step-connector" />
            <div className="step">
              <div className="step-icon">2</div>
              <div className="step-label">Step 2</div>
              <div className="step-text">Submit Website Details</div>
            </div>
            <div className="step-connector" />
            <div className="step">
              <div className="step-icon">✓</div>
              <div className="step-label">Live</div>
              <div className="step-text">Your Website Is Live!</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Template; 
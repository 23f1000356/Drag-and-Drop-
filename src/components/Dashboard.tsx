import React from 'react';
import { useNavigate } from 'react-router-dom';

interface DashboardProps {
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      <button onClick={() => navigate('/canvas')}>Go to Canvas</button>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
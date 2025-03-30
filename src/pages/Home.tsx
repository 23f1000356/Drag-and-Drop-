import React from 'react';
import Canvas from '../components/Canvas';
import Navbar from '../components/Navbar';

const Home: React.FC = () => {
    return (
        <div>
            <Navbar />
            <Canvas isPreview={false} />
        </div>
    );
};

export default Home;
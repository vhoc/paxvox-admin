// React Libraries and Components
import React from 'react';

// Custom Components
import TopBar from './components/TopBar';
import RoutesComponent from './RoutesComponent'

// Styles, images, and other assets.
import './App.css';

const App = () => {
  return (
    
    <div className="App">
      
        <TopBar/>
        <RoutesComponent/>              

    </div>

  );
}

export default App;

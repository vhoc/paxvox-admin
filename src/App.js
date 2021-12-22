// React Libraries and Components
import React, { useState, useEffect } from 'react';

// Custom Components
import RoutesComponent from './RoutesComponent'

// Styles, images, and other assets.
import './App.css';

const App = () => {

  const [username, setUsername] = useState('')

  useEffect( () => {
    setUsername( localStorage.getItem('username') )
  }, [])
 
  return (
    
    <div className="App p-0">
      
        <RoutesComponent username={username}/>
        
    </div>

  );
}

export default App;

import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Custom components
import { AuthProvider } from './providers/AuthContext'
import LoginForm from './pages/LoginForm/LoginForm';
import Reports from './pages/Reports/Reports';

import TopBar from './components/TopBar';

const RoutesComponent = () => {
    return (

        <BrowserRouter>

          <AuthProvider>

            <TopBar location={'Mariscos El Rey Obregón'} username={ localStorage.getItem('username') }/>

            <Routes>
              <Route exact path='/' element={ <LoginForm appName={'Encuestas Mariscos El Rey'} _redirect={`/reports`} /> }/>
              <Route exact path='/reports' element={ <Reports /> } />
            </Routes>
          </AuthProvider>

        </BrowserRouter>

    )
}

export default RoutesComponent
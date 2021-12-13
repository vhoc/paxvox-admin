import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import LoginForm from './pages/LoginForm/LoginForm';

const RoutesComponent = () => {
    return (

        <BrowserRouter>
          <Routes>
            <Route exact path='/' element={ <LoginForm appName={'Encuestas Mariscos El Rey'} _redirect={`/reports`} /> }/>
          </Routes>
        </BrowserRouter>

    )
}

export default RoutesComponent
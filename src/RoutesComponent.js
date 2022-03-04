import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Custom components
import LoginForm from './pages/LoginForm/LoginForm';
import Reports from './pages/Reports/Reports';

const RoutesComponent = ( {username} ) => {
    return (

        <BrowserRouter>

            <Routes>
              <Route exact path='/admin' element={ <LoginForm appName={'Encuestas de Satisfacción'} redirectRoute={`/admin/reports`} /> }/>
              <Route exact path='/admin/reports' element={ <Reports username={username} location={'1'} /> } />
            </Routes>

        </BrowserRouter>

    )
}

export default RoutesComponent
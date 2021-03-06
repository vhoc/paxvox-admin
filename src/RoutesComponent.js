import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Custom components
import LoginForm from './pages/LoginForm/LoginForm';
import Reports from './pages/Reports/Reports';

const RoutesComponent = ( { username } ) => {

    return (

        <BrowserRouter basename='/admin/'>

            <Routes>
              <Route exact path='/' element={ <LoginForm appName={'Encuestas de Satisfacción'} redirectRoute={`/reports`} /> }/>
              <Route exact path='/reports' element={ <Reports username={username} /> } />
            </Routes>

        </BrowserRouter>

    )
}

export default RoutesComponent
import { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button'

import Navbar from 'react-bootstrap/Navbar'
import useValidateToken from './Api'

import classes from './TopBar.module.css'

const TopBar = ( ) => {

    const [auth, setAuth] = useState([])

    const { response, loading, error } = useValidateToken(localStorage.getItem('token'))

    const goTo = useNavigate()
    
    const logout = () => {
        localStorage.clear()
        goTo('/')
    }

    useEffect( () => {
        
        if (response !== null) {
            setAuth(response)
            localStorage.setItem('username', response.username)
        }
    }, [response] )

    return (

            <Navbar className={classes.topbar} sticky='top'>
                    <Navbar.Brand href="/">
                        <small>{localStorage.getItem('location_name')}</small>
                    </Navbar.Brand>

                    <Navbar.Toggle/>
                    
                    <Navbar.Collapse className={`justify-content-end collapse`}>
                        <Navbar.Text className={classes.text}>
                        {loading ? (
                            <div><p className='text-white'><strong>Cargando...</strong></p></div>
                        ) : (
                            <div className={classes.rightPane}>
                                {error && (
                                    <Navigate to="/" />
                                )}
                                <div>{auth && <div><span>{auth.username}</span><Button variant='link' onClick={() => logout()}>Salir</Button></div>}</div>
                            </div>
                        )}
                        </Navbar.Text>
                    </Navbar.Collapse>
            </Navbar>

    )

}

export default TopBar
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import { Alert } from 'react-bootstrap'

import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import useValidateToken from './Api'

import classes from './TopBar.module.css'

const TopBar = ( {location} ) => {

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
                <Container>
                    <Navbar.Brand href="/"><small>{location}</small></Navbar.Brand>
                    <Navbar.Toggle/>
                    <Navbar.Collapse className={`justify-content-end`}>
                        <Navbar.Text className={classes.text}>
                        {loading ? (
                            <p>cargando...</p>
                        ) : (
                            <div>
                                {error && (
                                    <div>
                                        <Alert variant='danger'>{error.message}</Alert>
                                    </div>
                                )}
                                <div>{auth && <div><span>{auth.username}</span><Button variant='link' onClick={() => logout()}>Salir</Button></div>}</div>
                            </div>
                        )}
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

    )

}

export default TopBar
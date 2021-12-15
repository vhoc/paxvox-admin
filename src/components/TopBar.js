import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button'

import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'

const TopBar = ( {location, username} ) => {

    const logOff = () => {
        localStorage.clear()
    }

    

    useEffect( () => {
        if (!username) {
            localStorage.clear()
            return <Navigate to='/'/>
        }
    }, [username] )
    
    return (

            <Navbar>
                <Container>
                    <Navbar.Brand href="/"><small>{location}</small></Navbar.Brand>
                    <Navbar.Toggle/>
                    <Navbar.Collapse className={`justify-content-end`}>
                        <Navbar.Text>
                            <Button onClick={() => logOff}>{username}</Button>
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

    )

}

export default TopBar
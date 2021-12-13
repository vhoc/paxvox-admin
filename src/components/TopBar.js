import React from 'react'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'

const TopBar = () => {
    
    return (
            <Navbar>
                <Container>
                    <Navbar.Brand href="/"><small>Mariscos El Rey Obregón</small></Navbar.Brand>
                    <Navbar.Toggle/>
                    <Navbar.Collapse className={`justify-content-end`}>
                        <Navbar.Text>User</Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

    )

}

export default TopBar
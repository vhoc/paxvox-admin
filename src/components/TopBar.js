import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button'

import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import useApi from './Helpers'

const TopBar = ( {location} ) => {

    const [username, setUsername] = useState()

    const [auth, setAuth] = useState([])

    const { response, loading, error } = useApi({
        method: 'get',
        url: '/validateToken',
        headers: JSON.stringify({ 'Authorization': localStorage.getItem('token') }),
    })

    const goTo = useNavigate()
    /*
    const validateToken = async () => {
        const response = await axios.get('https://paxvox.waxy.app/api/validateToken', { headers: {'Authorization': localStorage.getItem('token')} })
        const name = await response.data.username
        setUsername(name)
    }*/

    const logout = () => {
        localStorage.clear()
        goTo('/')
    }

    useEffect( () => {
        if (response !== null) {
            setAuth(response)
        }        
        localStorage.setItem('username', auth)
    }, [response] )

    return (

            <Navbar>
                <Container>
                    <Navbar.Brand href="/"><small>{location}</small></Navbar.Brand>
                    <Navbar.Toggle/>
                    <Navbar.Collapse className={`justify-content-end`}>
                        <Navbar.Text>
                        {loading ? (
                            <p>loading...</p>
                        ) : (
                            <div>
                                {error && (
                                    <div>
                                        <p>{error.message}</p>
                                    </div>
                                )}
                                <div>{auth && <p>{auth.id}</p>}</div>
                            </div>
                        )}
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

    )

}

export default TopBar
// React Libraries and Components
import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

// Custom Components
// Styles, images, and other assets.

/**
 * LoginForm
 * @param {string} _appName
 * @param {string} _redirect
 * @returns JSX.element
 */
const LoginForm = ( { _appName, _redirect } ) => {

    const [credentials, setCredentials] = useState({username: '', password: ''})
    const redirectTo = useNavigate()

    /**
     * tryLogin
     */
    const tryLogin = async () => {
        try {
            const response = await axios.post('https://paxvox.waxy.app/api/login', credentials)
            console.log(response)
        } catch (exception) {
            Swal.fire("Error", `Error desconocido: (${exception.message})`, "error")
        }
    }

    /**
     * onSubmit
     * @param {event} event 
     */
    const onSubmit = event => {
        event.preventDefault()
        tryLogin()        
    }

    return (
        <>
            <h1>{_appName}</h1>
            <h3>Panel de Administración</h3>

            <Form onSubmit={onSubmit}>

                <Form.Group className='mb-2'>
                    <Form.Control
                        type={'username'}
                        placeholder={'E-mail'}
                        onChange={event => setCredentials({
                            ...credentials,
                            username: event.target.value
                        })}
                    />
                </Form.Group>
                
                <Form.Group className='mb-2'>
                    <Form.Control
                        type={'password'}
                        placeholder={'Contraseña'}
                        onChange={event => setCredentials({
                            ...credentials,
                            password: event.target.value
                        })}
                    />
                </Form.Group>

                

                <Button type='submit' variant='success'>Ingresar</Button>

            </Form>
        </>

    )

}

export default LoginForm
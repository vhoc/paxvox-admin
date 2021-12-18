// React Libraries and Components
import React, { useEffect, useState, useRef } from 'react'
import Swal from 'sweetalert2'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useNavigate } from 'react-router-dom'

// Custom Components
import { useLogin } from '../../components/Api'

/**
 * LoginForm
 * @param {string} appName
 * @param {string} redirectRoute
 * @returns JSX.element
 */
const LoginForm = ( { appName, redirectRoute } ) => {

    const [credentials, setCredentials] = useState({username: '', password: ''})
    const [filledForm, setFilledForm] = useState(false)
    const fieldUsernameRef = useRef()
    const fieldPasswordRef = useRef()
    const buttonSubmitRef = useRef()
    const login = useLogin(credentials)
    const goTo = useNavigate()

    /**
     * Handlers
     */
    const handleUsernameField = () => {
        if (fieldPasswordRef.current.value && fieldUsernameRef.current.value) {
            setFilledForm(true)
        } else {
            setFilledForm(false)
        }
    }

    /**
     * onSubmit
     * @param {event} event
     */
    const onSubmit = event => {

        event.preventDefault()

        setCredentials({ ...credentials,
            username: fieldUsernameRef.current.value,
            password: fieldPasswordRef.current.value
        })

    }
    
    /**
     * useEffect
     * @dependencies [login.error, login.response, filledForm]
     */
    useEffect(() => {
        
        if (login.error) {
            switch (login.error.response.status) {
                case 422: Swal.fire("Error", "Se requiere ingresar el usuario y la contraseña correctamente", "error" )
                    break;
                case 401: Swal.fire("Error", "Se ha ingresado un usuario o contraseña incorrecto(s).", "error")
                    break;
                default:
                    Swal.fire("Error", `Error: (${login.error.message})`, "error")
                    console.log(`${login.error.message}`)
                    break;
            }
        }

        if (login.response !== null) {
            localStorage.setItem('token', `Bearer ${login.response.token}`)
            goTo( redirectRoute, {replace: true} )
        }
        
    }, [login.error, login.response, filledForm])
    
    return (
        <>
            <h1>{appName}</h1>
            <h3>Panel de Administración</h3>

            <Form onSubmit={onSubmit}>

                <Form.Group className='mb-2'>
                    <Form.Control
                        ref={fieldUsernameRef}
                        type={'username'}
                        placeholder={'E-mail'}
                        onChange={handleUsernameField}
                    />
                </Form.Group>
                
                <Form.Group className='mb-2'>
                    <Form.Control
                        ref={fieldPasswordRef}
                        type={'password'}
                        placeholder={'Contraseña'}
                        onChange={handleUsernameField}
                    />
                </Form.Group>

                <Button
                    ref={buttonSubmitRef}
                    type='submit'
                    variant='success'
                    disabled={!filledForm}
                >
                    Ingresar
                </Button>

            </Form>
        </>

    )

}

export default LoginForm
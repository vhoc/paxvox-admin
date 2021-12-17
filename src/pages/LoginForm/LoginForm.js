// React Libraries and Components
import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Navigate, useNavigate } from 'react-router-dom'

// Custom Components
import { useLogin } from '../../components/Api'

// Styles, images, and other assets.

/**
 * LoginForm
 * @param {string} appName
 * @param {string} redirectRoute
 * @returns JSX.element
 */
const LoginForm = ( { appName, redirectRoute } ) => {

    const [credentials, setCredentials] = useState({username: '', password: ''})
    const fieldUsernameRef = useRef()
    const fieldPasswordRef = useRef()

    const { response, loading, error } = useLogin(credentials)

    const goTo = useNavigate()

    /**
     * tryLogin
     */
    const tryLogin = async () => {
        try {

            // Login to the API to get the token
            const response = await axios.post('https://paxvox.waxy.app/api/login', credentials)
            const token = await response.data.token
            
            localStorage.setItem('token', `Bearer ${token}`)

            // Redirect to protected page.
            goTo( redirectRoute, {replace: true} )

        } catch (exception) {
            switch (exception.response.status) {
                case 422:
                    Swal.fire("Error", "Se requiere ingresar el usuario y la contraseña correctamente.", "error")
                    break;
                case 401:
                    Swal.fire("Error", "Se ha ingresado un usuario o contraseña incorrecto(s).", "error")
                    break;
                default:
                    Swal.fire("Error", `Error desconocido: (${exception.response.data})`, "error")
                    console.log(`${exception.message}`)
                    break;
            }
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
            password:fieldPasswordRef.current.value
        })
        //tryLogin()
        //const { response, loading, error } = useLogin(credentials)
        
    }
    

    // Loads the form when there is a token in localStorage.
    /*
    if ( localStorage.getItem('token') ) {
        return <Navigate to={redirectRoute}/>
    }*/
    
    // Loads the form as soon as we log in. (First time log-in)
    //if( auth ) {
    //    return <Navigate to={redirectRoute}/>
    //}

    useEffect(() => {
        if(response !== null) {
            console.log(response.token)
            localStorage.setItem('token', `Bearer ${response.token}`)
            goTo( redirectRoute, {replace: true} )
        }
    })
    
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
                    />
                </Form.Group>
                
                <Form.Group className='mb-2'>
                    <Form.Control
                        ref={fieldPasswordRef}
                        type={'password'}
                        placeholder={'Contraseña'}
                    />
                </Form.Group>

                

                <Button type='submit' variant='success'>Ingresar</Button>

            </Form>
        </>

    )

}

export default LoginForm
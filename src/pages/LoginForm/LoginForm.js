// React Libraries and Components
import { useEffect, useState, useRef } from 'react'
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
            localStorage.setItem('location_name', `${login.response.name_location}`)
            goTo( redirectRoute, {replace: true} )
        }
        
    })
    //, [login.error, login.response, filledForm] <--- Removed this from the UseEffect up here.
    
    return (
        <div className='p-3 col-12 d-flex flex-column justify-content-center align-items-center'>

            

            <h1>{appName}</h1>
            <h3>Panel de Administración</h3>
            <div className='col-8 col-md-6 col-lg-4 col-xl-3'>
            <Form onSubmit={onSubmit}>

                <Form.Group className='mb-2'>
                    <Form.Control
                        ref={fieldUsernameRef}
                        type={'username'}
                        placeholder={'Nombre de Usuario o E-mail'}
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
                    variant='primary'
                    disabled={!filledForm}
                >
                    Ingresar
                </Button>

            </Form>

            </div>
        </div>

    )

}

export default LoginForm
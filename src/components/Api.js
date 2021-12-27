import { useState, useEffect } from 'react'
import axios from 'axios'

/**
 * useValidateToken
 * 
 * @param {string} token 
 * @returns 
 */
const useValidateToken = (token) => {

    const [response, setResponse] = useState(null)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(true)    

    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await axios.get('https://paxvox.waxy.app/api/validateToken', { headers: {'Authorization': token} })
                setResponse( await res.data )
            } catch (err) {
                localStorage.removeItem('username')
                localStorage.removeItem('token')
                setError(await err)
            } finally {
                setLoading(false)
            }        
        }

        getUser()
    }, [token])

    return { response, error, loading }

}

/**
 * HOOK: useLogin
 * 
 * @param {object} credentials 
 * @returns 
 */
/*
export const useLogin = ( credentials = {} ) => {

    const [response, setResponse] = useState(null)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if ( credentials.password === '' && credentials.username === '' ) {
            return
        }
        const getToken = async () => {

            try {
                const res = await axios.post('https://paxvox.waxy.app/api/login', credentials)
                setResponse(await res.data)
            } catch (err) {
                setError(await err)
            } finally {
                setLoading(false)
            }        
        }
        getToken()
    }, [credentials])

    return { response, error, loading }

}*/

/**
 * useWaiters
 * 
 */
export const useWaiters = (location) => {

    const [response, setResponse] = useState(null)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getWaiters = async() => {

            try {
                const res = await axios.get(`https://paxvox.waxy.app/api/waiters/${location}`, { headers: {Authorization: localStorage.getItem('token')} })
                setResponse(await res.data)
            } catch (err) {
                setError(await err)
            } finally {
                setLoading(true)
            }
    
        }
        getWaiters()
    }, [location])

    return { response, error, loading }

}

export default useValidateToken
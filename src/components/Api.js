import { useState, useEffect } from 'react'
import axios from 'axios'

const useValidateToken = (token) => {

    const [response, setResponse] = useState(null)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(true)

    const getUser = async () => {
        try {
            const res = await axios.get('https://paxvox.waxy.app/api/validateToken', { headers: {'Authorization': token} })
            setResponse( await res.data )
        } catch (err) {
            setError(await err)
        } finally {
            setLoading(false)
        }
        
    }

    useEffect(() => {
        getUser()
    }, [token])

    return { response, error, loading }

}

export default useValidateToken
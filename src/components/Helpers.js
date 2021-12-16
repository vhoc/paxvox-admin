import { useState, useEffect } from 'react'
import axios from 'axios'

axios.defaults.baseURL = 'https://paxvox.waxy.app/api'

const useApi = ( { url, method, body = null, headers = null } ) => {

    const [response, setResponse] = useState(null)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(true)

    const consume = () => {
         axios[method](url, JSON.parse(headers), JSON.parse(body))
            .then((res) => {
                setResponse(res.data)
            })
            .catch((err) => {
                setError(err)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    useEffect(() => {
        consume()
    }, [method, url, body, headers])

    return { response, error, loading }
}

export default useApi
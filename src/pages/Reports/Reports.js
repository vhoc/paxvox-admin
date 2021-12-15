import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../../providers/AuthContext'

const Reports = () => {

    const auth = useAuth()

    /**
     * Authentication checks
     */
    if (!localStorage.getItem('token' || !auth)) {
        return <Navigate to='/' />
    }


    
    return (

        <div>
            <h3>{ 'Reportes' }</h3>
            <div>
                
            </div>
        </div>
         

    )

}

export default Reports
import React from 'react'
import { Navigate } from 'react-router-dom'
import TopBar from '../../components/TopBar'

const Reports = ( {username} ) => {

    /**
     * Authentication checks
     */
    if (!localStorage.getItem('token')) {
        return <Navigate to='/' />
    }


    
    return (
        
        <div>
            <TopBar location={'Mariscos El Rey Obregón'} username={ username }/>
            <h3>{ 'Reportes' }</h3>
            <div>
                
            </div>
        </div>
         

    )

}

export default Reports
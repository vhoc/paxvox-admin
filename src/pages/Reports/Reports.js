import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import TopBar from '../../components/TopBar'
import ReportBar from '../../components/Report/ReportBar'
import { useWaiters } from '../../components/Api'

const Reports = ( {username, location} ) => {

    const waiters = useWaiters(location)

    useEffect(() => {
        console.log(waiters.response)
    }, [location, waiters])

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
                <ReportBar />
            </div>
        </div>
         

    )

}

export default Reports
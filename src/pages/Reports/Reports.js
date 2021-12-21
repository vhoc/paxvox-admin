import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import DatePicker from 'react-datepicker'

import TopBar from '../../components/TopBar'
import ReportBarMeseros from '../../components/Report/ReportBarMeseros'
import ReportPieFrecuenciaVisita from '../../components/Report/ReportPieFrecuenciaVisita'

const Reports = ( {username} ) => {

    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())

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
            <div className='d-flex my-5'>
                <div>
                    <span>Fecha inicial</span>
                    <DatePicker
                        selected={startDate}
                        onChange={date => setStartDate(date)}
                        placeholderText="Fecha de inicio"
                    />
                </div>

                <div>
                    <span>Fecha final</span>
                    <DatePicker
                        selected={endDate}
                        onChange={date => setEndDate(date)}
                        placeholderText="Fecha final"
                    />
                </div>
                
            </div>
            <div>
                <ReportBarMeseros startDate={startDate} endDate={endDate}/>
                <ReportPieFrecuenciaVisita startDate={startDate} endDate={endDate} />
            </div>
        </div>
         

    )

}

export default Reports
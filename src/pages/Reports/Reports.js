import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import axios from 'axios'

import TopBar from '../../components/TopBar'
import DateSelector from '../../components/Report/DateSelector'
import ReportBarMeseros from '../../components/Report/ReportBarMeseros'
import ReportPieChart from '../../components/Report/ReportPieChart'
import ReportPieChart4 from '../../components/Report/ReportPieChart4'
import './Reports.css'

const Reports = ( {username, location} ) => {

    const currentDate = new Date()
    const [startDate, setStartDate] = useState(new Date(currentDate.getFullYear(), currentDate.getMonth(), 1))
    const [endDate, setEndDate] = useState(new Date())
    const [locationName, setLocationName] = useState('Cargando...')

    useEffect(() => {
        const getLocation = async () => {
            try {
                const response = await axios.get( `https://paxvox.waxy.app/api/location/${location}` )
                setLocationName( await response.data.name )
            } catch (error) {
                setLocationName( `Error al obtener el nombre de la ubicación.` )
            }
        }

        getLocation()

    }, [location])

    /**
     * Authentication checks
     */
    if (!localStorage.getItem('token')) {
        localStorage.clear();
        return <Navigate to='/' />
    }
    
    return (
        
        <div className='d-flex flex-column justify-content-start'>
            <TopBar location={locationName} username={ username }/>

            <DateSelector
                handleChangeStartDate={ periodDates => setStartDate(periodDates) }
                handleChangeEndDate={ periodDates => setEndDate(periodDates) }
                startDate={startDate}
                endDate={endDate}
            />

            <div className='d-flex flex-column justify-content-start reports-container mt-3'>               

                <div className='d-flex flex-wrap justify-content-around section-to-print'>

                    <ReportBarMeseros
                        className='flex-fill'
                        startDate={startDate}
                        endDate={endDate}
                    />

                    <ReportPieChart4
                        className='flex-fill'
                        title={`Frecuencia de Visita`}
                        endpoint={`frecuenciaVisita`}
                        startDate={startDate}
                        endDate={endDate}
                        labels={ [ 'Primera visita', 'Más de 1 vez al Año', 'Más de 1 vez al Mes', 'Más de 1 vez a la Semana' ] }
                    />

                    <ReportPieChart
                        className='flex-fill'
                        title={`Atención del Mesero`}
                        endpoint={`atencionMesero`}
                        startDate={startDate}
                        endDate={endDate}
                        labels={ [ 'Excelente', 'Bien', 'Regular', 'Mal', 'Muy Mal' ] }                               
                    />

                    <ReportPieChart
                        className='flex-fill'
                        title={`Rapidez en el Servicio`}
                        endpoint={`rapidezServicio`}
                        startDate={startDate}
                        endDate={endDate}
                        labels={ [ 'Excelente', 'Bien', 'Regular', 'Mal', 'Muy Mal' ] }
                    />

                    <ReportPieChart
                        className='flex-fill'
                        title={`Sabor y Calidad de la Comida`}
                        endpoint={`calidadComida`}
                        startDate={startDate}
                        endDate={endDate}
                        labels={ [ 'Excelente', 'Bien', 'Regular', 'Mal', 'Muy Mal' ] }
                    />

                    <ReportPieChart
                        className='flex-fill'
                        title={`Experiencia General`}
                        endpoint={`experienciaGeneral`}
                        startDate={startDate}
                        endDate={endDate}
                        labels={ [ 'Excelente', 'Bien', 'Regular', 'Mal', 'Muy Mal' ] }
                    />

                </div>

            </div>

        </div>
         

    )

}

export default Reports
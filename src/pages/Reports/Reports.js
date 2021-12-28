import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import axios from 'axios'

import TopBar from '../../components/TopBar'
import ReportBarMeseros from '../../components/Report/ReportBarMeseros'
import ReportPieChart from '../../components/Report/ReportPieChart'
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
                console.log(response.data.name)
                setLocationName( await response.data.name )
            } catch (error) {
                setLocationName( `Error al obtener el nombre de la ubicación.` )
            }
        }

        getLocation()

    }, [])

    /**
     * Authentication checks
     */
    if (!localStorage.getItem('token')) {
        localStorage.clear();
        return <Navigate to='/' />
    }
    
    return (
        
        <div className='border d-flex flex-column justify-content-start'>
            <TopBar location={locationName} username={ username }/>
            <div className='reports-container'>
                <h3 className='print-hidden'>{ 'Reportes' }</h3>
                <div className='d-flex my-5 justify-content-center dates-control print-hidden'>
                    <div className='col-6 col-sm-5 col-md-4 col-lg-3 col-xl-2 p-1'>
                        <span>Fecha inicial</span>
                        <DatePicker
                            className="col-12"
                            selected={startDate}
                            onChange={date => setStartDate(date)}
                            placeholderText="Fecha de inicio"
                        />
                    </div>

                    <div className='col-6 col-sm-5 col-md-4 col-lg-3 col-xl-2 p-1'>
                        <span>Fecha final</span>
                        <DatePicker
                            className="col-12"
                            selected={endDate}
                            onChange={date => setEndDate(date)}
                            placeholderText="Fecha final"
                        />
                    </div>
                    
                </div>

                <div className='d-flex justify-content-center section-to-print'>
                    <h4 className='text-primary'>{locationName}</h4>
                </div>

                <div className='d-flex flex-wrap justify-content-around section-to-print'>

                    <ReportBarMeseros
                        className='flex-fill'
                        startDate={startDate}
                        endDate={endDate}
                    />

                    <ReportPieChart
                        className='flex-fill'
                        title={`Frecuencia de Visita`}
                        endpoint={`frecuenciaVisita`}
                        startDate={startDate}
                        endDate={endDate}
                        labels={ ['Primera visita', 'Más de 1 vez al Año', 'Más de 1 vez al Mes', 'Más de 1 vez a la Semana']}
                    />

                    <ReportPieChart
                        className='flex-fill'
                        title={`Atención del Mesero`}
                        endpoint={`atencionMesero`}
                        startDate={startDate}
                        endDate={endDate}
                        labels={ [ 'Muy Mal', 'Mal', 'Regular', 'Bien', 'Excelente' ] }                               
                    />

                    <ReportPieChart
                        className='flex-fill'
                        title={`Rapidez en el Servicio`}
                        endpoint={`rapidezServicio`}
                        startDate={startDate}
                        endDate={endDate}
                        labels={ [ 'Muy Mal', 'Mal', 'Regular', 'Bien', 'Excelente' ] }
                    />

                    <ReportPieChart
                        className='flex-fill'
                        title={`Sabor y Calidad de la Comida`}
                        endpoint={`calidadComida`}
                        startDate={startDate}
                        endDate={endDate}
                        labels={ [ 'Muy Mal', 'Mal', 'Regular', 'Bien', 'Excelente' ] }
                    />

                    <ReportPieChart
                        className='flex-fill'
                        title={`Experiencia General`}
                        endpoint={`experienciaGeneral`}
                        startDate={startDate}
                        endDate={endDate}
                        labels={ [ 'Muy Mal', 'Mal', 'Regular', 'Bien', 'Excelente' ] }
                    />

                </div>

            </div>

        </div>
         

    )

}

export default Reports
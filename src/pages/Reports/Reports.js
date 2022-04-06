import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import axios from 'axios'

import TopBar from '../../components/TopBar'
import DateSelector from '../../components/Report/DateSelector'
import ReportBarMeseros from '../../components/Report/ReportBarMeseros'
import ReportBarCiudades from '../../components/Report/ReportBarCiudades'
import ReportBar from '../../components/Report/ReportBar'
import ReportPieChart from '../../components/Report/ReportPieChart'
import ReportPieChart4 from '../../components/Report/ReportPieChart4'
import ReportPie from '../../components/Report/ReportPie'
import './Reports.css'

const Reports = ( {username } ) => {

    const currentDate = new Date()
    const [startDate, setStartDate] = useState(new Date(currentDate.getFullYear(), currentDate.getMonth(), 1))
    const [endDate, setEndDate] = useState(new Date())
    const [locationName, setLocationName] = useState('Cargando...')
    const [location, setLocation] = useState( JSON.parse( localStorage.getItem( 'location' ) ) )

    useEffect(() => {
        const getLocation = async () => {
            try {
                const response = await axios.get( `https://paxvox.waxy.app/api/location/${location.id}` )
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
            <TopBar location={location.name} username={ username }/>

            <DateSelector
                handleChangeStartDate={ periodDates => setStartDate(periodDates) }
                handleChangeEndDate={ periodDates => setEndDate(periodDates) }
                startDate={startDate}
                endDate={endDate}
            />

            <div className='d-flex flex-column justify-content-start reports-container mt-3'>               

                <div className='d-flex flex-wrap justify-content-around section-to-print'>
                    {
                        
                        location[0].is_delivery === 0 ?
                            <>
                                <ReportBarMeseros
                                    className='flex-fill'
                                    startDate={startDate}
                                    endDate={endDate}
                                    locationId={ location[0].id }
                                    title="Participación de Meseros"
                                />
                                <ReportPieChart4
                                    className='flex-fill'
                                    title={`Frecuencia de Visita`}
                                    endpoint={`frecuenciaVisita`}
                                    startDate={startDate}
                                    endDate={endDate}
                                    labels={ [ 'Más de 1 vez al Mes', 'Primera visita', 'Más de 1 vez a la Semana', 'Más de 1 vez al Año'] }
                                />

                                <ReportPieChart
                                    className='flex-fill'
                                    title={`Atención del Mesero`}
                                    endpoint={`atencionMesero`}
                                    startDate={startDate}
                                    endDate={endDate}
                                    labels={ [ 'Muy Mal', 'Mal', 'Regular', 'Bien', 'Excelente',  ] }                           
                                />

                                <ReportPieChart
                                    className='flex-fill'
                                    title={`Rapidez en el Servicio`}
                                    endpoint={`rapidezServicio`}
                                    startDate={startDate}
                                    endDate={endDate}
                                    labels={ [ 'Muy Mal', 'Mal', 'Regular', 'Bien', 'Excelente',  ] }
                                />

                                <ReportPieChart
                                    className='flex-fill'
                                    title={`Sabor y Calidad de la Comida`}
                                    endpoint={`calidadComida`}
                                    startDate={startDate}
                                    endDate={endDate}
                                    labels={ [ 'Muy Mal', 'Mal', 'Regular', 'Bien', 'Excelente',  ] }
                                />

                                <ReportPieChart
                                    className='flex-fill'
                                    title={`Experiencia General`}
                                    endpoint={`experienciaGeneral`}
                                    startDate={startDate}
                                    endDate={endDate}
                                    labels={ [ 'Muy Mal', 'Mal', 'Regular', 'Bien', 'Excelente',  ] }
                                />
                            </>
                            :
                            <>
                                <ReportBarCiudades
                                    className='flex-fill'
                                    startDate={startDate}
                                    endDate={endDate}
                                    locationId={ location[0].id }
                                    title="Ciudades"
                                />

                                <ReportBar
                                    className='flex-fill'
                                    startDate={startDate}
                                    endDate={endDate}
                                    locationId={ location[0].id }
                                    title="Forma del Pedido"
                                    endpoint={`formaPedido`}
                                />

                                <ReportBar
                                    className='flex-fill'
                                    startDate={startDate}
                                    endDate={endDate}
                                    locationId={ location[0].id }
                                    title="Tiempo de Entrega"
                                    endpoint={`tiempoEntrega`}
                                />

                                <ReportBar
                                    className='flex-fill'
                                    startDate={startDate}
                                    endDate={endDate}
                                    locationId={ location[0].id }
                                    title={`Calidad en la Atención`}
                                    endpoint={`calidadAtencion`}
                                />

                                <ReportBar
                                    className='flex-fill'
                                    startDate={startDate}
                                    endDate={endDate}
                                    locationId={ location[0].id }
                                    title={`Sazon y presentación`}
                                    endpoint={`calidadComida`}
                                />

                                <ReportBar
                                    className='flex-fill'
                                    startDate={startDate}
                                    endDate={endDate}
                                    locationId={ location[0].id }
                                    title={`Calificacion al repartidor`}
                                    endpoint={`calificacionRepartidor`}
                                />

                            </>
                            
                    }                    

                    

                </div>

            </div>

        </div>
         

    )

}

export default Reports
import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import { Form } from 'react-bootstrap'

import TopBar from '../../components/TopBar'
import ReportBarMeseros from '../../components/Report/ReportBarMeseros'
import ReportPieChart from '../../components/Report/ReportPieChart'

const Reports = ( {username} ) => {

    const currentDate = new Date()
    const [startDate, setStartDate] = useState(new Date(currentDate.getFullYear(), currentDate.getMonth(), 1))
    const [endDate, setEndDate] = useState(new Date())
    const [percentages, setPercentages] = useState(false)

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
            <div className='d-flex my-5 justify-content-center'>
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

            <div className='d-flex justify-content-start px-5'>
                <Form.Switch
                    type="switch"
                    label="Porcentajes"
                    onChange={() => {
                        setPercentages(percentages => !percentages)
                    }}
                />
            </div>

            <div className='d-flex flex-wrap justify-content-center'>

                <ReportBarMeseros startDate={startDate} endDate={endDate}/>

                <ReportPieChart
                    title={`Frecuencia de Visita`}
                    endpoint={`frecuenciaVisita`}
                    startDate={startDate}
                    endDate={endDate}
                    labels={ ['Primera visita', 'Más de 1 vez al Año', 'Más de 1 vez al Mes', 'Más de 1 vez a la Semana']}
                    percentages={percentages}
                />

                <ReportPieChart
                    title={`Atención del Mesero`}
                    endpoint={`atencionMesero`}
                    startDate={startDate}
                    endDate={endDate}
                    labels={ [ 'Muy Mal', 'Mal', 'Regular', 'Bien', 'Excelente' ] }
                    percentages={percentages}
                />

                <ReportPieChart
                    title={`Rapidez en el Servicio`}
                    endpoint={`rapidezServicio`}
                    startDate={startDate}
                    endDate={endDate}
                    labels={ [ 'Muy Mal', 'Mal', 'Regular', 'Bien', 'Excelente' ] }
                    percentages={percentages}
                />

                <ReportPieChart
                    title={`Sabor y Calidad de la Comida`}
                    endpoint={`calidadComida`}
                    startDate={startDate}
                    endDate={endDate}
                    labels={ [ 'Muy Mal', 'Mal', 'Regular', 'Bien', 'Excelente' ] }
                    percentages={percentages}
                />

                <ReportPieChart
                    title={`Experiencia General`}
                    endpoint={`experienciaGeneral`}
                    startDate={startDate}
                    endDate={endDate}
                    labels={ [ 'Muy Mal', 'Mal', 'Regular', 'Bien', 'Excelente' ] }
                    percentages={percentages}
                />

            </div>
        </div>
         

    )

}

export default Reports
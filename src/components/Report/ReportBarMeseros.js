import { useEffect, useState } from 'react'
import axios from 'axios'
import Chart from 'react-apexcharts'

import './ReportBarMeseros.css'

const ReportBarMeseros = ( { startDate, endDate, locationId, title } )=> {

    const [meserosNames, setMeserosNames] = useState([])
    const [meserosCount, setMeserosCount] = useState([])
    
    // Esa constante va a ir aqui dentro del componente,
    // Los props meserosNames y meserosCount vendrán desde el padre del componente.
    const chartOptions = {
        options: {
            chart: {
            id: 'participacion-meseros'
            },
            plotOptions: {
                bar: {
                    horizontal: true
                }
            },
            xaxis: {
            categories: meserosNames
            }
        },
        noData: {
            text: 'Cargando...'
        },
        series: [{
          name: 'Encuestas',
          data: meserosCount
        }]
    }

    useEffect(() => {
        const getData = async () => {

            setMeserosNames([])
            setMeserosCount([])
    
            const requestData = {
                "id_location": locationId,
                "start_date":startDate.toISOString(),
                "end_date":endDate.toISOString()
            }
    
            const requestOptions = {
                headers: {
                    'Content-Type':'application/json',
                }
            }
    
            const response = await axios.post(`https://paxvox.waxy.app/api/reports/meseros`, requestData, requestOptions)
            response.data.forEach( item => {
                setMeserosNames( meserosNames => [...meserosNames, item.name] )
                setMeserosCount( meserosCount => [...meserosCount, item.count] )
            } )
    
        }
        getData()
    }, [startDate, endDate, locationId])

    return (

        <div className='chartbox border d-flex flex-column align-items-center m-1 p-1 pt-3 rounded shadow'>
            <h5>{ title }</h5>
            <Chart options={chartOptions.options} series={chartOptions.series} type={"bar"} width={'400px'} />
        </div>
        
    )

}

export default ReportBarMeseros
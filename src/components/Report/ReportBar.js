import { useEffect, useState } from 'react'
import axios from 'axios'
import Chart from 'react-apexcharts'

import './ReportBarMeseros.css'

const ReportBar = ( { startDate, endDate, locationId, title, endpoint } )=> {

    const [dataNames, setDataNames] = useState([])
    const [dataCount, setDataCount] = useState([])
    
    // Esa constante va a ir aqui dentro del componente,
    // Los props meserosNames y meserosCount vendrán desde el padre del componente.
    const chartOptions = {
        options: {
            chart: {
            id: 'data'
            },
            plotOptions: {
                bar: {
                    horizontal: true
                }
            },
            xaxis: {
            categories: dataNames
            }
        },
        noData: {
            text: 'Cargando...'
        },
        series: [{
          name: 'Encuestas',
          data: dataCount
        }]
    }

    useEffect(() => {
        const getData = async () => {
      
            const requestData = {
              "id_location": locationId,
              "start_date": startDate.toISOString(),
              "end_date": endDate.toISOString(),
              "field_name": endpoint,
            }
            
            const requestOptions = {
              headers: {
                'Content-Type': 'application/json',
              }
            }
      
            const response = await axios.post( `https://paxvox.waxy.app/api/delivery-reports`, requestData, requestOptions )
            const object = await response.data
            console.log(response.data)
            const responseArray = Object.values(object)
            const keys = Object.keys(object)
            //console.log( labels )
            //console.log( response.data )
            setDataCount( responseArray )
            setDataNames( keys )
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

export default ReportBar
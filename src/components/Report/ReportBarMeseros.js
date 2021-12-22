import { useEffect, useState } from 'react'
import axios from 'axios'
import Chart from 'react-apexcharts'

const ReportBarMeseros = ( { startDate, endDate } )=> {

    const [meserosNames, setMeserosNames] = useState([])
    const [meserosCount, setMeserosCount] = useState([])
    
    // Esa constante va a ir aqui dentro del componente,
    // Los props meserosNames y meserosCount vendrán desde el padre del componente.
    const chartOptions = {
        options: {
            chart: {
            id: 'apexchart-example'
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
          name: 'encuestas',
          data: meserosCount
        }]
    }

    useEffect(() => {
        const getData = async () => {

            setMeserosNames([])
            setMeserosCount([])
    
            const requestData = {
                "id_location": 1,
                "start_date":startDate.toISOString(),
                "end_date":endDate.toISOString()
            }
    
            const requestOptions = {
                headers: {
                    'Content-Type':'application/json',
                }
            }
    
            const response = await axios.post(`https://paxvox.waxy.app/api/reports/meseros`, requestData, requestOptions)
            response.data.map( item => {
                setMeserosNames( meserosNames => [...meserosNames, item.name] )
                setMeserosCount( meserosCount => [...meserosCount, item.count] )
            } )
    
        }
        getData()
    }, [startDate, endDate])

    return (

        <div className='border d-flex flex-column align-items-center m-1 p-1 pt-3 rounded shadow'>
            <h5>Participación de Meseros</h5>
            <Chart options={chartOptions.options} series={chartOptions.series} type={"bar"} width={468}/>
        </div>
        
    )

}

export default ReportBarMeseros
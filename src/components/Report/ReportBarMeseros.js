import { useEffect, useState } from 'react'
import axios from 'axios'
import Chart from 'react-apexcharts'

const ReportBarMeseros = ()=> {

    const [meserosNames, setMeserosNames] = useState([])
    const [meserosCount, setMeserosCount] = useState([])

    const dummyData = [
        {
            "name": "Alberto Ochoa",
            "count": 12
        },
        {
            "name": "Gonzalo Gorostiaga",
            "count": 17
        },
        {
            "name": "Victor Olvera",
            "count": 5
        }
    ]
    
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
        series: [{
          name: 'series-1',
          data: meserosCount
        }]
    }

    const getData = async () => {

        const startDate = new Date(2021, 11, 1, 0, 0, 0)// Pendiente, checar TimeZone
        const endDate = new Date(Date.now())

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
        console.log(response.data)
        response.data.map( item => {
            setMeserosNames( meserosNames => [...meserosNames, item.name] )
            setMeserosCount( meserosCount => [...meserosCount, item.count] )
        } )

    }

    useEffect(() => {
        getData()
    }, [])

    return (

        <>
            <h4>Reporte</h4>
            <Chart options={chartOptions.options} series={chartOptions.series} type={"bar"} width={500} height={320}/>
        </>
        
    )

}

export default ReportBarMeseros
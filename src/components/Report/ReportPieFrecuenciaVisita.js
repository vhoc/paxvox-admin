import axios from "axios"
import { useEffect, useState } from "react"
import ReactApexChart from "react-apexcharts"

const ReportPieFrecuenciaVisita = ( { startDate, endDate } ) => {

  const [series, setSeries] = useState([0,0,0,0])
  const labels = ['Primera Visita', 'Mas de 1 vez al Año', 'Mas de 1 vez al Mes', 'Mas de 1 vez a la Semana']

  const chartOptions = {
    series: series,
      options: {
        chart: {
          width: 468,
          type: 'pie',
        },
        labels: labels,
        responsive: [{
          breakpoint: 468,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
      }]
    }
  }

    const getData = async () => {
      
      const requestData = {
        "id_location": 1,
        "start_date": startDate.toISOString(),
        "end_date": endDate.toISOString()
      }
      
      const requestOptions = {
        headers: {
          'Content-Type': 'application/json',
        }
      }

      const response = await axios.post( 'https://paxvox.waxy.app/api/reports/frecuencia', requestData, requestOptions )
      const object = await response.data
      const responseArray = Object.values(object)
      setSeries( responseArray )

    }

    useEffect(()=> {
      getData()
    }, [startDate, endDate])

    return (
        <div className="border d-flex flex-column align-items-center m-1 p-1 pt-3 rounded shadow">
          <h5>Frecuencia de Visita</h5>
          <ReactApexChart options={chartOptions.options} series={chartOptions.series} type={"pie"} width={468} />
        </div>
    )

}

export default ReportPieFrecuenciaVisita
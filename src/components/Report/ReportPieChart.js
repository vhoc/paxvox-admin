import { useState, useEffect } from "react"
import axios from "axios"
import ReactApexChart from "react-apexcharts"

const ReportPieChart = ( { title, endpoint, startDate, endDate, labels } ) => {

    const [series, setSeries] = useState([0,0,0,0,0])
    const colors = [
        '#ff3300',
        '#ff6600',
        '#ffcf24',
        '#cccc00',
        '#00cc66'
    ]

    const chartOptions = {
        series: series,
          options: {
            chart: {
              width: 468,
              type: 'pie',
            },
            colors: colors,
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
          "end_date": endDate.toISOString(),
          "field_name": endpoint,
        }
        
        const requestOptions = {
          headers: {
            'Content-Type': 'application/json',
          }
        }
  
        const response = await axios.post( `https://paxvox.waxy.app/api/reports`, requestData, requestOptions )
        const object = await response.data
        const responseArray = Object.values(object)
        setSeries( responseArray )
  
      }
  
    useEffect(()=> {
    getData()
    }, [startDate, endDate, labels])

    return (
        <div className="border d-flex flex-column align-items-center m-1 p-1 pt-3 rounded shadow">
          <h5>{title}</h5>
          <ReactApexChart options={chartOptions.options} series={chartOptions.series} type={"pie"} width={468} />
        </div>
    )


}

export default ReportPieChart
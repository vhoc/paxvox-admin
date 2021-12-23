import { useState, useEffect } from "react"
import axios from "axios"
import ReactApexChart from "react-apexcharts"

const ReportPieChart = ( { title, endpoint, startDate, endDate, labels } ) => {

    const [series, setSeries] = useState([0,0,0,0,0])

    const colors = [
        '#ff3300',
        '#ff6600',
        '#ffcf24',
        '#99cc00',
        '#40bf80'
    ]

    const chartOptions = {
        series: series,
          options: {
            colors: colors,
            labels: labels,
            legend: {
                position: 'top',
                horizontalAlign: 'center',
                inverseOrder: true,
            },
            plotOptions: {
                pie: {
                    donut: {
                        labels: {
                            show: true,
                        }
                    }
                }
            },
            dataLabels: {
                enabled: true,
                style: {
                    fontSize: '1em'
                },
                formatter: (val, opts) => {
                    return `${opts.w.config.series[opts.seriesIndex]} 
                    (${Math.round(val)}%)`
                },
                dropShadow: {
                    enabled: true,
                }
            },
            
        }
    }

  
    useEffect(()=> {
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

        getData()
    }, [startDate, endDate, endpoint])

    return (
        <div className="border d-flex flex-column align-items-center m-1 p-1 pt-3 rounded shadow">
          <h5>{title}</h5>
          <ReactApexChart options={chartOptions.options} series={chartOptions.series} type={"donut"} width={468} />
        </div>
    )


}

export default ReportPieChart
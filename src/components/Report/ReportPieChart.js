import { useState, useEffect } from "react"
import axios from "axios"
import ReactApexChart from "react-apexcharts"
import './ReportPieChart.css'

const ReportPieChart = ( { title, endpoint, startDate, endDate, labels } ) => {

    const [series, setSeries] = useState([0,0,0,0,0])

    const colors = [    
        '#40bf80',    
        '#99cc00',
        '#ffcf24',
        '#ff6600',
        '#ff3300',
    ]

    const chartOptions = {
        series: series,
        options: {
            colors: colors,
            labels: labels,
            legend: {
                position: 'top',
                horizontalAlign: 'center',
                inverseOrder: false,
            },
            plotOptions: {
                pie: {
                    donut: {
                        labels: {
                            show: true,
                        },
                        size: '50%',
                    },
                    customScale: 0.9,
                }
            },
            dataLabels: {
                enabled: true,
                style: {
                    fontSize: '1.0em'
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
            console.log( labels )
            console.log( responseArray )
            setSeries( responseArray )
      
        }

        getData()
    }, [startDate, endDate, endpoint])

    return (
        <div className="chartbox border d-flex flex-column align-items-center m-1 p-1 pt-3 rounded shadow">
          <h5>{title}</h5>
          <span className="text-secondary">{ `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}` }</span>
          <ReactApexChart options={chartOptions.options} series={chartOptions.series} type={"donut"} width={'400px'} />
        </div>
    )


}

export default ReportPieChart
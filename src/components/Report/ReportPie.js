import { useState, useEffect } from "react"
import axios from "axios"
import ReactApexChart from "react-apexcharts"
import './ReportPieChart.css'

const ReportPie = ( { title, locationId, endpoint, startDate, endDate, colors } ) => {

    const [series, setSeries] = useState([])
    const [labels, setLabels] = useState(['WhatsApp', 'App móvil'])

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
            setSeries( responseArray )
            setLabels( keys )
        }

        getData()
    }, [startDate, endDate, endpoint, locationId])

    return (
        <div className="chartbox border d-flex flex-column align-items-center m-1 p-1 pt-3 rounded shadow">
          <h5>{title}</h5>
          <span className="text-secondary">{ `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}` }</span>
          <ReactApexChart options={chartOptions.options} series={chartOptions.series} type={"donut"} width={'400px'} />
        </div>
    )


}

export default ReportPie
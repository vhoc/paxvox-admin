import Navbar from 'react-bootstrap/Navbar'
import DatePicker from 'react-datepicker'

import './DateSelector.css'

const DateSelector = ( { handleChangeStartDate, handleChangeEndDate, startDate, endDate } ) => {

    return (

        <Navbar className='d-flex justify-content-center align-items-start section-to-print mb-3 text-white pb-2 date-selector' sticky='top'>
            <div className='col-6 col-sm-5 col-md-4 col-lg-3 col-xl-2 p-1'>
                <span>Desde:</span>
                <DatePicker
                    className="col-12 text-center form-control p-0 date-picker"
                    selected={startDate}
                    onChange={ event => handleChangeStartDate(event) }
                    placeholderText="Desde:"
                />
            </div>
            <div className='col-6 col-sm-5 col-md-4 col-lg-3 col-xl-2 p-1'>
                <span>Hasta:</span>
                <DatePicker
                    className="col-12 text-center form-control p-0 date-picker"
                    selected={endDate}
                    onChange={ event => handleChangeEndDate(event) }
                    placeholderText="Hasta:"
                />
            </div>
        </Navbar>

    )

}

export default DateSelector
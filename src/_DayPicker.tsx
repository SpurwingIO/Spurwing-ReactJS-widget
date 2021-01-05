import React, { useEffect, useState }  from 'react';
import axios from "axios";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { parse } from 'date-fns'

function DayPicker(props: any) {
 const [data, setData]: [data: any, setData: any] = useState([]);


  useEffect(() => {
    axios
      .get("http://localhost:3650/api/v2/booking/days_available.json", {
  params: {
    org_level: false,
    date_from_month: props.selectedDay,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'America/New_York',
    appointment_type_id: props.selectedAppointmentType.id,
    provider_id: props.providerId
  }})
      .then(result => setData(result.data));
  }, [props.selectedDay && props.selectedDay.getMonth()]);

  const highlightDates = data && data.days_available 
      ? data.days_available.map((day: string) => parse(day, "yyyy-MM-dd", new Date()))
      : [];

  return (
      <div className="embeddable-book-cal-container">
          <DatePicker
            inline
            useWeekdaysShort={true}
            onMonthChange={(e: any) => props.setSelectedDay(e)}
            onChange={(e: any) => props.setSelectedDay(e)}
            highlightDates={highlightDates}
          />
      </div>
  );

}

export default DayPicker;

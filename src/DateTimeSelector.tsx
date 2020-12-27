import React, { useEffect, useState }  from 'react';
import axios from "axios";
import DayPicker from './_DayPicker'
import AvailableSlots from './_AvailableSlots'


function DateTimeSelector(props: any) {
  const [selectedDay, setSelectedDay] = useState(new Date());

  return (
      <div className="embedded-scheduler-container">
        <div className="embedded-scheduler-container__title">
          Select Date and Time
        </div>

        <DayPicker 
          selectedDay={selectedDay}
          setSelectedDay={setSelectedDay}
          selectedAppointmentType={props.selectedAppointmentType}
          providerId={props.providerId}
          />
          
        <AvailableSlots
          selectedDay={selectedDay}
          setSelectedDay={setSelectedDay}
          selectedAppointmentType={props.selectedAppointmentType}
          providerId={props.providerId}
        />
      </div>
  );

}

export default DateTimeSelector;

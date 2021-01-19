import React, { useEffect, useState }  from 'react';
import axios from "axios";
import AppointmentTypeOption from './_AppointmentTypeOption'


function AppointmentTypes(props: any) {
  const [data, setData] = useState([]);


  useEffect(() => {
    axios
      .get("http://localhost:3650/api/v2/appointment_types.json", {
  params: {
    clients_can_book: true,
    provider_id: props.providerId
  }})
      .then(result => setData(result.data));
  }, []);

  const apptReadyToConfirm = !!(props.selectedAppointmentType && props.selectedContactType);

  return (
    <div className="appointment-types-container">
    <div className="embedded-appointment-type-container__title">Select Appointment Type</div>
      {data.map((item: any) => (
        <AppointmentTypeOption 
          key={item.id} 
          appointmentType={item}
          selectedAppointmentType={props.selectedAppointmentType}
          setAppointmentType={props.setAppointmentType} 
          selectedContactType={props.selectedContactType}
          setContactType={props.setContactType}
        />
      ))}
    <span className="confirm-appt-type-button-box">
      <button className="sw-button primary-button confirm-appt-type-button" 
              disabled={!apptReadyToConfirm}
              onClick={props.moveToNextStep}>
        Confirm Appointment Type
      </button>
    </span>
    </div>
  );
}

export default AppointmentTypes;

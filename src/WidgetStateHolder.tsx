import React, { useEffect, useState }  from 'react';
import axios from "axios";
import AppointmentTypes from './AppointmentTypes'
import DateTimeSelector from './DateTimeSelector'


function WidgetStateHolder() {
  const steps = ["appointment_types", "datetime_select"];

  const [selectedAppointmentType, setAppointmentType] = useState();
  const [selectedContactType, setContactType] = useState();
  const [stepIndex, setStepIndex] = useState(0);

  const currentStep = steps[stepIndex]

  if (currentStep === "appointment_types") {
    return (
      <AppointmentTypes
        selectedAppointmentType={selectedAppointmentType}
        selectedContactType={selectedContactType}
        setContactType={setContactType}
        setAppointmentType={setAppointmentType} 
        moveToNextStep={() => setStepIndex(stepIndex + 1)}
      />
    );
  }

  if (currentStep === "datetime_select") {
    return (
      <DateTimeSelector
        selectedAppointmentType={selectedAppointmentType}
        providerId={"43041487-7932-4c87-9b49-251df4b42a9c"}
      />
    );
  }
  
  return null;

}

export default WidgetStateHolder;

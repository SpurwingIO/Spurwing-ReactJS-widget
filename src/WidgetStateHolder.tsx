import React, { useEffect, useState }  from 'react';
import axios from "axios";
import AppointmentTypes from './AppointmentTypes'
import DateTimeSelector from './DateTimeSelector'
import ContactInfoForm from './ContactInfoForm'
import CompletedBookingInfo from './_CompletedBookingInfo'
import EmbeddableHeader from './_EmbeddableHeader'


function WidgetStateHolder() {
  const steps = ["appointment_types", "datetime_select", "contact_info"];

  const [selectedAppointmentType, setAppointmentType] = useState();
  const [selectedContactType, setContactType] = useState();
  const [stepIndex, setStepIndex] = useState(0);
  const [selectedSlot, setSelectedSlot] = useState();
  const [bookedAppointment, setBookedAppointment] = useState();

  const currentStep = steps[stepIndex]

  if (bookedAppointment) {
    return (<CompletedBookingInfo
              bookedAppointment={bookedAppointment}
               />)
  }

  if (currentStep === "appointment_types") {
    return (
      <>
        <EmbeddableHeader
          stepIndex={stepIndex}
          embedWidgetSteps={steps}
          setStepIndex={setStepIndex}
          headerText={"Book an Appointment"} />
        <AppointmentTypes
          selectedAppointmentType={selectedAppointmentType}
          selectedContactType={selectedContactType}
          setContactType={setContactType}
          setAppointmentType={setAppointmentType} 
          moveToNextStep={() => setStepIndex(stepIndex + 1)}
        />
      </>
    );
  }

  if (currentStep === "datetime_select") {
    return (
      <>
      <EmbeddableHeader
          stepIndex={stepIndex}
          embedWidgetSteps={steps}
          setStepIndex={setStepIndex}
          headerText={"Book an Appointment"} />
      <DateTimeSelector
        selectedAppointmentType={selectedAppointmentType}
        providerId={"43041487-7932-4c87-9b49-251df4b42a9c"}
        selectedSlot={selectedSlot}
        setSelectedSlot={setSelectedSlot}
        moveToNextStep={() => setStepIndex(stepIndex + 1)}
      />
      </>
    );
  }
  
  if (currentStep === "contact_info") {
    return (
       <>
      <EmbeddableHeader
          stepIndex={stepIndex}
          embedWidgetSteps={steps}
          setStepIndex={setStepIndex}
          headerText={"Book an Appointment"} />
      <ContactInfoForm
        selectedAppointmentType={selectedAppointmentType}
        selectedSlot={selectedSlot}
        selectedContactType={selectedContactType}
        moveToNextStep={() => setStepIndex(stepIndex + 1)}
        setBookedAppointment={setBookedAppointment}
      />
      </>
    );
  }

  return null;

}

export default WidgetStateHolder;

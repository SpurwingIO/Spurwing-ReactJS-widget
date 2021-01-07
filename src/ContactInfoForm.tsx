import React, { useEffect, useState }  from 'react';
import axios from "axios";
import { Form, Field } from 'react-final-form'


function completeBooking(values: any, props: any) {
  const slot = props.selectedSlot
  axios.post('http://localhost:3650/api/v2/booking/complete_booking.json', {
    ...values,
    date: slot.date,
    provider_id: slot.provider_id,
    appointment_type_id: (props.selectedAppointmentType || {}).id,
    contact_type: props.selectedContactType,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'America/New_York',
  })
  .then((response) => { 
    props.setBookedAppointment(response.data.appointment)
  }, (error) => {
    if (error.response && error.response.data && error.response.data.message) {
      alert(error.response.data.message)
    } else {
      alert(error);
    }
  });
}

function ContactInfoForm(props: any) {
  const [selectedDay, setSelectedDay] = useState(new Date());

  return (
      <div className="embedded-user-form contact-information">
        <Form
    onSubmit={(values: any) => completeBooking(values, props)}
    render={({ handleSubmit }) => (
      <form className="contact-information-form" onSubmit={handleSubmit}>
        <div className="embedded-main-title">
            Contact Information
        </div>

        <div className="user-form-row">
          <Field
            name="first_name"
            render={({ input, meta }) => (
              <div className="field">
                <div>
                  <label className="label" htmlFor={input.name}>First Name</label>
                </div>
                <div className="control">
                  <input className="input" placeholder={'Ex. Alice'} {...input} />
                </div>
                {meta.touched && meta.error && <span>{meta.error}</span>}
              </div>
            )}
          />

          <Field
            name="last_name"
            render={({ input, meta }) => (
              <div className="field">
                <div>
                  <label className="label" htmlFor={input.name}>Last Name</label>
                </div>
                <div className="control">
                  <input className="input" placeholder={'Ex. Smith'} {...input} />
                </div>
                {meta.touched && meta.error && <span>{meta.error}</span>}
              </div>
            )}
          />
        </div>

        <div className="user-form-row">
          <Field
            name="email"
            render={({ input, meta }) => (
              <div className="field">
                <div>
                  <label className="label" htmlFor={input.name}>Email</label>
                </div>
                <div className="control">
                  <input className="input" placeholder={'Ex. alice.smith@example.com'} {...input} />
                </div>
                {meta.touched && meta.error && <span>{meta.error}</span>}
              </div>
            )}
          />

          <Field
            name="phone_number"
            render={({ input, meta }) => (
              <div className="field">
                <div>
                  <label className="label" htmlFor={input.name}>Phone Number</label>
                </div>
                <div className="control">
                  <input className="input" placeholder={'Ex. 555-555-5555'} {...input} />
                </div>
                {meta.touched && meta.error && <span>{meta.error}</span>}
              </div>
            )}
          />
        </div>

        { props.selectedContactType ? 
        <div className="field">
          <div>
            <label className="label">Contact Type</label>
          </div>
          <div className="control">
            {props.selectedContactType}
          </div>
        </div> : null }

        <div style={{margin: "20px 0px"}}>
          <div className="has-text-centered">
              <button className="sw-button primary-button is-relative continue-button has-validation-errors" 
                value="Continue">
                  Confirm Appointment
              </button>
          </div>
        </div>

      </form>
    )}
  />
      </div>
  );

}

export default ContactInfoForm;

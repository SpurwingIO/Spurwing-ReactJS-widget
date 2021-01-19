import React, { useEffect, useState }  from 'react';
import axios from "axios";
import { format, parse } from 'date-fns'
import { toDate } from './utils/dateUtils'

function categorizeSlots(availableSlotsForRange: Array<any>) {

    if (availableSlotsForRange == null) {
      return [[],[],[]];
    }

    const morningTimes = [];
    const afternoonTimes = [];
    const eveningTimes = [];
    let i = 0;

    while (i < availableSlotsForRange.length) {
      const slot = availableSlotsForRange[i]
      const dt = slot.date;

      const date = toDate(dt)

      if (format(date, "a") === "AM" && parseInt(format(date, "H"),10) < 12) {
        morningTimes.push(slot);
      } else if ((format(date, "H") === "12") || (format(date, "H") === "17") || (parseInt(format(date, "H"),10) < 17)) {
        afternoonTimes.push(slot);
      } else {
        eveningTimes.push(slot);
      }
      i++
    }

    return [morningTimes,afternoonTimes,eveningTimes]
  }

function availableSlot(slot: any, index: number, props: any) {
	return (	
	<div 
		key={index} 
		onClick={() => props.setSelectedSlot(slot)} className={`available-slot ${props.selectedSlot == slot ? "active-slot" : ""}`}>{format(toDate(slot.date), 'h:mm a')}
	</div> );
} 

function AvailableSlots(props: any) {
 const [data, setData]: [data: any, setData: any] = useState([]);
 const timeArrays = categorizeSlots(data.slots_available);

  useEffect(() => {
    axios
      .get("http://localhost:3650/api/v2/bookings/slots_available.json", {
  params: {
    org_level: false,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'America/New_York',
    appointment_type_id: props.selectedAppointmentType.id,
    provider_id: props.providerId,
    provider_ids: props.providerIds,
    end_date: props.selectedDay.toString(),
    start_date: props.selectedDay.toString(),
    appointment_location_id: props.appointmentLocationId,
    contact_type: props.appointmentContactType,
  }})
      .then(result => setData(result.data));
  }, [props.selectedDay]);

  return (
      <div className="embeddable-availability-container">
      	<div className="embeddable-availability-triangle" />
          <div className="availability-on-header">
            <span className="availability-on-header-date">{format(props.selectedDay, "MMMM d, yyyy")}</span>
            <p className="availability-on-header-timezone"> Timezone: {Intl.DateTimeFormat().resolvedOptions().timeZone || 'America/New_York'}</p>
          </div>

          <div className="areas-of-day-flexbox">

            { !!timeArrays[0].length &&
              <div className="day-area">
                <span className="day-area-header">
                  Morning
                </span>
                <div className="available-slots-for-day">
                  { timeArrays[0].map((slot, index) => availableSlot(slot, index, props) )
                    	
                  }
                </div>
              </div>
            }

            { !!timeArrays[1].length &&
              <div className="day-area">
                <span className="day-area-header">
                  Afternoon
                </span>
                <div className="available-slots-for-day">
                  { timeArrays[1].map((slot, index) => availableSlot(slot, index, props))}
                </div>
              </div>
            }

            { !!timeArrays[2].length &&
              <div className="day-area">
                <span className="day-area-header">
                  Evening
                </span>
                <div className="available-slots-for-day">
                  { timeArrays[2].map((slot, index) => availableSlot(slot, index, props))
                  }
                </div>
              </div>
            }
          </div>
            
           { (timeArrays[0].length === 0 &&
              timeArrays[1].length === 0 &&
              timeArrays[2].length === 0) ?
                <div className="embeddable-empty-state">
                  <p className="embeddable-empty-state__title">
                    No available time slots
                  </p>
                  <p>
                    Please select a different date in the calendar.
                  </p>
                  <p>
                    You can change the month by pressing the arrow at the top right of the calendar.
                  </p>
                </div>
          :
            null
          }

          <div
            className="available-slot-action"
          >
            <button
              className="sw-button primary-button large-button slot-confirm-button"
              disabled={!props.selectedSlot}
              onClick={props.moveToNextStep}
            >
              Confirm Date and Time
            </button>         
           </div>
        </div>
  );

}

export default AvailableSlots;

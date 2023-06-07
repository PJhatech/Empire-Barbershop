const GET_APPOINTMENT = "appointment/GET_APPOINTMENT"

const getAppointment = (appointments) => ({
    type: GET_APPOINTMENT,
    appointments
})

export const fetchAllAppointments = () => async (dispatch) => {
    const response = await fetch('/api/appointments');
    if (response.ok) {
        const appointments = await response.json();
        dispatch(getAppointment(appointments))
    }
}

const initialState = {}

export default function appointmentReducer(state = initialState, action) {
    let newState = {}
    switch (action.type) {
        case GET_APPOINTMENT: {
            newState = { ...state }
            action.appointments.forEach(appointment => {
                newState[appointment.id] = appointment
            })
            return { ...newState }
            // newState[action.appointments.id] = action.appointment
            // return {...newState}
        }
        default:
            return state
    }
}

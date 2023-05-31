const GET_APPOINTMENT = "appointment/GET_APPOINTMENT"

const getAppointment = (appointment) => ({
    type: GET_APPOINTMENT,
    appointment
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
            newState[action.appointment.id] = action.appointment
            return {...newState}
        }
        default:
            return state
    }
}

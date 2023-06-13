const GET_APPOINTMENT = "appointment/GET_APPOINTMENT"
const ADD_APPOINTMENT = "appointment/ADD_APPOINTMENT"

const getAppointment = (appointments) => ({
    type: GET_APPOINTMENT,
    appointments
})

const addAppointment = (appointment) => ({
    type: ADD_APPOINTMENT,
    appointment
})

export const fetchAppointments = () => async (dispatch) => {
    const response = await fetch('/api/appointments');
    if (response.ok) {
        const appointments = await response.json();
        dispatch(getAppointment(appointments))
    };
};

export const createAppointment = (appointment) => async (dispatch) => {
    const response = await fetch('/api/apppointments', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(appointment)
    });
    if (response.ok) {
        const apppointment = await response.json()
        dispatch(addAppointment(apppointment))
    };
};

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
        }
        case ADD_APPOINTMENT: {
            newState = { ...state }
            newState[action.appointment.id]=action.appointment
            return {...newState}
        }
        default:
            return state
    }
}

const GET_APPOINTMENT = "appointment/GET_APPOINTMENT";
const GET_APPOINTMENT_BY_ID = "appointment/GET_APPOINTMENT_BY_ID";
const ADD_APPOINTMENT = "appointment/ADD_APPOINTMENT";
const DELETE_APPOINTMENT = "appointment/DELETE_APPOINTMENT";
const UPDATE_APPOINTMENT = "appointment/UPDATE_APPOINTMENT";

const getAppointment = (appointments) => ({
	type: GET_APPOINTMENT,
	appointments,
});
const getAppointmentById = (appointment) => ({
	type: GET_APPOINTMENT_BY_ID,
	appointment,
});

const addAppointment = (appointment) => ({
	type: ADD_APPOINTMENT,
	appointment,
});

const deleteAppointment = (appointment) => ({
	type: DELETE_APPOINTMENT,
	appointment,
});

const reviseAppointment = (appointment) => ({
	type: UPDATE_APPOINTMENT,
	appointment,
});

export const fetchAppointments = () => async (dispatch) => {
	const response = await fetch("/api/appointments/");
	if (response.ok) {
		const appointments = await response.json();
		dispatch(getAppointment(appointments));
	}
};

export const fetchAppointmentById = (id) => async (dispatch) => {
	const response = await fetch(`/api/appointments/${id}`);
	if (response.ok) {
		const appointment = await response.json();
		dispatch(getAppointmentById(appointment));
		return appointment;
	}
};

export const createAppointment = (appointment) => async (dispatch) => {
	console.log("<----createAppointmentFetch--->", appointment);
	console.log("Appointment data being sent:", JSON.stringify(appointment));
	const response = await fetch("/api/appointments/", {
		method: "POST",
		headers: {"Content-Type": "application/json"},
		body: JSON.stringify(appointment),
	});
	if (response.ok) {
		const apppointment = await response.json();
		dispatch(addAppointment(apppointment));
		dispatch(fetchAppointments());
	} else {
		console.error("Response not OK", await response.text());
	}
};

export const destroyAppointment = (id) => async (dispatch) => {
	// console.log(id);
	const response = await fetch(`/api/appointments/${id}`, {
		method: "DELETE",
	});
	if (response.ok) {
		dispatch(deleteAppointment(id));
	}
};

export const updateAppointment = (id, appointmenteData) => async (dispatch) => {
	const response = await fetch(`/api/appointments/${id}`, {
		method: "PUT",
		headers: {"Content-Type": "application/json"},
		body: JSON.stringify(appointmenteData),
	});
	if (response.ok) {
		const appointment = await response.json();
		dispatch(reviseAppointment(appointment));
		dispatch(fetchAppointments());
	}
};

const initialState = {};

export default function appointmentReducer(state = initialState, action) {
	let newState = {};
	switch (action.type) {
		case GET_APPOINTMENT: {
			newState = {...state};
			action.appointments.forEach((appointment) => {
				newState[appointment.id] = appointment;
			});
			return {...newState};
		}
		case GET_APPOINTMENT_BY_ID: {
			return {...state, [action.appointment.id]: action.appointment};
		}
		case ADD_APPOINTMENT: {
			newState[action.appointment.id] = action.appointment;
			return {...newState};
		}
		case DELETE_APPOINTMENT: {
			newState = {...state};
			delete newState[action.appointment];
			return newState;
		}
		case UPDATE_APPOINTMENT: {
			newState[action.appointment.id] = action.appointment;
			return {...newState};
		}
		default:
			return state;
	}
}

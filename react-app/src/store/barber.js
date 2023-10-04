const GET_BARBER = "barber/GET_BARBER";
const GET_BARBER_BY_ID = "barber/GET_BARBER_BY_ID";
const GET_BARBER_APPOINTMENTS = "barber/GET_BARBER_APPOINTMENTS"
const ADD_BARBER = "barber/ADD_BARBER";

const getBarbers = (barbers) => ({
	type: GET_BARBER,
	barbers,
});

const getBarberById = (barber) => ({
	type: GET_BARBER_BY_ID,
	barber,
});

const getBarberAppointments = (barber) => ({
	type: GET_BARBER_APPOINTMENTS,
	barber,
});

const addBarber = (barber) => ({
	type: ADD_BARBER,
	barber,
});

export const fetchBarbers = () => async (dispatch) => {
	const response = await fetch("/api/users/barbers/");
	if (response.ok) {
		const barbers = await response.json();
		dispatch(getBarbers(barbers));
    }
   //  console.log("<--------fetchBarbers-------->", response)
};

export const fetchBarberIndex = (id) => async (dispatch) => {
	const response = await fetch(`/api/users/barbers/${id}/`);
	if (response.ok) {
		const barber = await response.json();
		dispatch(getBarberById(barber));
	}

	// console.log("<--------fetchBarberIndex-------->", response)
};

// export const fetchBarberAppointments = (id) => async (dispatch) => {
// 	const response = await fetch(`/api/users/barbers/${id}/appointments/`);
// 	if (response.ok) {
// 		const barberAppointments = await response.json();
// 		dispatch(getBarberAppointments(barberAppointments));
// 	}

// 	console.log("<--------fetchBarberAppointments-------->", id)
// };

export const createBarber = (barber) => async (dispatch) => {
	const response = await fetch("/api/barbers/", {
		method: "POST",
		headers: {"Content-Type": "application/json"},
		body: JSON.stringify(barber),
	});
	if (response.ok) {
		const barber = await response.json();
		dispatch(addBarber(barber));
	}
};

const initialState = {};

export default function barberReducer(state = initialState, action) {
	let newState = {};
	switch (action.type) {
		case GET_BARBER: {
			newState = {...state};
			action.barbers.forEach((barber) => {
				newState[barber.id] = barber;
			});
			return {...newState};
		}
		case GET_BARBER_BY_ID: {
            newState[action.barber.id] = action.barber
            return {...newState}
        }
		case GET_BARBER_APPOINTMENTS: {
            newState[action.barber.id] = action.barber
            return {...newState}
        }
		case ADD_BARBER: {
			newState = {...state};
			newState[action.barber.id] = action.barber;
			return {...newState};
		}
		default:
			return state;
	}
}

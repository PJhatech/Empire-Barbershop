const GET_BARBER = "barber/GET_BARBER";
const ADD_BARBER = "barber/ADD_BARBER";

const getBarber = (barbers) => ({
	type: GET_BARBER,
	barbers,
});

const addBarber = (barbers) => ({
	type: ADD_BARBER,
	barbers,
});

export const fetchBarbers = () => async (dispatch) => {
	const response = await fetch("/api/barbers");
	if (response.ok) {
		const barbers = await response.json();
		dispatch(getBarber(barbers));
    }
    console.log("<--------here-------->", response)
};

export const createBarber = (barber) => async (dispatch) => {
	const response = await fetch("/api/barbers", {
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
		case ADD_BARBER: {
			newState = {...state};
			newState[action.barber.id] = action.barber;
			return {...newState};
		}
		default:
			return state;
	}
}

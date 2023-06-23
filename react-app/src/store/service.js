const GET_SERVICE = "service/GET_SERVICE";
const ADD_SERVICE = "service/ADD_SERVICE";

const getService = (services) => ({
	type: GET_SERVICE,
	services,
});

const addService = (services) => ({
	type: ADD_SERVICE,
	services,
});

export const fetchServices = () => async (dispatch) => {
	const response = await fetch("/api/services");
	if (response.ok) {
		const services = await response.json();
		dispatch(getService(services));
	}
};

export const createService = (service) => async (dispatch) => {
	console.log('<----createService---->', service)
	const response = await fetch(`/api/services`, {
		method: "POST",
		headers: {"Content-Type": "application/json"},
		body: JSON.stringify(service),
	});
	if (response.ok) {
		const service = await response.json();
		dispatch(addService(service));
	}
};

const initialState = {};

export default function serviceReducer(state = initialState, action) {
	let newState = {};
	switch (action.type) {
		case GET_SERVICE: {
			newState = {...state};
			action.services.forEach((service) => {
				newState[service.id] = service;
			});
			return {...newState};
		}
		case ADD_SERVICE: {
			newState[action.services.id] = action.services;
			return {...newState};
		}
		default:
			return state;
	}
}

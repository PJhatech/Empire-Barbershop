const GET_SERVICES = "service/GET_SERVICES";
const GET_SERVICE_BY_ID = "service/GET_SERVICE_BY_ID";
const ADD_SERVICE = "service/ADD_SERVICE";
const DELETE_SERVICE = "service/DELETE_SERVICE";
const UPDATE_SERVICE = "service/UPDATE_SERVICE";

const getService = (services) => ({
	type: GET_SERVICES,
	services,
});

const getServiceById = (service) => ({
	type: GET_SERVICE_BY_ID,
	service
})

const addService = (services) => ({
	type: ADD_SERVICE,
	services,
});

const deleteService = (service) => ({
	type: DELETE_SERVICE,
	service
})

const reviseService = (service) => ({
	type: UPDATE_SERVICE,
	service
})



export const fetchServices = () => async (dispatch) => {
	const response = await fetch("/api/services");
	if (response.ok) {
		const services = await response.json();
		dispatch(getService(services));
	}
};

export const fetchServicekById = (id) => async (dispatch) => {
	const response = await fetch(`/api/services/${id}`);
	if (response.ok) {
		const service = await response.json();
		dispatch(getServiceById(service));
		return service
	}
};

export const createService = (service) => async (dispatch) => {
	// console.log('<----createService---->', service)
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

export const destroyService = (id) => async (dispatch) => {
	console.log(id)
	const response = await fetch(`/api/services/${id}`, {
		method: "DELETE",
	});
	if (response.ok) {
		dispatch(deleteService(id));
	}
};

export const updateService = (id, serviceData) => async (dispatch) => {
	const response = await fetch(`/api/services/${id}`, {
		method: "PUT",
		headers: {"Content-Type": "application/json"},
		body: JSON.stringify(serviceData),
	});
	if (response.ok) {
		const service = await response.json();
		dispatch(reviseService(service));
	}
};

const initialState = {};

export default function serviceReducer(state = initialState, action) {
	let newState = {};
	switch (action.type) {
		case GET_SERVICES: {
			newState = {...state};
			action.services.forEach((service) => {
				newState[service.id] = service;
			});
			return {...newState};
		}
		case GET_SERVICE_BY_ID: {
			return {
				...state,
				[action.service.id]: action.service,
			};
		}
		case ADD_SERVICE: {
			newState[action.services.id] = action.services;
			return {...newState};
		}
		case UPDATE_SERVICE: {
			newState[action.service.id] = action.service;
			return {...newState};
		}
		case DELETE_SERVICE: {
			newState = {...state};
			delete newState[action.service];
			return newState;
		}
		default:
			return state;
	}
}

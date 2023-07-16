const GET_LOCATIONS = "location/GET_LOCATIONS";
const GET_LOCATION_BY_ID = "location/GET_LOCATION_BY_ID";
const ADD_LOCATION = "location/ADD_LOCATION";
// const DELETE_SERVICE = "location/DELETE_SERVICE";
// const UPDATE_SERVICE = "location/UPDATE_SERVICE";

const getLocations = (locations) => ({
	type: GET_LOCATIONS,
	locations,
});

const getLocationById = (location) => ({
	type: GET_LOCATION_BY_ID,
	location,
});

const addLocation = (location) => ({
	type: ADD_LOCATION,
	location,
});

// const deleteService = (location) => ({
// 	type: DELETE_SERVICE,
// 	location,
// });

// const reviseService = (location) => ({
// 	type: UPDATE_SERVICE,
// 	location,
// });

export const fetchLocations = () => async (dispatch) => {
	const response = await fetch("/api/locations/");
	if (response.ok) {
		const locations = await response.json();
		dispatch(getLocations(locations));
	}
};

export const fetchLocationById = (id) => async (dispatch) => {
	const response = await fetch(`/api/locations/${id}`);
	if (response.ok) {
		const location = await response.json();
		dispatch(getLocationById(location));
		return location;
	}
};

export const createLocation = (location) => async (dispatch) => {
	// console.log('<----createLocation---->', location)
	const response = await fetch(`/api/locations/`, {
		method: "POST",
		headers: {"Content-Type": "application/json"},
		body: JSON.stringify(location),
	});
	if (response.ok) {
		const location = await response.json();
		dispatch(addLocation(location));
	}
};

// export const destroyService = (id) => async (dispatch) => {
// 	console.log(id);
// 	const response = await fetch(`/api/locations/${id}`, {
// 		method: "DELETE",
// 	});
// 	if (response.ok) {
// 		dispatch(deleteService(id));
// 	}
// };

// export const updateService = (id, serviceData) => async (dispatch) => {
// 	const response = await fetch(`/api/locations/${id}`, {
// 		method: "PUT",
// 		headers: {"Content-Type": "application/json"},
// 		body: JSON.stringify(serviceData),
// 	});
// 	if (response.ok) {
// 		const location = await response.json();
// 		dispatch(reviseService(location));
// 	}
// };

const initialState = {};

export default function locationReducer(state = initialState, action) {
	let newState = {};
	switch (action.type) {
		case GET_LOCATIONS: {
			newState = {...state};
			action.locations.forEach((location) => {
				newState[location.id] = location;
			});
			return {...newState};
		}
		case GET_LOCATION_BY_ID: {
			return {...state, [action.location.id]: action.location};
		}
		case ADD_LOCATION: {
			newState[action.locations.id] = action.locations;
			return {...newState};
		}
		// case UPDATE_SERVICE: {
		// 	newState[action.location.id] = action.location;
		// 	return {...newState};
		// }
		// case DELETE_SERVICE: {
		// 	newState = {...state};
		// 	delete newState[action.location];
		// 	return newState;
		// }
		default:
			return state;
	}
}

const GET_LOCATIONS = "location/GET_LOCATIONS";
const GET_LOCATION_BY_ID = "location/GET_LOCATION_BY_ID";
const ADD_LOCATION = "location/ADD_LOCATION";
const DELETE_LOCATION = "location/DELETE_LOCATION";
const UPDATE_LOCATION = "location/UPDATE_LOCATION";

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

const deleteLocation = (location) => ({
	type: DELETE_LOCATION,
	location,
});

const reviseLocation = (location) => ({
	type: UPDATE_LOCATION,
	location,
});

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
	console.log('<----createLocation---->', location)
	const response = await fetch(`/api/locations/`, {
		method: "POST",
		headers: {"Content-Type": "application/json"},
		body: JSON.stringify(location),
	});
	if (response.ok) {
		response.status("Successfully created location.")
		const location = await response.json();
		dispatch(addLocation(location));
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

export const destroyLocation = (id) => async (dispatch) => {
	console.log(id);
	const response = await fetch(`/api/locations/${id}`, {
		method: "DELETE",
	});
	if (response.ok) {
		dispatch(deleteLocation(id));
	}
};

export const updateLocation = (id, locationData) => async (dispatch) => {
	const response = await fetch(`/api/locations/${id}`, {
		method: "PUT",
		headers: {"Content-Type": "application/json"},
		body: JSON.stringify(locationData),
	});
	if (response.ok) {
		const location = await response.json();
		dispatch(reviseLocation(location));
		return dispatch(fetchLocations())
	}
};

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
		case UPDATE_LOCATION: {
			newState[action.location.id] = action.location;
			return {...newState};
		}
		case DELETE_LOCATION: {
			newState = {...state};
			delete newState[action.location];
			return newState;
		}
		default:
			return state;
	}
}

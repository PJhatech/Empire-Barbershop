const GET_CLIENT = "client/GET_CLIENT";
const ADD_CLIENT = "client/ADD_CLIENT";

const getClient = (clients) => ({
	type: GET_CLIENT,
	clients,
});

const addClient = (clients) => ({
	type: ADD_CLIENT,
	clients,
});

export const fetchClients = () => async (dispatch) => {
	const response = await fetch("/api/clients");
	if (response.ok) {
		const clients = await response.json();
		dispatch(getClient(clients));
	}
	console.log("<--------here-------->", response);
};

export const createClient = (client) => async (dispatch) => {
	const response = await fetch("/api/clients", {
		method: "POST",
		headers: {"Content-Type": "application/json"},
		body: JSON.stringify(client),
	});
	if (response.ok) {
		const client = await response.json();
		dispatch(addClient(client));
	}
};

const initialState = {};

export default function clientReducer(state = initialState, action) {
	let newState = {};
	switch (action.type) {
		case GET_CLIENT: {
			newState = {...state}
			action.clients.forEach(client => {
				newState[client.id] = client
			})
            // newState[action.clients.id] = action.clients
			return {...newState}
		}
		case ADD_CLIENT: {
			newState = {...state};
			newState[action.client.id] = action.client;
			return {...newState};
		}
		default:
			return state;
	}
}

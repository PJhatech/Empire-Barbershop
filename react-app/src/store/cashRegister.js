const GET_REGISTER = "register/GET_REGISTER";
const ADD_TRANSACTION = "register/ADD_TRANSACTION";
const DELETE_ITEM = "register/DELETE_ITEM";

const getRegister = (register) => ({
    type: GET_REGISTER,
    register
});


const addTransaction = (transaction) => ({
	type: ADD_TRANSACTION,
	transaction,
});

const deleteItem = (item) => ({
	type: DELETE_ITEM,
	item,
});

export const fetchRegister = () => async (dispatch) => {
    const response = await fetch('/api/register/');
    if (response.ok) {
        const register = await response.json();
        dispatch(getRegister(register))
    }
}

export const createTransaction = (transaction) => async (dispatch) => {
	const response = await fetch("/api/register", {
		method: "POST",
		headers: {"Content-Type": "application/json"},
		body: JSON.stringify(transaction),
	});
	if (response.ok) {
		const transaction = await response.json();
		dispatch(addTransaction(transaction));
	}
};

export const destroyItem = (item) => async (dispatch) => {
	const response = await fetch(`/api/register/${item}`, {
		method: "DELETE",
	});
	if (response.ok) {
		dispatch(deleteItem(item));
	}
};

const initialState = {};

export default function cashRegisterReducer(state = initialState, action) {
	let newState = {};
	switch (action.type) {
		case GET_REGISTER: {
			return {
				...state,
				[action.register.id]: action.register,
			};
		}
		case ADD_TRANSACTION: {
			newState = {...state};
			newState[action.transaction.id] = action.transaction;
			return {...newState};
		}
		case DELETE_ITEM: {
			newState = {...state};
			delete newState[action.item];
			return newState;
		}
		default:
			return state;
	}
}

const GET_REGISTER = "register/GET_REGISTER";

const getRegister = (register) => ({
    type: GET_REGISTER,
    register
});

export const fetchRegister = () => async (dispatch) => {
    const response = await fetch('/api/register/');
    if (response.ok) {
        const register = await response.json();
        dispatch(getRegister(register))
    }
}

const initialState = {};

export default function cashRegisterReducer(state = initialState, action) {
	let newState = {};
	switch (action.type) {
        case GET_REGISTER: {
            return {
                ...state, [action.register.id]: action.register
            }
        }
		default:
			return state;
	}
}

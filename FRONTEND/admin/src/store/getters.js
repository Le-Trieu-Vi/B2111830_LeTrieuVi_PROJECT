export const user = (state) => {
	return state.user;
}

export const isAuthenticated = (state) => {
	return !!state.user;
}

export const newOrderCount = (state) => {
	return state.newOrderCount;
}



export const user = (context, user) => {
	context.commit('user', user);
}

export const getNewOrderCount = ({commit}) => {
	commit('setNewOrderCount');
}
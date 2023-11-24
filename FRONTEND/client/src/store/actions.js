export const user = (context, user) => {
	context.commit('user', user);
}

export const getCartItems = ({commit}) => {
	commit('setCartItems');
}

export const getAllOrders = ({commit}) => {
	commit('setAllOrders');
}

export const getProcessingOrderCount = ({commit}) => {
	commit('setProcessingOrderCount');
}

export const getCompletedOrderCount = ({commit}) => {
	commit('setCompletedOrderCount');
}

export const addToCart = ({commit}, product) => {
	commit('addToCart', product);
}

export const removeFromCart = ({commit}, product) => {
	commit('removeFromCart', product);
}

export const removeProductCompletely = ({commit}, product) => {
	commit('removeProductCompletely', product);
}

export const makeEmptyCart = ({commit}) => {
	commit('makeEmptyCart');
}

export const changeProductCount = ({commit}, {product, count}) => {
	commit('changeProductCount', {product, count});
}


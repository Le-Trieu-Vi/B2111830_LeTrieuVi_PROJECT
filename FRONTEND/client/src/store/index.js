import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import state from './state';
import * as getters from './getters';
import * as mutations from './mutations';
import * as actions from './actions';

const store = createStore({
	state,
	getters,
	mutations,
	actions,
	plugins: [createPersistedState()],
});

export default store;

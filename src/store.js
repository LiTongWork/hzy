import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
		activeIndex: "1-1"
  },
  mutations: {
		// 更新index
		setIndex(state, index) {
			state.activeIndex = index;
		}
  },
  actions: {

  }
})

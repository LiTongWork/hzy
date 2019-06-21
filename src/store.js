import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
	// 个人中心左侧导航栏选中位置
	index: '1-2'
  },
  mutations: {
	updateIndex (state) {
		state.index = localStorage.getItem('index') 
	}
  },
  actions: {

  }
})

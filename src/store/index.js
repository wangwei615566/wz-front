import Vue from 'vue'
import Vuex from 'vuex'
import {getAdminInfo} from '../api/getData'
import {Message} from 'element-ui'

Vue.use(Vuex)

const state = {
	adminInfo: {
		avatar: 'default.jpg'
	},
}

const mutations = {
	saveAdminInfo(state, adminInfo){
		state.adminInfo = adminInfo;
	}
}

const actions = {
	getAdminData(){
		try{
            getAdminInfo().then(response => {
                if (response.code == 200) {
                    Message({
                        type: 'success',
                        message: '登录成功'
                    });
                    this.$router.push('manage')
                } else {
                    Message({
                        type: 'error',
                        message: response.msg
                    });
                }
            })
		}catch(err){
			console.log('您尚未登陆或者session失效')
		}
	}
}

export default new Vuex.Store({
	state,
	actions,
	mutations,
})

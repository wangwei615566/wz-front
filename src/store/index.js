import Vue from 'vue'
import Vuex from 'vuex'
import {getAdminInfo} from '../api/getData'
import {Message} from 'element-ui'
import Router from '../router/index'

Vue.use(Vuex)
Vue.use(Router)

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

                } else {
                    Message({
                        type: 'warning',
                        message: '您尚未登陆或者session失效'
                    });
                    Router.push('/')
                }
            })
		}catch(err){
			console.log('您尚未登陆或者session失效')
		}
	},
    getLoginData(){
        try{
            getAdminInfo().then(response => {
                if (response.code == 200) {
                    Router.push('manage')
                } else {
                    Message({
                        type: 'warning',
                        message: '您尚未登陆或者session失效'
                    });
                    Router.push('/')
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

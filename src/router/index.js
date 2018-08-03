import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const login = r => require.ensure([], () => r(require('@/page/login')), 'login');
const manage = r => require.ensure([], () => r(require('@/page/manage')), 'manage');
const home = r => require.ensure([], () => r(require('@/page/home')), 'home');
const userList = r => require.ensure([], () => r(require('@/page/userList')), 'userList');
const blackList = r => require.ensure([], () => r(require('@/page/blackList')), 'blackList');
const orderList = r => require.ensure([], () => r(require('@/page/orderList')), 'orderList');
const system = r => require.ensure([], () => r(require('@/page/system')), 'system');

const routes = [
	{
		path: '/',
		component: login
	},
	{
		path: '/manage',
		component: manage,
		name: '',
		children: [{
			path: '',
			component: home,
			meta: [],
		},{
			path: '/userList',
			component: userList,
			meta: ['用户管理', '用户列表'],
		},{
            path: '/blackList',
            component: blackList,
            meta: ['用户管理', '冻结用户列表'],
        },{
			path: '/system',
			component: system,
			meta: ['系统参数设置'],
		},{
            path: '/orderList',
            component: orderList,
            meta: ['订单管理'],
        }]
	}
]

export default new Router({
	routes,
	strict: process.env.NODE_ENV !== 'production',
})

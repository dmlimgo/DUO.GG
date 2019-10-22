/* eslint-disable no-tabs */
/* eslint-disable indent */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import MatchNow from '@/views/MatchNow.vue'
import MatchLater from '@/views/MatchLater.vue'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'home',
		component: Home
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		// component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
	},
	{
		path: '/matchnow',
		name: 'matchnow',
		component: MatchNow
	},
	{
		path: '/matchlater',
		name: 'matchlater',
		component: MatchLater
	}
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router

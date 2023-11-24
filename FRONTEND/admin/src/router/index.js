import { createWebHistory, createRouter } from "vue-router";
import store from '@/store/index.js';

const routes = [
	{
		path: '/admin/login',
		name: 'LoginPage',
		component: () => import('@/views/LoginPage.vue'),
		meta: { guest: true },
	},
	{
		path: '/admin',
		alias: '/',
		name: 'App',
		redirect: '/admin/dashboard',
		meta: { requiresAuth: true },
		children: [
			{
				path: 'dashboard',
				name: 'DashBoard',
				component: () => import('@/views/DashBoard.vue'),
				props: true
			},
			{
				path: 'products',
				name: 'ProductManage',
				component: () => import('@/views/ProductManage.vue'),
				props: true
			},
			{
				path: 'users',
				name: 'UserManage',
				component: () => import('@/views/UserManage.vue'),
				props: true
			},
			{
				path: 'orders',
				name: 'OrderManage',
				component: () => import('@/views/OrderManage.vue'),
				props: true
			},
			{
				path: '/notification',
				name: 'NotificationPage',
				component: () => import('@/views/NotificationPage.vue'),
				props: true
			},
			{
				path: 'info',
				name: 'AdminInfo',
				component: () => import('@/views/AdminInfo.vue'),
				props: true
			},
			{
				path: 'info/update',
				name: 'UpdateAdminInfo',
				component: () => import('@/views/UpdateAdminInfo.vue'),
				props: true
			},
		]
	},
	{
		path: '/:pathMatch(.*)*',
		name: 'NotFoundPage',
		component: () => import('@/views/NotFoundPage.vue'),
	}
]

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	scrollBehavior(to, from, savedPosition) {
		// always scroll to top
		return { top: 0 }
	},
	routes,
});

router.beforeEach((to, from, next) => {
	if (to.matched.some(record => record.meta.requiresAuth)) {
		if (store.getters.isAuthenticated) {
			next();
			return;
		}
		next('/admin/login');
	} else {
		next();
	}
})

export default router;

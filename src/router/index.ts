import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LogIn from "../views/LogIn.vue";
import SignUp from "../views/SignUp.vue";
import store from '../store/index';
import RecordsList from "@/views/RecordsList.vue";
import GameView from "@/views/GameView.vue";
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    props: { store },
    meta: { requiresAuth: true }
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/sign-up',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/log-in',
    name: 'LogIn',
    component: LogIn
  },
  {
    path: '/records',
    name: 'Records',
    component: RecordsList,
    meta: { requiresAuth: true }
  },
  {
    path: '/game',
    name: 'Game',
    component: GameView,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('access');
  const isTryingToAccessProtectedRoute = to.matched.some(record => record.meta.requiresAuth);

  if (!isAuthenticated && isTryingToAccessProtectedRoute) {
    next('/log-in');
  } else {
    next();
  }
});
export default router

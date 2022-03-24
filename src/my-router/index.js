import Vue from 'vue';
// import VueRouter from 'vue-router';
import MyVueRouter from './my-vue-router';
import Home from '../views/Home.vue';

// VueRouter是一个插件，需要在Vue的use方法中注册
Vue.use(MyVueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
];

const router = new MyVueRouter({
  routes
});

export default router;

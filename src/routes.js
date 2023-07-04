import { createWebHistory, createRouter } from "vue-router";
import MainPage from "./components/MainPage.vue";
import FilmCard from "./components/FilmCard.vue";
import Rates from './components/Rates.vue';
import Tabs from './components/Tabs.vue';

const routes = [
    {
        name: 'main',
        path: '/main',
        component: MainPage,
    },
    {
        path: '',
        redirect: {name: 'main'}
    },
    {
      path: '/film/:id',
      component: FilmCard
    },
    {
      path: '/rates',
      component: Rates
    },
    {
      path: '/tabs',
      component: Tabs
    },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
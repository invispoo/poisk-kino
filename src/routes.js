import { createWebHistory, createRouter } from "vue-router";
import MainPage from "./components/MainPage.vue";
import FilmCard from "./components/FilmCard.vue";
//import Rates from './components/Rates.vue';
//import Tabs from './components/Tabs.vue';

const routes = [
    {
        name: 'find-film',
        path: '/find-film',
        component: MainPage,
    },
    {
        path: '',
        redirect: {name: 'find-film'}
    },
    {
      path: '/find-film/:id',
      component: FilmCard
    },
    /*{
      path: '/find-film/tabs',
      component: Tabs
    },
    {
      path: '/find-film/rates',
      component: Rates
    },*/
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
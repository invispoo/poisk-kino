import { createWebHistory, createRouter } from "vue-router";
import MainPage from "./components/MainPage.vue";
import FilmCard from "./components/FilmCard.vue";

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
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
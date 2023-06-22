import { createWebHistory, createRouter } from "vue-router";
import MainPage from "./components/MainPage.vue";
import FilmCard from "./components/FilmCard.vue";

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
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
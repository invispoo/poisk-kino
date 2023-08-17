<template>
    <div class="container">
        <!--Главная страница-->
        <toolbar v-if="isHomeShowed">
            <template #filter>
                <film-filter
                    @search="filmArray = $event"
                    @sort="filmArray = $event"
                    :json="json"
                />
            </template>
            <template #buttons>
                <TabIcon @switch="switchToTabs" :isOnMainPage="true" />
                <LikeOutlined @click="switchToRates" class="icon" />
            </template>
        </toolbar>

        <!--Страница с закладками-->
        <toolbar v-if="isTabsShowed">
            <template #filter>
                <film-filter
                    @search="filmArray = $event"
                    @sort="filmArray = $event"
                    :json="tabsList"
                />
            </template>
            <template #buttons>
                <HomeOutlined @click="switchToHome" class="icon" />
                <LikeOutlined @click="switchToRates" class="icon" />
            </template>
        </toolbar>

        <!--Страница с оценками-->
        <toolbar v-if="isRatesShowed">
            <template #filter>
                <film-filter
                    @search="filmArray = $event"
                    @sort="filmArray = $event"
                    :json="ratedJson"
                />
            </template>
            <template #buttons>
                <TabIcon @switch="switchToTabs" :isOnMainPage="true" />
                <HomeOutlined @click="switchToHome" class="icon" />
            </template>
        </toolbar>

        <!--Отображение карточек фильмов-->
        <div class="card-view">
            <u class="large-text">
                <h1 v-if="isTabsShowed" class="large-text">
                    Фильмы в закладках
                </h1>
                <h1 v-if="isRatesShowed" class="large-text">
                    Оцененные фильмы
                </h1>
            </u>
            <div style="padding-top: 10px">
                <span v-if="unsuccessfulSearch">
                    <h1 class="medium-text">
                        По вашему запросу ничего не найдено...
                    </h1>
                    <h2 style="color: white">
                        Попробуйте изменить условия поиска.
                    </h2>
                </span>
                <span v-if="tabsList.length === 0 && isTabsShowed">
                    <h1 class="medium-text">
                        Вы еще не добавляли фильмы в закладки.
                    </h1>
                </span>
                <span v-if="ratesList.length === 0 && isRatesShowed">
                    <h1 class="medium-text">Вы еще не оценивали фильмы.</h1>
                </span>
            </div>
            <a-row :gutter="[32, 40]">
                <a-col :span="4" v-for="el in filmArray.slice(start, end)">
                    <router-link :to="'/find-film/' + index">
                        <film-card
                            @id="index = $event"
                            :element="el"
                            :shortcutView="true"
                        />
                    </router-link>
                </a-col>
            </a-row>
        </div>

        <div style="padding: 30px">
            <pagination :filmArray="filmArray" @page="onPage" />
        </div>
    </div>
</template>

<script>
    import json from "../assets/kinopoisk.json"
    import FilmCard from "./FilmCard.vue"
    import FilmFilter from "./FilmFilter.vue"
    import Pagination from "./Pagination.vue"
    import Toolbar from "./Toolbar.vue"
    import TabIcon from "../icons/TabIcon.vue"
    import { mapState, mapActions } from "pinia"
    import { useTabStore } from "../store/tabs.js"
    import { useRateStore } from "../store/rates.js"
    import { usePageStore } from "../store/pages.js"
    import { LikeOutlined, HomeOutlined } from "@ant-design/icons-vue"

    export default {
        components: {
            FilmCard,
            FilmFilter,
            Pagination,
            Toolbar,
            LikeOutlined,
            HomeOutlined,
            TabIcon,
        },
        created() {
            //Для возврата на последний вид главной страницы после просмотра расширенной карточки фильма
            if (this.isHomeShowed) this.switchToHome()
            else if (this.isTabsShowed) this.switchToTabs()
            else if (this.isRatesShowed) {
                this.switchToRates()
            }
        },
        computed: {
            ...mapState(useTabStore, ["tabsList"]),
            ...mapState(useRateStore, ["ratesList"]),
            ...mapState(usePageStore, [
                "isHomeShowed",
                "isTabsShowed",
                "isRatesShowed",
            ]),
            unsuccessfulSearch() {
                return (
                    (this.filmArray.length === 0 && this.isHomeShowed) ||
                    (this.filmArray.length === 0 &&
                        this.tabsList.length > 0 &&
                        this.isTabsShowed) ||
                    (this.filmArray.length === 0 &&
                        this.ratesList.length > 0 &&
                        this.isRatesShowed)
                )
            },
        },
        data() {
            return {
                json: json.docs,
                index: null, //id фильма для перехода по страницам
                filmArray: [], //массив фильмов, отображаемый на странице в данный момент
                ratedJson: [], //массив элементов исходной базы данных, которым пользователь поставил оценку
                start: null, //начальный индекс выводимого массива для пагинации
                end: null, //конечный индекс выводимого массива для пагинации
            }
        },
        methods: {
            ...mapActions(usePageStore, ["goToHome", "goToTabs", "goToRates"]),
            //При смене страницы обновляются начальные и конечные индексы выводимого массива
            onPage(start, end) {
                this.start = start
                this.end = end
            },
            switchToHome() {
                this.filmArray = this.json
                this.goToHome()
            },
            switchToTabs() {
                this.filmArray = this.tabsList
                this.goToTabs()
            },
            //Создание и заполнение массива оцененных пользователем фильмов элементами из исходной БД
            switchToRates() {
                this.ratedJson = []
                for (let i = 0; i < this.ratesList.length; i++) {
                    let ratedFilm = this.json.find(
                        (film) => +film.id === +this.ratesList[i].id
                    )
                    if (this.ratedJson.indexOf(ratedFilm) === -1) {
                        this.ratedJson.push(ratedFilm)
                    }
                }
                this.filmArray = this.ratedJson
                this.goToRates()
            },
        },
    }
</script>

<style>
    .container {
        min-height: 900px;
    }

    .card-view {
        padding: 80px 95px;
        margin: 0 auto;
    }

    .icon {
        font-size: 35px;
        color: white !important;
    }

    .medium-text {
        font-size: 30px;
        color: white;
    }

    .large-text {
        font-size: 38px;
        color: white;
    }
</style>

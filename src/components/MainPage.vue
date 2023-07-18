<template>
    <div class="container">
        <toolbar v-if="isHomeShowed">
            <template #filter>
                <film-filter 
                @search="filmArray = $event"
                @sort="filmArray = $event"
                :json="json"
                />
            </template>
            <template #buttons>
                    <svg @click="switchToTabs"
                    fill="#FFFFFF" width="35px" height="35px" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg" stroke="#FFFFFF" stroke-width="65" style="padding-top: 5px;">
                        <path d="m960.481 1412.11 511.758 307.054V170.586c0-31.274-25.588-56.862-56.862-56.862H505.586c-31.274 0-56.862 25.588-56.862 56.862v1548.578l511.757-307.055ZM1585.963 1920 960.48 1544.711 335 1920V170.586C335 76.536 411.536 0 505.586 0h909.79c94.05 0 170.587 76.536 170.587 170.586V1920Z"/>
                    </svg>
                    <LikeOutlined @click="switchToRates" style="font-size: 35px; color:#FFFFFF"/> 
            </template>
        </toolbar>

        <toolbar v-if="isTabsShowed">
            <template #filter>
                <film-filter 
                @search="filmArray = $event"
                @sort="filmArray = $event"
                :json="tabsList"
                />
            </template>
            <template #buttons>
                    <HomeOutlined @click="switchToHome" style="font-size: 35px; color:#FFFFFF"/> 
                    <LikeOutlined @click="switchToRates" style="font-size: 35px; color:#FFFFFF"/> 
            </template>
        </toolbar>

        <toolbar v-if="isRatesShowed">
            <template #filter>
                <film-filter 
                @search="filmArray = $event"
                @sort="filmArray = $event"
                :json="rateArray"
                />
            </template>
            <template #buttons>
                    <svg @click="switchToTabs" 
                    fill="#FFFFFF" width="35px" height="35px" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg" stroke="#FFFFFF" stroke-width="65" style="padding-top: 5px;">
                        <path d="m960.481 1412.11 511.758 307.054V170.586c0-31.274-25.588-56.862-56.862-56.862H505.586c-31.274 0-56.862 25.588-56.862 56.862v1548.578l511.757-307.055ZM1585.963 1920 960.48 1544.711 335 1920V170.586C335 76.536 411.536 0 505.586 0h909.79c94.05 0 170.587 76.536 170.587 170.586V1920Z"/>
                    </svg>
                    <HomeOutlined @click="switchToHome" style="font-size: 35px; color:#FFFFFF"/> 
            </template>
        </toolbar>

        <div class="card-view">
            <div>
                <u style="color:white">
                    <h1 v-if="isTabsShowed" style="font-size: 38px">Фильмы в закладках</h1>
                    <h1 v-if="isRatesShowed" style="font-size: 38px">Оцененные фильмы</h1>
                </u>
            </div>
            <div style="padding-top: 10px">
                <span v-if="unsuccessfulSearch">
                    <h1 style="font-size: 30px">По вашему запросу ничего не найдено...</h1>
                    <h2>Попробуйте изменить условия поиска.</h2>
                </span>
                <span v-if="tabsList.length === 0 && isTabsShowed">
                    <h1 style="font-size: 30px">Вы еще не добавляли фильмы в закладки.</h1>
                </span>
                <span v-if="ratesList.length === 0 && isRatesShowed">
                    <h1 style="font-size: 30px">Вы еще не оценивали фильмы.</h1>
                </span>
            </div>
            <a-row :gutter="[40, 40]">
                <a-col :span="4" v-for="el in filmArray.slice(start, end)">
                    <router-link :to="'/find-film/' + index">
                        <film-card @id="index = $event" :element="el" :shortcutView="true"/>
                    </router-link>
                </a-col>
            </a-row>
        </div>

        <div style="padding: 30px;">
            <pagination :filmArray="filmArray" @page="onPage"/>
        </div>
    </div>
</template>

<script>
    import json from '../assets/kinopoisk.json'
    import FilmCard from './FilmCard.vue'
    import FilmFilter from './FilmFilter.vue'
    import Pagination from './Pagination.vue'
    import Toolbar from './Toolbar.vue'
    import { mapState, mapActions } from 'pinia'
    import { useTabStore } from '../store/tabs.js'
    import { useRateStore } from '../store/rates.js'
    import { usePageStore } from '../store/pages.js'
    import { LikeOutlined, HomeOutlined } from '@ant-design/icons-vue'
    
    export default {
        components: {
            FilmCard, FilmFilter, Pagination, Toolbar, LikeOutlined, HomeOutlined, 
        },
        created() {
            if (this.isHomeShowed)
                this.switchToHome();
            else if (this.isTabsShowed)
                this.switchToTabs();
            else if (this.isRatesShowed) {
                this.switchToRates();
            }
        },
        computed: {
            ...mapState(useTabStore, ['tabsList']),
            ...mapState(useRateStore, ['ratesList']),
            ...mapState(usePageStore, ['isHomeShowed', 'isTabsShowed', 'isRatesShowed']),
            unsuccessfulSearch () {
                return (this.filmArray.length === 0 && this.isHomeShowed) 
                || (this.filmArray.length === 0 && this.tabsList.length > 0 && this.isTabsShowed)
                || (this.filmArray.length === 0 && this.ratesList.length > 0 && this.isRatesShowed);
            }
        }, 
        data () {
            return {
                json: json.docs,
                index: Number,
                filmArray: Array,
                rateArray: Array,
                start: Number,
                end: Number,
            }
        },
        methods: {
            ...mapActions(usePageStore, ['goToHome', 'goToTabs', 'goToRates']),
            onPage (start, end) {
                this.start = start;
                this.end = end;
            },
            switchToHome () {
                this.filmArray = this.json;
                this.goToHome();
            },
            switchToTabs () {
                this.filmArray = this.tabsList;
                this.goToTabs();
            },
            switchToRates () {
                this.rateArray = [];
                for (let i = 0; i < this.ratesList.length; i++) {
                    let ratedFilm = this.json.find(film => +film.id === +this.ratesList[i].id);
                    if (this.rateArray.indexOf(ratedFilm) === -1)
                        this.rateArray.push(ratedFilm);
                }
                this.filmArray = this.rateArray;
                this.goToRates();
            },
        } 
    }
</script>

<style>
    .container {
        min-height: 900px;
    }

    .card-view {
        padding: 80px 80px; 
        margin: 0 auto;
    }
</style>

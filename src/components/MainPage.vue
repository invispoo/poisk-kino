<template>
    <div>
        <toolbar>
            <template #filter>
                <film-filter 
                @search="filmArray = $event"
                @sort="filmArray = $event"
                :json="json"
                />
            </template>
            <template #buttons>
                <router-link :to="'/find-film/tabs'">
                    <svg fill="#FFFFFF" width="35px" height="35px" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg" stroke="#FFFFFF" stroke-width="65" style="padding-top: 5px;">
                        <path d="m960.481 1412.11 511.758 307.054V170.586c0-31.274-25.588-56.862-56.862-56.862H505.586c-31.274 0-56.862 25.588-56.862 56.862v1548.578l511.757-307.055ZM1585.963 1920 960.48 1544.711 335 1920V170.586C335 76.536 411.536 0 505.586 0h909.79c94.05 0 170.587 76.536 170.587 170.586V1920Z"/>
                    </svg>
                </router-link>
                <router-link :to="'/find-film/rates'">
                    <LikeOutlined style="font-size: 35px; color:#FFFFFF"/> 
                </router-link>
            </template>
        </toolbar>

        <div class="card-view">
            <a-row :gutter="[40, 40]">
                <a-col :span="4" v-for="el in filmArray.slice(start, end)">
                    <router-link :to="'/find-film/' + index">
                        <film-card @id="index = $event" :element="el" :shortcutView="true"/>
                    </router-link>
                </a-col>
            </a-row>
        </div>
        <div style="padding-top: 30px; padding-bottom: 30px;">
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
    import { LikeOutlined } from '@ant-design/icons-vue'
    
    export default {
        components: {
            FilmCard, FilmFilter, LikeOutlined, Pagination, Toolbar
        },
        created() {
            this.filmArray = this.json;
        },
        data() {
            return {
                json: json.docs,
                index: Number,
                filmArray: Array,
                start: Number,
                end: Number,
            }
        },
        methods: {
            onPage (start, end) {
                this.start = start;
                this.end = end;
            },
        } 
    }
</script>

<style>
    .card-view {
        padding: 80px 80px; 
        margin: 0 auto;
    }
    .toolbar {
        box-sizing: border-box;
        background-color: #616161;
        width: 100%;
        height: 100px;
    }

    .background {
        box-sizing: border-box !important;
        background-color: #424242 !important;
        padding: 0;
        margin: 0;
    }
</style>

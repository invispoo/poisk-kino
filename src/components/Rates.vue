<template>
    <toolbar>
        <template #filter>
            <film-filter 
            @search="filmArray = $event"
            @sort="filmArray = $event"
            :json="rateArray"/>
        </template>
    </toolbar>
    <div class="card-view">
        <h1 style="padding-bottom: 30px;">Оцененные фильмы</h1>
        <a-row :gutter="[24, 24]">
            <a-col :span="4" v-for="el in filmArray.slice(start, end)">
                <router-link :to="'/find-film/' + index">
                    <film-card @id="index = $event" :element="el" :shortcutView="true"/>
                </router-link>
            </a-col>
        </a-row>
        <div style="padding-top: 30px; padding-bottom: 30px;">
            <pagination :filmArray="filmArray" @page="onPage"/>
        </div>
    </div> 
    <div style="padding-top: 30px; padding-bottom: 30px;">
        <pagination :filmArray="filmArray" @page="onPage"/>
    </div>
</template>

<script>
    import { useRateStore } from '../store/rates.js'
    import { mapState } from 'pinia'
    import json from '../assets/kinopoisk.json'
    import FilmCard from './FilmCard.vue'
    import FilmFilter from './FilmFilter.vue'
    import Pagination from './Pagination.vue';
    import Toolbar from './Toolbar.vue'
    import { HomeOutlined } from '@ant-design/icons-vue'

    export default {
        components: {
            FilmCard, FilmFilter, Pagination, Toolbar, HomeOutlined
        },
        computed: {
            ...mapState(useRateStore, ['ratesList']),
            
        },
        created () {
            for (let i = 0; i < this.ratesList.length; i++) {
                let ratedFilm = this.json.find(film => +film.id === +this.ratesList[i].id);
                this.rateArray.push(ratedFilm)
            }
            this.filmArray = this.rateArray;
        },
        data() {
            return {
                json: json.docs,
                index: Number,
                filmArray: Array,
                rateArray: [],
                start: Number,
                end: Number
            }
        },
        methods: {
            onPage (start, end) {
                this.start = start;
                this.end = end;
            }
        },
    }

</script>
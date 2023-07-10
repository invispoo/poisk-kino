<template>
    <h1 style="text-align: left">Оцененные фильмы</h1>
    <film-filter @search="filmArray = $event"
                 @sort="filmArray = $event"
                 :json="rateArray"/>
    <div style="padding: 15px 0; text-align: center; margin: 0 auto">
            <a-row :gutter="[24, 24]">
                <a-col :span="4" v-for="(el, ind) in filmArray">
                    <router-link :to="'/film/' + index">
                        <film-card @id="index = $event" :element="el" :shortcutView="true"/>
                    </router-link>
                </a-col>
            </a-row>
            <div style="padding-top: 30px; padding-bottom: 30px;">
                <a-pagination :total="40"/>
            </div>
        </div> 
</template>

<script>
    import { useRateStore } from '../store/rates.js'
    import { mapState } from 'pinia'
    import FilmCard from './FilmCard.vue'
    import json from '../assets/kinopoisk.json'
    import FilmFilter from './FilmFilter.vue'

    export default {
        components: {
            FilmCard, FilmFilter
        },
        computed: {
            ...mapState(useRateStore, ['ratesList']),
            
        },
        created () {
            for (let i = 0; i < this.ratesList.length; i++) {
                let ratedFilm = this.myjson.find(film => +film.id === +this.ratesList[i].id);
                this.rateArray.push(ratedFilm)
            }
            this.filmArray = this.rateArray;
        },
        data() {
            return {
                myjson: json.docs,
                index: Number,
                filmArray: Array,
                rateArray: [],
            }
        },
        methods: {
            ratedFilm (index) {
                return this.myjson.find(film => film.id === +this.ratesList[index].id);
            }
        },
    }

</script>
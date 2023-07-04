<template>
    <h1 style="text-align: left">Оцененные фильмы</h1>
    <div style="padding: 15px 0; text-align: center; margin: 0 auto">
            <a-row :gutter="[24, 24]">
                <a-col :span="4" v-for="(el, ind) in ratesList">
                    <router-link :to="'/film/' + index">
                        <film-card @id="index = $event" :element="ratedFilm(ind)" :shortcutView="true"/>
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

    export default {
        components: {
            FilmCard
        },
        computed: {
            ...mapState(useRateStore, ['ratesList']),
            
        },
        data() {
            return {
                json: json.docs,
                index: Number,
            }
        },
        methods: {
            ratedFilm (index) {
                return this.json.find(film => film.id === +this.ratesList[index].id);
            }
        },
    }

</script>
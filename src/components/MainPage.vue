<template>
    <div>
        <a-row style="display: flex; align-items: center; justify-content: space-between; align-items: start;">
            <a-col>
                <p style="font-size: 3.2em;">Поиск кино</p>
            </a-col>
            <a-col style="margin-top: 20px;">
                <film-filter 
                @search="filmArray = $event"
                @sort="filmArray = $event"
                />
            </a-col>
        </a-row>

        <div style="padding: 15px 0; text-align: center; margin: 0 auto">
            <a-row :gutter="[24, 24]">
                <a-col :span="4" v-for="el in filmArray">
                    <router-link :to="'/film/' + index">
                        <film-card @id="index = $event" :element="el" :shortcutView="true"/>
                    </router-link>
                </a-col>
            </a-row>
            <div style="padding-top: 30px; padding-bottom: 30px;">
                <a-pagination :total="40"/>
            </div>
        </div> 
    </div>
</template>

<script>
    import json from '../assets/kinopoisk.json'
    import FilmCard from './FilmCard.vue'
    import FilmFilter from './FilmFilter.vue'
    
    export default {
        components: {
            FilmCard, FilmFilter
        },
        created() {
            this.filmArray = json.docs;
        },
        computed: {
            
        },
        data() {
            return {
                json: json.docs,
                index: Number,
                filmArray: Array,
            }
        },
        methods: {
            
        } 
    }
</script>

<style>

</style>

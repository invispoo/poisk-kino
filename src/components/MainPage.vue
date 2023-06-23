<template>
    <div>
        <!--Здесь нужна фиксированная ширина или обычные флекс боксы-->
        <a-row style="display: flex; align-items: center; justify-content: space-between; padding-top: 50px;">
            <a-col>
                <h1 style="padding-top: 10px;">Поиск кино</h1>
            </a-col>
            <a-col>
                <film-filter :showSearch="true" :json="filmArray" @search="onSearch"/>
            </a-col>
        </a-row>
        <div style="display: flex; justify-content: flex-end;">
            <film-filter :json="json" @sort="filmArray = $event"/>
        </div>
        <div style="height: 770px; padding-top: 20px;">
            <a-row :gutter="[24, 24]">
                <a-col :span="6" 
                v-if="searchFlag" 
                v-for="el in searchArray">
                    <router-link :to="'/film/' + index">
                        <film-card @id="index = $event" :element="el" :shortcutView="true"/>
                    </router-link>
                </a-col>
                <a-col :span="6" 
                v-else 
                v-for="el in filmArray">
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
            console.log(1)
            this.filmArray = json.docs;
        },
        computed: {

        },
        data() {
            return {
                json: json.docs,
                index: Number,
                filmArray: Array,
                searchFlag: false,
                searchArray: Array,
            }
        },
        methods: {
            onSearch (array, flag) {
                this.searchArray = array;
                this.searchFlag = flag;
            }
        } 
    }
</script>

<style>

</style>

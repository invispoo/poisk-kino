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
                :json="json"
                />
            </a-col>
            <a-col>
                <router-link :to="'/tabs'">
                    <svg fill="#464455" width="35px" height="35px" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg" stroke="#464455" stroke-width="40" style="padding-top:4px;">
                        <!--<path d="m960.481 1412.11 511.758 307.054V170.586c0-31.274-25.588-56.862-56.862-56.862H505.586c-31.274 0-56.862 25.588-56.862 56.862v1548.578l511.757-307.055ZM1585.963 1920 960.48 1544.711 335 1920V170.586C335 76.536 411.536 0 505.586 0h909.79c94.05 0 170.587 76.536 170.587 170.586V1920Z"/>-->
                        <path d="M1585.963 1920 960.48 1544.711 335 1920V170.586C335 76.536 411.536 0 505.586 0h909.79c94.05 0 170.587 76.536 170.587 170.586V1920Z"/>
                    </svg>
                </router-link>
                <router-link :to="'/rates'">
                    <LikeOutlined style="font-size: 32px; color:#464455"/>  
                </router-link>
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
                <a-pagination v-model:current="current" :total="40"/>
                {{ current }}
            </div>
        </div> 
    </div>
</template>

<script>
    import Icon, { LikeOutlined } from '@ant-design/icons-vue';
    import json from '../assets/kinopoisk.json'
    import FilmCard from './FilmCard.vue'
    import FilmFilter from './FilmFilter.vue'
    
    export default {
        components: {
            FilmCard, FilmFilter, Icon, LikeOutlined
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
                current: 1
            }
        },
        methods: {
            
        } 
    }
</script>

<style>

</style>

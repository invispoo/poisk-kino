<template>
    <toolbar>
        <template #filter>
            <film-filter 
            @search="filmArray = $event"
            @sort="filmArray = $event"
            :json="tabsList"/>
        </template>
    </toolbar>
    <div class="card-view">
        <h1 style="padding-bottom: 30px;">Фильмы в закладках</h1>
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
    import { useTabStore } from '../store/tabs.js'
    import { mapState } from 'pinia'
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
            ...mapState(useTabStore, ['tabsList']),
            
        },
        created () {
            this.filmArray = this.tabsList;
        },
        data() {
            return {
                index: Number,
                filmArray: Array,
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
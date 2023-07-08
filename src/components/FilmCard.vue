<template>
    <div v-if="shortcutView" @click="$emit('id', element.id)">
        <a-card hoverable :title="element.name">
            <template #cover>
                <img alt="example" :src="element.poster.url" />
            </template>
            <a-card-meta>
                <template #description>{{element.shortDescription}}
                    <p>{{ element.rating.kp }}</p>
                    <h3>{{ element.movieLength }}</h3>
                </template>
            </a-card-meta>
        </a-card>
    </div>

    <div v-else>
        <a-row type="flex" justify="start" :gutter="48">
            <a-col :span="8">
                <img alt="example" :src="film.poster.url" height="600"/>   
            </a-col>
            <a-col :span="16" style="text-align:left">
                <span style="display: flex; align-items: start; justify-content: space-between;">
                    <h1>{{ film.name }}</h1>
                    <a-button type="link" size="large" @click="manageTab(id)">
                        <template #icon>
                            <icon>
                                <template #component>
                                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style="padding-top: 6px;">
                                        <path d="M15.75 5H8.25C7.55964 5 7 5.58763 7 6.3125V19L12 15.5L17 19V6.3125C17 5.58763 16.4404 5 15.75 5Z" 
                                        stroke="#464455"
                                        v-if="!isAddedToTabs"
                                        fill="none"
                                        />
                                        <path d="M15.75 5H8.25C7.55964 5 7 5.58763 7 6.3125V19L12 15.5L17 19V6.3125C17 5.58763 16.4404 5 15.75 5Z" 
                                        stroke="#464455"
                                        v-if="isAddedToTabs"
                                        :fill="color"
                                        />
                                    </svg>
                                </template>
                            </icon>
                        </template>
                    </a-button>
                </span>
                <i><h2>{{ alternativeName }}</h2></i>
                <a-space>
                    <h2>{{ rating }}</h2>
                    <h2>{{ film.year }}</h2>
                    <h2>{{ movieLength }}</h2>
                </a-space>
                <h3>{{ film.description }}</h3>
                <h2>Оценить {{ userRate }}
                    <a-rate allow-half
                    v-model:value="userRate"
                    :allow-clear="false"
                    @click="setRate(id, userRate)"/>
                </h2>
            </a-col>
            <a-col :span="4">
            </a-col>
        </a-row>
    </div>
    
</template>

<script>
    import json from '../assets/kinopoisk.json'
    import Icon from '@ant-design/icons-vue';
    import { useRateStore } from '../store/rates.js'
    import { useTabStore } from '../store/tabs.js'
    import { mapState, mapActions } from 'pinia'
    export default {
        components: {
            Icon
        },
        props: ['element', 'shortcutView'],
        created () {
            let ratedFilm = this.ratesList.find(film => +film.id === +this.id);
            if (ratedFilm) 
                this.userRate = ratedFilm.rate;
        },
        data () {
            return {
                color: '#464455',
                json: json.docs,
                index: null,
                userRate: 0,
            }
        },
        computed: {
            ...mapState(useTabStore, ['tabsList']),
            ...mapState(useRateStore, ['ratesList']),
			id (){
				return this.$route.params.id;
			},
            film () { 
                return this.json.find(film => film.id === +this.id);
            },
            movieLength () {
                let length = this.film.movieLength;
                let output = '';
                if (length / 60 >= 1){
                    output += (parseInt(length / 60)) + ' ч ';
                }
                if (length % 60 !== 0){
                    output += (length % 60) + ' м';
                }
                return output;
            },
            alternativeName () {
                if (this.film.alternativeName !== null)
                    return '"' + this.film.alternativeName + '"'; //интерполяция??
            },
            rating () {
                let rating = this.film.rating;
                if (rating.imdb !== 0)
                    return rating.imdb;
                else if (rating.imdb === 0 && rating.kp !== 0)
                    return rating.kp;
            },
            isAddedToTabs () {
                return this.tabsList.find(film => +film.id === +this.id) ? true : false;
            },
        },
        methods: {
            ...mapActions(useRateStore, ['setRate']),
            ...mapActions(useTabStore, ['manageTab']),
        }
    }
</script>

<style scoped>
</style>
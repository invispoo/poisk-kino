<template>
    <div>
        <div v-if="shortcutView" @click="$emit('id', element.id)">
            <a-card hoverable class="film-card">
                <template #cover>
                    <img alt="example" :src="element.poster.url" height="385"/>
                </template>
                <a-card-meta>
                    <template #description>
                            <h2 style="color:black !important;">
                                <a-tooltip v-if="element.name.length > 29" :title="element.name" placement="bottomLeft" color="#757575">
                                    <span>
                                        {{ shortenedName }}
                                    </span>
                                </a-tooltip>
                                <span v-else>
                                    {{ element.name }}
                                </span>
                                
                            </h2>
                        <a-space :size="5" style="display: flex; align-items: start;">
                            <StarOutlined style="font-size: 12px"/>
                            <h4 style="color:#757575;">
                                {{ element.rating.kp.toFixed(2) }}
                            </h4>
                        </a-space>
                    </template>
                </a-card-meta>
            </a-card>
        </div>

        <div v-else class="film-page">
            <a-row type="flex" justify="center" :gutter="40" style="padding: 100px 200px">
                <a-col :span="8">
                    <img alt="example" :src="film.poster.url" height="600"/>   
                </a-col>
                <a-col :span="12">
                    <span class="film-title">
                        <h1>{{ film.name }}</h1>
                        <svg @click="manageTab(film)"
                        width="50px" height="50px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.75 5H8.25C7.55964 5 7 5.58763 7 6.3125V19L12 15.5L17 19V6.3125C17 5.58763 16.4404 5 15.75 5Z" 
                            :stroke="iconColor"
                            v-if="!isAddedToTabs"
                            fill="none"
                            />
                            <path d="M15.75 5H8.25C7.55964 5 7 5.58763 7 6.3125V19L12 15.5L17 19V6.3125C17 5.58763 16.4404 5 15.75 5Z" 
                            :stroke="iconColor"
                            v-if="isAddedToTabs"
                            :fill="iconColor"
                            />
                        </svg>
                    </span>
                    <i><h2>{{ alternativeName }}</h2></i>
                    <a-space :size="10">
                        <h2>{{ film.rating.kp.toFixed(2) }}</h2>
                        <h2>{{ film.year }}</h2>
                        <h2>{{ movieLength }}</h2>
                    </a-space>
                    <h3 class="film-description">{{ film.description }}</h3>
                    <span class="film-rate">
                        <h2>Оценить
                            <a-rate allow-half
                            v-model:value="userRate"
                            :allow-clear="false"
                            @click="setRate(id, userRate)" 
                            style="padding: 0 5px"/>
                        </h2>
                    </span>
                </a-col>
            </a-row>
        </div>
    </div>
</template>

<script>
    import json from '../assets/kinopoisk.json'
    import Icon from '@ant-design/icons-vue';
    import { useRateStore } from '../store/rates.js'
    import { useTabStore } from '../store/tabs.js'
    import { mapState, mapActions } from 'pinia'
    import { StarOutlined } from '@ant-design/icons-vue'

    export default {
        components: {
            Icon, StarOutlined
        },
        props: ['element', 'shortcutView'],
        created () {
            let ratedFilm = this.ratesList.find(film => +film.id === +this.id);
            if (ratedFilm) 
                this.userRate = ratedFilm.rate;
        },
        data () {
            return {
                iconColor: '#FFFFFF',
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
                    return `"${this.film.alternativeName}"`;
            },
            isAddedToTabs () {
                return this.tabsList.find(film => +film.id === +this.id) ? true : false;
            },
            shortenedName () {
                return +this.element.id === 1387021 ? `${this.element.name.slice(0, 19)}...` : `${this.element.name.slice(0, 29)}...`;
            }
        },
        methods: {
            ...mapActions(useRateStore, ['setRate']),
            ...mapActions(useTabStore, ['manageTab']),
        }
    }
</script>

<style>

    h1, h2, h3 {
        color: white !important;
    }

    .film-card {
        height: 530px;
        border-radius: 10%;
    }

    .film-page {
        color: white;
        min-height: 900px;
        overflow: hidden;
    }

    .film-title {
        display: flex;
        align-items: start;
        justify-content: space-between;
    }
    
    .film-description {
        text-align: justify; 
        line-height: 2.1;
        font-size: 17px;
        font-weight: 500;
        margin-top: 20px;
    }

    .film-rate {
        display: flex;
        align-items: start;
        margin-top: 30px;
    }
    
</style>
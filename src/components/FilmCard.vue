<template>
    <!--Сокращенный формат карточки фильма-->
    <div v-if="shortcutView" @click="$emit('id', element.id)">
        <a-card hoverable class="film-card">
            <template #cover>
                <img alt="example" :src="element.poster.url" height="385"/>
            </template>
            <a-card-meta>
                <template #description>
                        <h2 style="color:black !important;">
                            <!--Подсказка для сокращенных названий фильмов-->
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

    <!--Расширенный формат карточки фильма-->
    <div v-else class="film-page">
        <router-link :to="'/find-film'">
            <arrow-left-outlined class="arrow-button" style="color: white;"/>
        </router-link>
        <a-row type="flex" justify="center" :gutter="40" style="padding: 60px 200px 80px">
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
        <div v-if="isFilmMatched" :style="recommendationPadding">
            <h1 style="padding-bottom: 30px;">Рекомендуем посмотреть</h1>
            <a-row :gutter="recommendationGutter">
                <a-col :span="recommendationSpan" v-for="el in regMatch">
                    <router-link :to="'/find-film/' + index">
                        <film-card @id="index = $event" :element="el" :shortcutView="true"/>
                    </router-link>
                </a-col>
            </a-row>
        </div>
    </div>
</template>

<script>
    import json from '../assets/kinopoisk.json'
    import { useRateStore } from '../store/rates.js'
    import { useTabStore } from '../store/tabs.js'
    import { mapState, mapActions } from 'pinia'
    import { StarOutlined, ArrowLeftOutlined} from '@ant-design/icons-vue'

    export default {
        components: {
            StarOutlined, ArrowLeftOutlined
        },
        props: ['element', 'shortcutView'],
        created () {
            //Отображает оценку пользователя на странице фильма, если она есть
            let ratedFilm = this.ratesList.find(film => +film.id === +this.id);
            if (ratedFilm) 
                this.userRate = ratedFilm.rate;
        },
        data () {
            return {
                iconColor: '#FFFFFF',
                json: json.docs,
                index: null, //id фильма для перехода по страницам
                userRate: 0, //оценка фильма, поставленная пользователем
                isFilmMatched: true //есть ли рекомендованные фильмы к данному
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
            //Отображает, добавлял ли пользователь данный фильм в закладки
            isAddedToTabs () {
                return this.tabsList.find(film => +film.id === +this.id) ? true : false;
            },
            //Выводит сокращенную форму имени, если оно слишком длинное(для сокращенных выводится подсказка)
            shortenedName () {
                return +this.element.id === 1387021 ? `${this.element.name.slice(0, 19)}...` : `${this.element.name.slice(0, 29)}...`;
            },
            //Вычисляемые стили для рекомендованных фильмов
            recommendationPadding () {
                return this.regMatch.length < 5 ? 'padding: 0 325px 100px;' : 'padding: 0 130px 100px;';
            },
            recommendationGutter () {
                return this.regMatch.length < 5 ? 65 : [40, 40];
            },
            recommendationSpan () {
                return this.regMatch.length < 5 ? 6 : 4;
            },
            // Ищет похожие фильмы опираясь на одинаковые имена/названия(имена актеров, режиссеров, серии фильмов),
            //а также на жанры, упомянутые в описании фильмов. Подходящие под это условия строки ищутся в названии фильма,
            //его сокращенном и полном описании в исходной базе данных
            regMatch () {
                this.isFilmMatched = false;
                let matchingFilms = [];
                let reg = /[А-Я][а-яё]*((?=:|$|\s\d)|\s[А-Я][а-яё]*)|[Бб]оевик|[Дд]рам|[Дд]етектив|[Мм]ульт|[Аа]нимац|[Фф]антаст|[Сс]ериал|Marvel/g;
                let filmMatch = [];
                let nameMatch = this.film.name.match(reg);
                let descriptionMatch = this.film.description.match(reg);
                if (this.film.shortDescription) {
                    let shortMatch = this.film.shortDescription.match(reg);
                    if (shortMatch)
                        filmMatch = filmMatch.concat(shortMatch);
                }
                if (nameMatch)
                    filmMatch = filmMatch.concat(nameMatch);
                if (descriptionMatch)
                    filmMatch = filmMatch.concat(descriptionMatch);
                for (let i = 0; i < this.json.length; i++) {
                    let jsonMatch = [];
                    let nameJsonMatch = this.json[i].name.match(reg);
                    let descriptionJsonMatch = this.json[i].description.match(reg);
                    if (this.json[i].shortDescription) {
                        let shortJsonMatch = this.json[i].shortDescription.match(reg);
                        if (shortJsonMatch)
                            jsonMatch = jsonMatch.concat(shortJsonMatch);
                    }
                    if (nameJsonMatch)
                        jsonMatch = jsonMatch.concat(nameJsonMatch);
                    if (descriptionJsonMatch)
                        jsonMatch = jsonMatch.concat(descriptionJsonMatch);
                    if (jsonMatch && filmMatch) {
                        for (let j = 0; j < jsonMatch.length; j++) {
                            jsonMatch[j] = jsonMatch[j].replace(":", "");
                            for (let k = 0; k < filmMatch.length; k++) {
                                filmMatch[k] = filmMatch[k].replace(":", "");
                                if (jsonMatch[j] === filmMatch[k] && this.film.id !== this.json[i].id && matchingFilms.indexOf(this.json[i]) === -1) {
                                    matchingFilms.push(this.json[i]);
                                    break;
                                }
                            }
                        }
                    }
                }
                //Отображает рекомендованные фильмы, если они есть
                if (matchingFilms.length > 0) 
                    this.isFilmMatched = true;               
                return matchingFilms;
            },
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

    .arrow-button {
        font-size: 40px; 
        padding: 40px 0 0 40px;
    }
</style>
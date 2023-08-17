<template>
    <!--Сокращенный формат карточки фильма-->
    <div v-if="shortcutView" @click="$emit('id', element.id)">
        <a-card hoverable class="film-card">
            <template #cover>
                <img alt="example" :src="element.poster.url" height="385" />
            </template>
            <a-card-meta>
                <template #description>
                    <h2 style="color: black">
                        <!--Подсказка для сокращенных названий фильмов-->
                        <a-tooltip
                            v-if="element.name.length > 29"
                            :title="element.name"
                            placement="bottomLeft"
                            color="#757575"
                        >
                            <span>
                                {{ shortenedName }}
                            </span>
                        </a-tooltip>
                        <span v-else>
                            {{ element.name }}
                        </span>
                    </h2>
                    <a-space :size="5" style="display: flex; align-items: start">
                        <StarOutlined style="font-size: 12px" />
                        <h4 style="color: #757575">
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
            <arrow-left-outlined class="arrow-button" />
        </router-link>
        <a-row
            type="flex"
            justify="center"
            :gutter="40"
            style="padding: 60px 200px 80px"
        >
            <a-col :span="8">
                <img alt="example" :src="film.poster.url" height="600" />
            </a-col>
            <a-col :span="12">
                <span class="film-title">
                    <h1 class="header">{{ film.name }}</h1>
                    <TabIcon
                        @manage="manageTab(film)"
                        :isAddedToTabs="isAddedToTabs"
                    />
                </span>
                <i><h2 class="header">{{ alternativeName }}</h2></i>
                <a-space :size="10">
                    <h2 class="header">{{ film.rating.kp.toFixed(2) }}</h2>
                    <h2 class="header">{{ film.year }}</h2>
                    <h2 class="header">{{ movieLength }}</h2>
                </a-space>
                <h3 class="film-description header">{{ film.description }}</h3>
                <span class="film-rate">
                    <h2 class="header">
                        Оценить
                        <a-rate
                            allow-half
                            v-model:value="userRate"
                            :allow-clear="false"
                            @click="setRate(currentFilmId, userRate)"
                            style="padding: 0 5px"
                        />
                    </h2>
                </span>
            </a-col>
        </a-row>
        <div v-if="isFilmMatched" :style="recommendationStyles.padding">
            <h1 class="header" style="padding-bottom: 30px">
                Рекомендуем посмотреть
            </h1>
            <a-row :gutter="recommendationStyles.gutter">
                <a-col :span="recommendationStyles.span" v-for="el in regMatch">
                    <router-link :to="'/find-film/' + recommendedFilmId">
                        <film-card
                            @id="recommendedFilmId = $event"
                            :element="el"
                            :shortcutView="true"
                        />
                    </router-link>
                </a-col>
            </a-row>
        </div>
    </div>
</template>

<script>
    import json from "../assets/kinopoisk.json"
    import { useRateStore } from "../store/rates.js"
    import { useTabStore } from "../store/tabs.js"
    import { mapState, mapActions } from "pinia"
    import { StarOutlined, ArrowLeftOutlined } from "@ant-design/icons-vue"
    import TabIcon from "../icons/TabIcon.vue"

    export default {
        components: {
            StarOutlined,
            ArrowLeftOutlined,
            TabIcon,
        },
        props: {
            element: Object,
            shortcutView: Boolean,
        },
        emits: ["id"],
        created() {
            //Отображает оценку пользователя на странице фильма, если она есть
            let ratedFilm = this.ratesList.find(
                (film) => +film.id === +this.currentFilmId
            )
            if (ratedFilm) {
                this.userRate = ratedFilm.rate
            }
        },
        data() {
            return {
                json: json.docs,
                recommendedFilmId: null, //id фильма для перехода по страницам
                userRate: 0, //оценка фильма, поставленная пользователем
                isFilmMatched: true, //есть ли рекомендованные фильмы к данному
            }
        },
        computed: {
            ...mapState(useTabStore, ["tabsList"]),
            ...mapState(useRateStore, ["ratesList"]),
            currentFilmId() {
                return this.$route.params.id
            },
            film() {
                return this.json.find((film) => film.id === +this.currentFilmId)
            },
            movieLength() {
                let length = this.film.movieLength
                let output = ""
                if (length / 60 >= 1) {
                    output += parseInt(length / 60) + " ч "
                }
                if (length % 60 !== 0) {
                    output += (length % 60) + " м"
                }
                return output
            },
            alternativeName() {
                if (this.film.alternativeName !== null) {
                    return `"${this.film.alternativeName}"`
                }
            },
            //Отображает, добавлял ли пользователь данный фильм в закладки
            isAddedToTabs() {
                return !!this.tabsList.find(
                    (film) => +film.id === +this.currentFilmId
                )
            },
            //Выводит сокращенную форму имени, если оно слишком длинное(для сокращенных выводится подсказка)
            shortenedName() {
                return `${this.element.name.slice(0, 29)}...`
            },
            //Вычисляемые стили для рекомендованных фильмов
            recommendationStyles() {
                return this.regMatch.length < 5
                    ? {
                        padding: "padding: 0 325px 100px;",
                        gutter: 65,
                        span: 6,
                    }
                    : {
                        padding: "padding: 0 130px 100px;",
                        gutter: [40, 40],
                        span: 4,
                    }
            },
            // Ищет похожие фильмы опираясь на одинаковые имена/названия(имена актеров, режиссеров, серии фильмов),
            //а также на жанры, упомянутые в описании фильмов. Подходящие под это условия строки ищутся в названии фильма,
            //его сокращенном и полном описании в исходной базе данных
            regMatch() {
                this.isFilmMatched = false
                let matchingFilms = []
                let reg =
                    /[А-Я][а-яё]*((?=:|$|\s\d)|\s[А-Я][а-яё]*|\s[а-яё]*(?=\s\d|$))|[Бб]оевик|[Дд]рам|[Дд]етектив|[Мм]ульт|[Аа]нимац|[Фф]антаст|[Сс]ериал|Marvel/g
                let filmMatch = []
                let nameMatch = this.film.name.match(reg)
                let descriptionMatch = this.film.description.match(reg)
                if (this.film.shortDescription) {
                    let shortMatch = this.film.shortDescription.match(reg)
                    if (shortMatch) {
                        filmMatch = filmMatch.concat(shortMatch)
                    }
                }
                if (nameMatch) {
                    filmMatch = filmMatch.concat(nameMatch)
                }
                if (descriptionMatch) {
                    filmMatch = filmMatch.concat(descriptionMatch)
                }
                for (let i = 0; i < this.json.length; i++) {
                    let jsonMatch = []
                    let nameJsonMatch = this.json[i].name.match(reg)
                    let descriptionJsonMatch = this.json[i].description.match(reg)
                    if (this.json[i].shortDescription) {
                        let shortJsonMatch =
                            this.json[i].shortDescription.match(reg)
                        if (shortJsonMatch) {
                            jsonMatch = jsonMatch.concat(shortJsonMatch)
                        }
                    }
                    if (nameJsonMatch) {
                        jsonMatch = jsonMatch.concat(nameJsonMatch)
                    }
                    if (descriptionJsonMatch) {
                        jsonMatch = jsonMatch.concat(descriptionJsonMatch)
                    }
                    if (jsonMatch && filmMatch) {
                        for (let j = 0; j < jsonMatch.length; j++) {
                            for (let k = 0; k < filmMatch.length; k++) {
                                if (
                                    jsonMatch[j] === filmMatch[k] &&
                                    this.film.id !== this.json[i].id &&
                                    matchingFilms.indexOf(this.json[i]) === -1
                                ) {
                                    matchingFilms.push(this.json[i])
                                    break
                                }
                            }
                        }
                    }
                }
                //Отображает рекомендованные фильмы, если они есть
                if (matchingFilms.length > 0) {
                    this.isFilmMatched = true
                }
                return matchingFilms
            },
        },
        methods: {
            ...mapActions(useRateStore, ["setRate"]),
            ...mapActions(useTabStore, ["manageTab"]),
        },
    }
</script>

<style>
    .header {
        color: white;
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
        color: white !important;
    }
</style>

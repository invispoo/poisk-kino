<template>
    <div v-if="shortcutView">
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
                <img alt="example" :src="json[id].poster.url" height="600"/>   
            </a-col>
            <a-col :span="16" style="text-align:left">
                <span style="display: flex; align-items: start; justify-content: space-between;">
                    <h1>{{ json[id].name }}</h1>
                    <a-button type="link" size="large" @click="addToTab">
                        <template #icon>
                            <icon>
                                <template #component>
                                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style=" padding-top: 6px;">
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
                    <h2>{{ json[id].year }}</h2>
                    <h2>{{ movieLength }}</h2>
                </a-space>
                <h3>{{ json[id].description }}</h3>
                <h2>Оценить
                    <a-rate allow-half/>
                </h2>
            </a-col>
            <a-col :span="4">
            </a-col>
        </a-row>
    </div>
    
</template>

<script>
    import json from '../assets/kinopoisk.json'
    import Icon, { StarOutlined, BookOutlined} from '@ant-design/icons-vue';
    export default {
        components: {
            StarOutlined, BookOutlined, Icon
        },
        props: ['element', 'shortcutView'],
        data () {
            return {
                color: '#464455',
                isAddedToTabs: false,
                json: json.docs,
                index: null,
            }
        },
        computed: {
			id(){
				return this.$route.params.id;
			},
            movieLength () {
                let length = this.json[this.id].movieLength;
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
                if (this.json[this.id].alternativeName !== null)
                    return '"' + this.json[this.id].alternativeName + '"'; //интерполяция??
            },
            rating () {
                let rating = this.json[this.id].rating;
                if (rating.imdb !== 0)
                    return rating.imdb;
                else if (rating.imdb === 0 && rating.kp !== 0)
                    return rating.kp;
            },
        },
        methods: {
            addToTab() {
                this.isAddedToTabs = !this.isAddedToTabs;
            }
        }
    }
</script>

<style scoped>
</style>
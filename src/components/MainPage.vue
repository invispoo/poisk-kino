<template>
    <div>
        <a-row style="display: flex; align-items: center; justify-content: space-between; padding-top: 50px;">
            <a-col>
                <h1 style="padding-top: 10px;">Поиск кино</h1>
            </a-col>
            <a-col>
                <a-input-search
                placeholder="Введите название фильма"
                enter-button
                size="large"
                v-model:value="searchInput"
                @search="searchFilm"
                style="width: 900px;"
                />    
            </a-col>
        </a-row>
        <div style="display: flex; justify-content: flex-end;">
            <a-space>
                <h2 style="padding-top: 6px;">Сортировка:</h2>
                <a-select
                style="width: 230px"
                @focus=""
                @change="selectSort"
                >
                    <a-select-option value="best">Сначала с лучшей оценкой</a-select-option>
                    <a-select-option value="longest">Сначала длинные</a-select-option>
                    <a-select-option value="shortest">Сначала короткие</a-select-option>
                    <a-select-option value="newest">Сначала новые</a-select-option>
                    <a-select-option value="oldest">Сначала старые</a-select-option>
                </a-select>
            </a-space>
            <a-button type="link">
                <template #icon>
                    <star-outlined/>
                </template>
            </a-button>
        </div>
        <div style="height: 770px; padding-top: 20px;">
            <a-row :gutter="[24, 24]">
                <a-col :span="6" v-for="el, index in filmArray">
                    <router-link :to="'/film/' + index">
                        <film-card :element="el" :shortcutView="true"/>
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
    import Icon, { StarOutlined, BookOutlined} from '@ant-design/icons-vue';
    export default {
        components: {
            StarOutlined, BookOutlined, Icon, FilmCard, FilmFilter
        },
        computed: {
            filmArray () {
                if (this.sortType === 'best')
                    return this.shellSort('rating', true, 'kp');
                else if (this.sortType === 'longest')
                    return this.shellSort('movieLength', true);
                else if (this.sortType === 'shortest')
                    return this.shellSort('movieLength', false);
                else if (this.sortType === 'newest')
                    return this.shellSort('year', true);
                else if (this.sortType === 'oldest')
                    return this.shellSort('year', false);
                else if (this.searchFlag === true) {
                    this.searchFlag = false;
                    return this.searchFilm();
                }
                return this.json;
            },
        },
        data() {
            return {
                json: json.docs,
                sortType: '',
                searchInput: '',
                searchFlag: false,
                extendedFilmView: false
            }
        },
        methods: {
            searchFilm () {
                let array;
                let index = 0;
                this.searchFlag = true;
                for (let i = 0; i < 10; i++) {
                    let pattern = this.json[i].name.toLowerCase();
                    if (pattern.includes(this.searchInput)) {
                        array.splice(index, 0, this.json[i]);
                        index++;
                    }
                }
                return array;
            },
            selectSort (value) {
                this.sortType = value;
            },
            shellSort(param1, sign, param2) {
                let array = this.json;
                var increment = array.length / 2;
                while (increment > 0) {
                    for (let i = increment; i < array.length; i++) {
                        var j = i;
                        var temp = array[i];
                        if (param2 !== undefined && sign === true) {
                            while (j >= increment && array[j-increment][param1][param2] < temp[param1][param2]) {
                                array[j] = array[j-increment];
                                j = j - increment;
                            }
                        }
                        else if (sign === true) {
                            while (j >= increment && array[j-increment][param1] < temp[param1]) {
                                array[j] = array[j-increment];
                                j = j - increment;
                            }
                        }
                        else {
                            while (j >= increment && array[j-increment][param1] > temp[param1]) {
                                array[j] = array[j-increment];
                                j = j - increment;
                            }
                        }
                        array[j] = temp;
                    }
                    if (increment == 2) 
                        increment = 1;
                    else 
                        increment = parseInt(increment*5 / 11);
                }
            return array;
            }
        } 
    }
</script>

<style scoped>

</style>

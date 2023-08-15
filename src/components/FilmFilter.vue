<template>
    <div class="filter-container">
        <a-input
        placeholder="Введите название фильма"
        size="large"
        v-model:value="searchInput"
        @input="searchFilm()"
        style="width: 1200px;">
            <template #addonAfter>
                <setting-outlined 
                @click="isSortShowed = !isSortShowed" 
                v-if="!isSortShowed" 
                style="font-size: 16px;"/>
                <a-select
                @change="selectSort"
                v-if="isSortShowed"
                placeholder="Выберите вид сортировки"
                allow-clear
                style="width: 230px;"
                >
                    <a-select-option value="best">Сначала с лучшей оценкой</a-select-option>
                    <a-select-option value="longest">Сначала длинные</a-select-option>
                    <a-select-option value="shortest">Сначала короткие</a-select-option>
                    <a-select-option value="newest">Сначала новые</a-select-option>
                    <a-select-option value="oldest">Сначала старые</a-select-option>
                </a-select>
            </template>
        </a-input>     
    </div>
</template>

<script>
    import { SettingOutlined } from '@ant-design/icons-vue';
    export default {
        components: {
            SettingOutlined
        },
        props: {
            json: Array
        },
        emits: ['search', 'sort'],
        data () {
            return {
                sortedArray: [], //отсортированный массив
                sortType: '', //вид сортировка
                isSorted: false, //флаг сортировки
                searchedArray: [], //массив результата поиска
                searchInput: '', //текст поискового запроса
                isSearched: false, //флаг поиска
                isSortShowed: false, //видимость селектора сортировки
            }
        },
        created (){
        },
        methods: {
            //Осуществляет поиск в отсортированном массиве, если сортировка присутствует, иначе в исходном
            searchFilm () {
                if (this.searchInput === '') {
                    this.isSearched = false;
                    this.selectSort(this.sortType);
                }
                else {
                    if (this.isSorted) {
                        this.isSearched = false;
                        this.searchedArray = this.selectSort(this.sortType).filter(film => film.name
                                            .toLowerCase().includes(this.searchInput.toLowerCase()));
                    }
                    else {
                        this.searchedArray = this.json.filter(film => film.name.toLowerCase()
                                            .includes(this.searchInput.toLowerCase()));
                    }
                    this.isSearched = true;               
                    this.$emit('search', this.searchedArray);
                }
                return this.searchedArray;
            },
            //Запускает функцию сортировки с нужными параметрами
            selectSort (value) {
                let args;
                this.sortType = value;
                switch (this.sortType) {
                    case 'best':
                        args = [true, 'rating',  'kp'];
                        break;
                    case 'longest':
                        args = [true, 'movieLength'];
                        break;
                    case 'shortest':
                        args = [false, 'movieLength'];
                        break;
                    case 'newest':
                        args = [true, 'year'];
                        break;
                    case 'oldest':
                        args = [false, 'year'];
                        break;
                    default: {
                        this.isSorted = false;
                        if (this.isSearched) {
                            this.sortedArray = this.searchFilm();
                        }
                        else {
                            this.sortedArray = JSON.parse(JSON.stringify(this.json));
                        }
                        this.$emit('sort', this.sortedArray); 
                        return this.sortedArray;
                    }
                }
                this.sortedArray = this.shellSort(...args);
                this.$emit('sort', this.sortedArray); 
                return this.sortedArray;
            },
            //Сортировка массива с помощью сортировки Шелла. Входные параметры - 
            //поля из базы данных и знак сравнения(больше/меньше)
            shellSort (sign, param1, param2) {
                let array;
                this.isSorted = true;
                if (this.isSearched) {
                    array = this.searchedArray;
                }
                else {
                    array = JSON.parse(JSON.stringify(this.json));
                }
                var increment = Math.floor(array.length / 2);
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
                    if (increment == 2) {
                        increment = 1;
                    }
                    else {
                        increment = parseInt(increment*5 / 11);
                    }
                }
                return array;
            }
        } 
    }
</script>

<style>
    .filter-container {
        display: flex;
        flex-direction: column;
    }
</style>
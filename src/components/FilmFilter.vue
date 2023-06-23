<template>
    <div v-if="showSearch">
        <a-input
        placeholder="Введите название фильма"
        size="large"
        v-model:value="searchInput"
        @input="searchFilm"
        style="width: 900px;"
        />
    </div>
    <div v-else>
        <a-space>
            <h2 style="padding-top: 6px;">Сортировка:</h2>
            <a-select
            style="width: 230px"
            @change="selectSort"
            >
                <a-select-option value="best">Сначала с лучшей оценкой</a-select-option>
                <a-select-option value="longest">Сначала длинные</a-select-option>
                <a-select-option value="shortest">Сначала короткие</a-select-option>
                <a-select-option value="newest">Сначала новые</a-select-option>
                <a-select-option value="oldest">Сначала старые</a-select-option>
                <a-select-option value="no">Отсутствует</a-select-option>
            </a-select>
        </a-space>
    </div>
</template>

<script>
    import jsonCopy from '../assets/kinopoisk.json'
    export default {
        props: ['json', 'showSearch'],
        data () {
            return {
                sortedArray: Array,
                sortType: String,
                searchInput: '',
                jsonCopy: jsonCopy.docs,
                searchFlag: false,
            }
        },
        methods: {
            searchFilm () {
                let index = 0;
                let searchedArray = [];
                if (this.searchInput === '') {
                    searchedArray = JSON.parse(JSON.stringify(this.json));
                }
                else {
                    this.searchFlag = true;
                    for (let i = 0; i < this.json.length; i++) {
                        let pattern = this.json[i].name.toLowerCase();
                        if (pattern.includes(this.searchInput)) {
                            searchedArray.splice(index, 0, this.json[i]);
                            index++;
                        }
                    }
                }
                this.$emit('search', searchedArray, this.searchFlag); 
                this.searchFlag = false;
            },
            selectSort (value) {
                this.sortType = value;
                if (this.sortType === 'best')
                    this.sortedArray = this.shellSort('rating', true, 'kp');
                else if (this.sortType === 'longest')
                    this.sortedArray = this.shellSort('movieLength', true);
                else if (this.sortType === 'shortest')
                    this.sortedArray = this.shellSort('movieLength', false);
                else if (this.sortType === 'newest')
                    this.sortedArray = this.shellSort('year', true);
                else if (this.sortType === 'oldest')
                    this.sortedArray = this.shellSort('year', false);  
                else this.sortedArray = JSON.parse(JSON.stringify(this.jsonCopy)); //?????????
                this.$emit('sort', this.sortedArray);
                
            },
            shellSort(param1, sign, param2) {
                let array = JSON.parse(JSON.stringify(this.json));
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
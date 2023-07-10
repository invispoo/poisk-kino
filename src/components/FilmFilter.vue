<template>
    <div style="display: flex; flex-direction: column;">
        <a-space>
            <a-input
            placeholder="Введите название фильма"
            size="large"
            v-model:value="searchInput"
            @input="searchFilm()"
            style="width: 700px;"
            />     
        </a-space>
        <div style="display: flex; flex-direction: row; justify-content: flex-end; margin-top: 40px">
            <a-space>
                <h3 style="padding-top:6px">Сортировка:</h3>
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
    </div>
</template>

<script>
    import Icon, { LikeOutlined } from '@ant-design/icons-vue';
    export default {
        components: {
            Icon, LikeOutlined,
        },
        props: ['json'],
        emits: ['search', 'sort'],
        data () {
            return {
                sortedArray: Array,
                sortType: String,
                sortFlag: false,
                searchedArray: [],
                searchInput: '',
                searchFlag: false,
            }
        },
        created (){
        },
        methods: {
            searchFilm () {
                if (this.searchInput === '') {
                    this.searchFlag = false;
                    this.selectSort(this.sortType);
                }
                else {
                    if (this.sortFlag) {
                        this.searchFlag = false;
                        this.searchedArray = this.selectSort(this.sortType).filter(film => film.name
                                            .toLowerCase().includes(this.searchInput.toLowerCase()));
                    }
                    else 
                        this.searchedArray = this.json.filter(film => film.name.toLowerCase()
                                            .includes(this.searchInput.toLowerCase()));
                    this.searchFlag = true;               
                    this.$emit('search', this.searchedArray);
                }
                return this.searchedArray;
            },
            selectSort (value) {
                this.sortType = value;
                if (this.sortType === 'best')
                    this.sortedArray = this.shellSort(true, 'rating',  'kp');
                else if (this.sortType === 'longest')
                    this.sortedArray = this.shellSort(true, 'movieLength');
                else if (this.sortType === 'shortest')
                    this.sortedArray = this.shellSort(false, 'movieLength');
                else if (this.sortType === 'newest')
                    this.sortedArray = this.shellSort(true, 'year');
                else if (this.sortType === 'oldest')
                    this.sortedArray = this.shellSort( false, 'year');  
                else {
                    this.sortFlag = false;
                    if (this.searchFlag)
                        this.sortedArray = this.searchFilm();
                    else 
                        this.sortedArray = JSON.parse(JSON.stringify(this.json));
                }
                this.$emit('sort', this.sortedArray); 
                return this.sortedArray;
            },
            shellSort (sign, param1, param2) {
                let array;
                this.sortFlag = true;
                if (this.searchFlag) 
                    array = this.searchedArray;
                else 
                    array = JSON.parse(JSON.stringify(this.json));
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
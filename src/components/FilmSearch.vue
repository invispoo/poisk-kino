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
    </div>
</template>

<script>
    export default {
        emits: ['search'],
        props: ['json'],
        data () {
            return {
                searchedArray: [],
                searchInput: '',
                idArray: [],
                searchFlag: false,
            }
        },
        created () {
            //this.JSON_COPY = JSON.parse(JSON.stringify(this.json));
            //console.log(1)
        },
        methods: {
            searchFilm () {
                //let jsonCopy = JSON.parse(JSON.stringify(this.json))
                this.searchedArray = [];
                //this.idArray = [];
                if (this.searchInput !== '') {
                    this.searchFlag = true;
                    this.searchedArray = this.json.filter(film => film.name.toLowerCase()
                                    .includes(this.searchInput.toLowerCase()));
                }
                else
                    this.searchFlag = false;
                //console.log(this.searchedArray.length)
                //this.searchedArray.forEach(film => this.idArray.push(film.id));             
                //this.$emit('search', this.idArray, jsonCopy);
                this.$emit('search', this.searchedArray, this.searchFlag);
            },
        } 
    }
</script>
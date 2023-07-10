<template>
     <a-pagination v-if="filmArray.length > 25"
     v-model:current="current" 
     @change="onPageChange" 
     :total="pageAmount"/>
</template>

<script>
    export default {
        props: ['filmArray'],
        emits: ['page'],
        created () {
            this.$emit('page', this.start, this.end)
        },
        updated () {
            let actualPageAmount = this.pageAmount / 10;
            if (this.current > actualPageAmount)
                this.current = 1; //actualPageAmount??
            this.onPageChange()
        },
        data () {
            return {
                current: 1,
                start: 0,
                end: 25,
            } 
        },
        computed: {
            pageAmount () {
                return Math.ceil((this.filmArray.length / 25)) * 10;                    
            }
        },
        methods: {
            onPageChange () {
                this.start = 25 * (this.current - 1)
                this.end = 25 * this.current;
                this.$emit('page', this.start, this.end)
            }
        } 
    }
</script>
<template>
     <a-pagination style="text-align: center;"
     v-if="filmArray.length > 25"
     v-model:current="current" 
     @change="onPageChange" 
     :total="pageAmount"/>
</template>

<script>
    import { mapState, mapActions } from 'pinia'
    import { usePageStore } from '../store/pages.js'
    export default {
        props: ['filmArray'],
        emits: ['page'],
        created () {
            this.current = this.currentPage;
            this.start = this.startPage;
            this.end = this.endPage;
            this.$emit('page', this.start, this.end)
        },
        updated () {
            let actualPageAmount = this.pageAmount / 10;
            if (this.current > actualPageAmount)
                this.current = 1;
            this.onPageChange()
        },
        data () {
            return {
                current: Number,
                start: Number,
                end: Number,
            } 
        },
        computed: {
            pageAmount () {
                return Math.ceil((this.filmArray.length / 25)) * 10;                    
            },
            ...mapState(usePageStore, ['currentPage', 'startPage', 'endPage'])
        },
        methods: {
            onPageChange () {
                this.start = 25 * (this.current - 1);
                this.end = 25 * this.current;
                this.switchPage(this.current, this.start, this.end);
                this.$emit('page', this.start, this.end);

            },
            ...mapActions(usePageStore, ['switchPage'])
        } 
    }
</script>
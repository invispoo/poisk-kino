import { defineStore } from 'pinia'

export const usePageStore = defineStore('pages', {
    state: () => {
        return {
            currentPage: 1,
            startPage: 0,
            endPage: 25,
            isHomeShowed: true,
            isTabsShowed: false,
            isRatesShowed: false,
        }
    },
    actions: {
        goToHome () {
            this.isHomeShowed = true;
            this.isTabsShowed = false;
            this.isRatesShowed = false;
        },
        goToTabs () {
            this.isHomeShowed = false;
            this.isTabsShowed = true;
            this.isRatesShowed = false;
        },
        goToRates () {
            this.isHomeShowed = false;
            this.isTabsShowed = false;
            this.isRatesShowed = true;
        },
        switchPage (pageNumber, start, end) {
            this.currentPage = pageNumber;
            this.startPage = start;
            this.endPage = end;
        }
    },
    persist: true,
})
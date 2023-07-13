import { defineStore } from 'pinia'

export const useTabStore = defineStore('tabs', {
    state: () => {
        return {
          tabsList: [],
        }
    },
    actions: {
      manageTab(film) {
        let tabFlag = this.tabsList.indexOf(film) !== -1; //фильм уже есть в закладках
        if (tabFlag)
            this.tabsList.splice(this.tabsList.indexOf(film), 1);
        else
            this.tabsList.push(film);
        console.log(this.tabsList);
      }
    },
    persist: true,
})
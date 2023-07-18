import { defineStore } from 'pinia'

export const useTabStore = defineStore('tabs', {
    state: () => {
        return {
          tabsList: [],
        }
    },
    actions: {
      manageTab(film) {
        let tabFlag = this.tabsList.find(tab => +tab.id === +film.id); //фильм уже есть в закладках
        if (!tabFlag)
          this.tabsList.push(film);
        else
          this.tabsList.splice(this.tabsList.indexOf(film), 1);  
      }
    },
    persist: true,
})
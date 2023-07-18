import { defineStore } from 'pinia'

export const useTabStore = defineStore('tabs', {
    state: () => {
        return {
          tabsList: [], //список фильмов, добавленных в закладки
        }
    },
    actions: {
      //Добавляет фильм в список закладок или удаляет, если такой уже есть
      manageTab(film) {
        let tabFlag = this.tabsList.find(tab => +tab.id === +film.id);
        if (!tabFlag)
          this.tabsList.push(film);
        else
          this.tabsList.splice(this.tabsList.indexOf(film), 1);  
      }
    },
    persist: true,
})
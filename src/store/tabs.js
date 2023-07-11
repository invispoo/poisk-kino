import { defineStore } from 'pinia'

export const useTabStore = defineStore('tabs', {
    state: () => {
        return {
          tabsList: [],
        }
    },
    actions: {
      manageTab(film) {
        let tabFlag = this.tabsList.indexOf(film) !== -1;
        if (tabFlag)
            this.tabsList.splice(this.tabsList.indexOf(film));
        else
            this.tabsList.push(film)
      }
    },
    persist: true,
})
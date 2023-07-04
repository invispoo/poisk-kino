import { defineStore } from 'pinia'

export const useTabStore = defineStore('tabs', {
    state: () => {
        return {
          tabsList: [],
        }
    },
    actions: {
      manageTab(id) {
        let tabFlag = this.tabsList.find(film => film.id === id);
        if (tabFlag)
            this.tabsList.splice(this.tabsList.indexOf(tabFlag));
        else
            this.tabsList.push({
                id: id
            })
        console.log(this.tabsList)
      }
    }
})
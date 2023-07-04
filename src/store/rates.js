import { defineStore } from 'pinia'

export const useRateStore = defineStore('rates', {
    state: () => {
        return {
          ratesList: [],
        }
    },
    actions: {
      setRate(id, rate) {
        if (!this.ratesList.find(film => film.id === id)){
          this.ratesList.push({
            id: id,
            rate: rate
          });
        }
        console.log(this.ratesList)
      }
    }
})

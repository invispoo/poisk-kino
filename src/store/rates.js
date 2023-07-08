import { defineStore } from 'pinia'

export const useRateStore = defineStore('rates', {
    state: () => {
        return {
          ratesList: [],
        }
    },
    actions: {
      setRate (id, rate) {
        let ratedFilm = this.ratesList.find(film => film.id === id);
        ratedFilm ? ratedFilm.rate = rate : 
        this.ratesList.push({
            id: id,
            rate: rate
          });
        console.log(this.ratesList)
      },
    }
})

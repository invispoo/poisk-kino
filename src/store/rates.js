import { defineStore } from 'pinia'

export const useRateStore = defineStore('rates', {
    state: () => {
        return {
          ratesList: [], //список оцененных пользователем фильмов, содержит id фильмов и оценку
        }
    },
    actions: {
      //Создает запись об оцененном фильме или обновляет оценку
      setRate (id, rate) {
        let ratedFilm = this.ratesList.find(film => film.id === id);
        ratedFilm ? ratedFilm.rate = rate : 
        this.ratesList.push({
            id: id,
            rate: rate
          });
      },
    },
    persist: true,
})
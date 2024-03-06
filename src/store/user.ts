import { defineStore } from 'pinia'

export interface Mistake {
  id: string
  type: string
  question: string
  difficulty: string
  userAnswer: string
  correctAnswer: string
}

export const useUserStore = defineStore('user', {
  actions: {
    addMistake(mistake: Mistake) {
      const existingMistake = this.mistakes.find((m) => m.id === mistake.id)
      if (!existingMistake) {
        // If not, add the new mistake to the array
        this.mistakes.push(mistake)
      }
    },
    clean() {
      this.mistakes.splice(0, this.mistakes.length)
    }
  },
  state() {
    return {
      score: 0,
      chances: 3,
      quesNum: 0,
      // 储存用户错误答案
      mistakes: [] as Mistake[]
    }
  }
})

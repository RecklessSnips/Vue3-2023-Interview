import { ref, reactive, onMounted } from 'vue'

export interface Question {
  category: string
  id: string
  correctAnswer: string
  incorrectAnswers: string[]
  question: string
  tags: string[]
  type: string
  difficulty: string
  regions: string[]
  isNiche: boolean
}

export default function () {
  let isDataLoaded = ref(false)
  let quizData = reactive<Question[]>([])
  let answers = reactive<string[]>([])

  async function fetchQuestion(url: string) {
    try {
      const response = await fetch(url)
      const data = await response.json()
      // console.log(data)
      quizData.splice(0, quizData.length, ...data)
      answers.splice(0, answers.length, quizData[0].correctAnswer, ...quizData[0].incorrectAnswers)
      answers.sort(() => Math.random() - 0.5)
      isDataLoaded.value = true
      // console.log('quiz:------------', quizData[0])
      // console.log('answers:------------', answers)
      // console.log(quizData)
    } catch (error) {
      console.error('There was a problem with your fetch operation:', error)
    }
  }

  return { isDataLoaded, quizData, answers, fetchQuestion }
}

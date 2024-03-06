import useQuestion from '@/hooks/useQuestion'

export default function (type: string) {
  const url = `https://the-trivia-api.com/api/questions?categories=${type}&limit=1&difficulty=hard`

  const { isDataLoaded, quizData, answers, fetchQuestion } = useQuestion()

  return { isDataLoaded, quizData, answers, url, fetchQuestion }
}

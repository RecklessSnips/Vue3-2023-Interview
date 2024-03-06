<template lang="">
  <div class="board">
    <div class="user">
      <span class="user-info"
        >Your score: <span>{{ user.score }}</span></span
      >
      <br />
      <span class="user-info"
        >Chances left: <span>{{ user.life }}</span></span
      >
      <br />
      <span class="user-info"
        >Question number: <span>{{ user.quesNumber }}</span></span
      >
      <br />
      <span class="user-info"
        >Game level: <span>{{ user.gameDifficulty }}</span></span
      >
    </div>

    <div>
      <h1 class="text-danger">Question:</h1>
      <Problem
        v-if="easy"
        :ifDataLoaded="isDataLoadedEasy"
        :quizData="quizDataEasy"
        :answers="answersEasy"
        :url="urlEasy"
        :fetchQuestion="fetchQuestionEasy"
      />
      <Problem
        v-if="medium"
        :ifDataLoaded="isDataLoadedMedium"
        :quizData="quizDataMedium"
        :answers="answersMedium"
        :url="urlMedium"
        :fetchQuestion="fetchQuestionMedium"
      />
      <Problem
        v-if="hard"
        :ifDataLoaded="isDataLoadedHard"
        :quizData="quizDataHard"
        :answers="answersHard"
        :url="urlHard"
        :fetchQuestion="fetchQuestionHard"
      />
      <!-- 替换成routerview -->
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Question'
}
</script>

<script lang="ts" setup>
import Problem from '@/pages/Problem.vue'
import emitter from '@/utils/emitter'
import useEasy from '@/hooks/useEasy'
import useMedium from '@/hooks/useMedium'
import useHard from '@/hooks/useHard'
import { ref, reactive, onBeforeMount, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { useUserStore } from '@/store/user'
import { storeToRefs } from 'pinia'

let route = useRoute()
let easy = ref(true)
let medium = ref(false)
let hard = ref(false)
let type = route.query.type as string

//得到一个关于user的store！
let userStore = useUserStore()
let { score, chances, quesNum } = storeToRefs(userStore)

// 别忘了加上这个isDataLoaded确保数据先加载好
const {
  isDataLoaded: isDataLoadedEasy,
  quizData: quizDataEasy,
  answers: answersEasy,
  url: urlEasy,
  fetchQuestion: fetchQuestionEasy
} = useEasy(type)

const {
  isDataLoaded: isDataLoadedMedium,
  quizData: quizDataMedium,
  answers: answersMedium,
  url: urlMedium,
  fetchQuestion: fetchQuestionMedium
} = useMedium(type)

const {
  isDataLoaded: isDataLoadedHard,
  quizData: quizDataHard,
  answers: answersHard,
  url: urlHard,
  fetchQuestion: fetchQuestionHard
} = useHard(type)

onBeforeMount(() => {
  emitter.on('recieve-toy', (recieve: any) => {
    user.gameDifficulty = recieve
  })
})

watchEffect(() => {
  if (quesNum.value >= 1 && quesNum.value <= 2) {
    easy.value = true
    medium.value = false
    hard.value = false
    console.log('Setting to easy')
  } else if (quesNum.value >= 3 && quesNum.value <= 4) {
    easy.value = false
    medium.value = true
    hard.value = false
    console.log('Setting to medium')
  } else if (quesNum.value >= 5 && quesNum.value <= 6) {
    easy.value = false
    medium.value = false
    hard.value = true
    console.log('Setting to hard')
  } else if (quesNum.value >= 7) {
    easy.value = false
    medium.value = false
    hard.value = false
    console.log('Deactivating all')
  }
})

const user = reactive({
  score: score,
  life: chances,
  quesNumber: quesNum,
  gameDifficulty: ''
})
</script>

<style scoped>
.user {
  background-color: antiquewhite;
  text-align: right;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial,
    sans-serif;
  font-size: 20px;
}
.user-info {
  padding-right: 7%;
  margin-right: 7%;
}
/* 选中所有子代的span */
.user-info > span {
  color: goldenrod;
}
.board {
  margin: 4% auto;
  padding: 0 100px;
  text-align: center;
  background-color: antiquewhite;
}
</style>

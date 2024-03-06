<template>
  <!-- 替换成routerview -->
  <div v-if="ifDataLoaded">
    <h1 class="question-title">{{ quizData[0].question }}</h1>
    <div>
      <div class="d-flex justify-content-around">
        <div class="row">
          <div class="col-sm">
            <input
              type="radio"
              class="btn-check"
              name="options-outlined"
              id="info-outlined"
              autocomplete="off"
              :value="answers[0]"
              v-model="choice"
            />
            <label class="btn btn-outline-info" for="info-outlined">{{ answers[0] }}</label>
          </div>

          <div class="col-sm">
            <input
              type="radio"
              class="btn-check"
              name="options-outlined"
              id="warning-outlined"
              autocomplete="off"
              :value="answers[1]"
              v-model="choice"
            />
            <label class="btn btn-outline-warning" for="warning-outlined">{{ answers[1] }}</label>
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-around">
        <div class="row">
          <div class="col-sm">
            <input
              type="radio"
              class="btn-check"
              name="options-outlined"
              id="success-outlined"
              autocomplete="off"
              :value="answers[2]"
              v-model="choice"
            />
            <label class="btn btn-outline-success" for="success-outlined">{{ answers[2] }}</label>
          </div>

          <div class="col-sm">
            <input
              type="radio"
              class="btn-check"
              name="options-outlined"
              id="danger-outlined"
              autocomplete="off"
              :value="answers[3]"
              v-model="choice"
            />
            <label class="btn btn-outline-danger" for="danger-outlined">{{ answers[3] }}</label>
          </div>
        </div>
      </div>

      <!-- Button trigger modal -->
      <button
        @click="start"
        type="button"
        class="button btn btn-outline-primary"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
      >
        Let's roll
      </button>

      <!-- Modal -->
      <div
        class="modal fade"
        id="staticBackdrop"
        tabindex="-1"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5 text-danger" id="staticBackdropLabel">
                {{ modalTitle }}
              </h1>
            </div>
            <div class="modal-body">{{ modalBody }}</div>
            <div class="modal-footer">
              <!-- Not chosen -->
              <button
                v-if="ifChose"
                @click="chose"
                type="button"
                class="btn btn-outline-danger"
                data-bs-dismiss="modal"
              >
                {{ buttonMsg }}
              </button>
              <!-- Try again -->
              <button
                v-if="ifTryAgain"
                @click="tryAgain"
                type="button"
                class="btn btn-outline-danger"
                data-bs-dismiss="modal"
              >
                {{ buttonMsg }}
              </button>
              <!-- Restart from begin -->
              <button
                v-if="ifRestart"
                @click="restart"
                type="button"
                class="btn btn-outline-danger"
                data-bs-dismiss="modal"
              >
                {{ buttonMsg }}
              </button>
              <!-- Next -->
              <button
                v-if="ifNext"
                @click="next"
                type="button"
                class="btn btn-outline-danger"
                data-bs-dismiss="modal"
              >
                {{ buttonMsg }}
              </button>
              <!-- Go to congrats -->
              <button
                v-if="ifGotoCongrats"
                @click="gotoCongrats"
                type="button"
                class="btn btn-outline-danger"
                data-bs-dismiss="modal"
              >
                {{ buttonMsg }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: 'Problem'
}
</script>

<script lang="ts" setup>
import emitter from '@/utils/emitter'
import { useUserStore } from '@/store/user'
import { ref, reactive, watchEffect, onUpdated, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'

let router = useRouter()
let choice = ref('')
let modalTitle = ref('')
let modalBody = ref('')
let buttonMsg = ref('')
let ifChose = ref(false)
let ifTryAgain = ref(false)
let ifRestart = ref(false)
let ifNext = ref(false)
let ifGotoCongrats = ref(false)

let { ifDataLoaded, quizData, answers, url, fetchQuestion } = defineProps([
  'ifDataLoaded',
  'quizData',
  'answers',
  'url',
  'fetchQuestion'
])
// 别忘了加上这个isDataLoaded确保数据先加载好
// const { isDataLoaded, quizData, answers, url, fetchQuestion } = useEasy()

//得到一个关于user的store！
let userStore = useUserStore()
let { score, chances, quesNum } = storeToRefs(userStore)

const user = reactive({
  score: score,
  life: chances,
  quesNumber: quesNum,
  gameDifficulty: ''
})

onBeforeMount(() => {})
fetchQuestion(url)

onUpdated(() => {
  emitter.emit('recieve-toy', user.gameDifficulty)
})

// 时刻监视gameDifficulty并且赋值
watchEffect(() => {
  if (quizData.length > 0) {
    // fetch again
    console.log('quiz: ', quizData[0])
    user.gameDifficulty = quizData[0].difficulty
  }
  outOfChance()
})

function chose() {
  return
}

function tryAgain() {
  return
}

function restart() {
  userStore.score = 0
  userStore.chances = 3
  userStore.quesNum = 0
  userStore.clean()
  router.replace({
    name: 'cover'
  })
}

function next() {
  if (choice.value === '') {
    return
  }
  quesNum.value += 1
  choice.value = ''
  fetchQuestion(url)
}

function gotoCongrats() {
  router.replace({
    name: 'congrats'
  })
}

function start() {
  // if didn't make choice
  if (choice.value === '') {
    modalTitle.value = 'OOPS'
    modalBody.value = 'Please make a choice!'
    buttonMsg.value = 'Make choice'

    ifTryAgain.value = false
    ifRestart.value = false
    ifNext.value = false
    ifGotoCongrats.value = false
    ifChose.value = true
    return
  }
  // if choice is wrong
  if (choice.value != quizData[0].correctAnswer) {
    computeWrong()
  } else {
    computeCorrect()
    if (userStore.quesNum == 6) {
      modalTitle.value = 'Wooowwww'
      modalBody.value = 'You nailed it, check how you did!'
      buttonMsg.value = 'Checkout'
      ifTryAgain.value = false
      ifRestart.value = false
      ifNext.value = false
      ifChose.value = false
      ifGotoCongrats.value = true
    }
  }
}

function computeWrong() {
  switch (quizData[0].difficulty) {
    case 'easy':
      userStore.chances -= 1
      userStore.score -= 1
      modalTitle.value = 'Wrong answer'
      modalBody.value = 'Trapped at the easy level huh?'
      buttonMsg.value = 'Try again'
      break
    case 'medium':
      userStore.chances -= 1
      userStore.score -= 2
      modalTitle.value = 'Wrong answer'
      modalBody.value = 'Try it again, this should be easy!'
      buttonMsg.value = 'Try again'
      break
    case 'hard':
      userStore.chances -= 1
      userStore.score -= 3
      modalTitle.value = 'Wrong answer'
      modalBody.value = "It's fine, not everyone is as genius as me :p"
      buttonMsg.value = 'Try again'
      break
  }
  userStore.addMistake({
    id: quizData[0].id,
    question: quizData[0].question,
    type: quizData[0].type,
    difficulty: quizData[0].difficulty,
    userAnswer: choice.value,
    correctAnswer: quizData[0].correctAnswer
  })
  ifTryAgain.value = true
  ifRestart.value = false
  ifNext.value = false
  ifChose.value = false
  ifGotoCongrats.value = false
}

function computeCorrect() {
  switch (quizData[0].difficulty) {
    case 'easy':
      userStore.score += 2
      modalTitle.value = 'Correct'
      modalBody.value = 'Not bad, try another one!'
      buttonMsg.value = 'Next'
      break
    case 'medium':
      userStore.score += 4
      modalTitle.value = 'Correct'
      modalBody.value = 'Nice, keep going!'
      buttonMsg.value = 'Next'
      break
    case 'hard':
      userStore.score += 6
      modalTitle.value = 'Correct'
      modalBody.value = 'Nothing can stop you, forward!'
      buttonMsg.value = 'Next'
      break
  }
  ifTryAgain.value = false
  ifRestart.value = false
  ifNext.value = true
  ifGotoCongrats.value = false
  ifChose.value = false
}

function outOfChance() {
  if (userStore.chances < 1) {
    userStore.score = 0
    userStore.chances = 3
    userStore.quesNum = 0
    modalTitle.value = 'OUT Of Chance'
    modalBody.value = 'Beaten by the eaisest questions? LMFAOOOO'
    buttonMsg.value = 'Restart'
    ifTryAgain.value = false
    ifRestart.value = true
    ifNext.value = false
    ifGotoCongrats.value = false
    ifChose.value = false
    userStore.clean()
  }
}
</script>

<style scoped>
.header {
  margin: 15px auto;
}
.form {
  padding: 0 20%;
}
.button {
  margin-top: 30px;
}
.question-title {
  height: 110px;
  overflow: scroll;
}
.row {
  margin: 10px auto;
}
.col-sm {
  margin: 10px 6px;
}
.btn {
  width: 200px;
}
</style>

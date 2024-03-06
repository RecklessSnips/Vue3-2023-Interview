<template>
  <div class="board">
    <div v-if="empty" class="alert alert-danger alert-dismissible fade show" role="alert">
      <strong>Wait!</strong> You must select a category!
      <button
        @click="disappear"
        type="button"
        class="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
      ></button>
    </div>
    <div>
      <h1 class="header">Welcome to Trivia game!</h1>
      <h2 class="header">Can't wait to get started?</h2>
      <h2 class="header">Select the question type below</h2>
      <div class="form">
        <select class="form-select" v-model="res">
          <option value="">Please select question catagory</option>
          <option value="general_knowledge">general_knowledge</option>
          <option value="music">music</option>
          <option value="sport_and_leisure">sport_and_leisure</option>
          <option value="arts_and_literature">arts_and_literature</option>
          <option value="history">history</option>
          <option value="society_and_culture">film_asociety_and_culturend_tv</option>
          <option value="science">science</option>
          <option value="geography">geography</option>
          <option value="food_and_drink">food_and_drink</option>
        </select>
      </div>
    </div>

    <button @click="start" type="button" class="button btn btn-outline-primary">Let's roll</button>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Cover'
}
</script>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/store/user'

const router = useRouter()
let userStore = useUserStore()
let { score, chances, quesNum } = storeToRefs(userStore)

let res = ref('')
let empty = ref(false)

watch(res, (newValue: any, oldValue: any) => {
  console.log('res changed', newValue, oldValue)
})

function disappear() {
  empty.value = false
}

function start() {
  if (res.value === '') {
    empty.value = true
    return
  }
  quesNum.value += 1
  router.replace({
    name: 'question',
    query: {
      type: res.value
    }
  })
}
</script>

<style scoped>
.board {
  margin: 10% auto;
  padding: 0 100px;
  text-align: center;
  background-color: antiquewhite;
}
.alert {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1050;
  margin: 10px 20%;
}
.header {
  margin: 15px auto;
}
.form {
  padding: 0 20%;
}
.button {
  margin-top: 30px;
}
</style>

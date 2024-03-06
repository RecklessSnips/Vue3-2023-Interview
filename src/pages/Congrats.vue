<template>
  <div class="body d-flex flex-column justify-content-start align-items-center fantasy">
    <div class="container fantasy mt-5" style="overflow-y: auto">
      <div class="d-flex align-items-center justify-content-center mt-5 mb-3">
        <div class="text-center p-3 mb-3 rounded">
          <!-- A++ -->
          <h1 class="rainbow-text" v-if="getGrade() === 'A++'">
            <span class="emoji">&#129395;</span> Full score! Fantastic!!!
            <span class="emoji">&#129321;</span>
          </h1>
          <!-- A+ -->
          <h1 class="rainbow-text" v-if="getGrade() === 'A+'">
            <span class="emoji">&#129321;</span> A+! Congrats!!!
            <span class="emoji">&#128518;</span>
          </h1>
          <!-- A -->
          <h1 class="rainbow-text" v-if="getGrade() === 'A'">
            <span class="emoji">&#128518;</span> Straight A! Nicely done!!!
            <span class="emoji">&#128541;</span>
          </h1>
          <!-- B+ -->
          <h1 class="fine-text" v-if="getGrade() === 'B+'">
            <span class="emoji">&#129303;</span> B+! Good job!!
          </h1>
          <!-- B -->
          <h1 class="fine-text" v-if="getGrade() === 'B'">
            <span class="emoji">&#129325;</span> Steady B! Well done!!
          </h1>
          <!-- C+ -->
          <h1 class="ok-text" v-if="getGrade() === 'C+'">
            <span class="emoji">&#129320;</span> C+! Wanna learn C++ or C#?
          </h1>
          <!-- C -->
          <h1 class="ok-text" v-if="getGrade() === 'C'">
            <span class="emoji">&#129765;</span> C! No wonder you are a programmer.
          </h1>
          <!-- D+ -->
          <h1 class="failure-text" v-if="getGrade() === 'D+'">
            <span class="emoji">&#9760;&#65039;</span> D+ ?! See you very soon.
          </h1>
          <!-- D -->
          <h1 class="failure-text" v-if="getGrade() === 'D'">
            <span class="emoji">&#129313;</span> Bruhhhhh
            <span class="emoji">&#129313;</span>
          </h1>

          <h4>
            Your Score: <span class="text-warning">{{ score }}</span>
          </h4>
        </div>
      </div>

      <!-- Use v-for to responsively control all user's mistakes -->
      <div v-for="mistake in mistakes" :key="mistake.id">
        <div class="d-flex justify-content-center mt-2 mb-2">
          <h4 v-if="!isFullScore" class="text-danger">Your carelessness:</h4>
        </div>

        <!-- Since each button's target and id needs to be unique -->
        <!-- so must bind the bs-target to the collapse id -->
        <div class="d-flex justify-content-center">
          <button
            v-if="!isFullScore"
            class="btn btn-outline-primary"
            type="button"
            data-bs-toggle="collapse"
            :data-bs-target="'#collapse' + mistake.id"
            aria-expanded="false"
            aria-controls="collapseExample"
          >
            Mistake
          </button>
        </div>

        <!-- bind with the id array -->
        <div class="collapse" :id="'collapse' + mistake.id">
          <div class="card card-body bg-warning">
            <h4>Question: {{ mistake.question }}</h4>
            <h4>Type: {{ mistake.type }}</h4>
            <h4>Difficulty: {{ mistake.difficulty }}</h4>
            <h4>Your answer: {{ mistake.userAnswer }}</h4>
            <h4>Correct answer: {{ mistake.correctAnswer }}</h4>
          </div>
        </div>
      </div>

      <div class="d-flex justify-content-center mt-4">
        <div class="d-flex flex-column align-items-center">
          <h4>Want to challenge yourself again?</h4>
          <router-link to="/cover" class="btn btn-outline-success mt-3 mb-3 me-auto ms-auto fantasy"
            >Restart</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: 'Congrats'
}
</script>

<script lang="ts" setup>
import { useUserStore } from '@/store/user'
import { storeToRefs } from 'pinia'
import { ref, onUnmounted } from 'vue'
let userStore = useUserStore()
let { score, chances, quesNum, mistakes } = storeToRefs(userStore)

let isFullScore = ref(false)

// initliaze
onUnmounted(() => {
  score.value = 0
  chances.value = 3
  quesNum.value = 0
  userStore.clean()
})

function getGrade() {
  if (score.value === 24) {
    isFullScore.value = true
    return 'A++'
  } else if (score.value <= 23 && score.value >= 20) {
    return 'A+'
  } else if (score.value <= 19 && score.value >= 17) {
    return 'A'
  } else if (score.value <= 16 && score.value >= 14) {
    return 'B+'
  } else if (score.value <= 13 && score.value >= 11) {
    return 'B'
  } else if (score.value === 10) {
    return 'C+'
  } else if (score.value === 9) {
    return 'C'
  } else if (score.value === 8) {
    return 'D+'
  } else if (score.value <= 7) {
    return 'D'
  }
}
</script>

<style scoped>
.body {
  background-color: antiquewhite;
}
.rainbow-text {
  animation: rainbow 3s linear infinite;
}

.fine-text {
  animation: fine 4s linear infinite;
}

.ok-text {
  animation: ok 4s linear infinite;
}

.failure-text {
  animation: failure 4s linear infinite;
}

@keyframes rainbow {
  0% {
    color: red;
  }
  14% {
    color: rgb(250, 171, 25);
  }
  28% {
    color: rgb(245, 245, 37);
  }
  42% {
    color: rgb(37, 158, 37);
  }
  57% {
    color: rgb(44, 44, 232);
  }
  71% {
    color: rgb(103, 29, 156);
  }
  85% {
    color: rgb(236, 124, 236);
  }
  100% {
    color: red;
  }
}

@keyframes fine {
  0% {
    color: rgb(238, 62, 62);
  }
  14% {
    color: rgb(250, 171, 25);
  }
  28% {
    color: rgb(230, 230, 91);
  }
  42% {
    color: rgb(82, 154, 82);
  }
  57% {
    color: rgb(106, 106, 218);
  }
  71% {
    color: rgb(118, 73, 151);
  }
  85% {
    color: rgb(215, 133, 215);
  }
  100% {
    color: rgb(242, 74, 74);
  }
}

@keyframes ok {
  0% {
    color: rgb(233, 156, 12);
  }
  28% {
    color: rgb(245, 245, 37);
  }
  42% {
    color: rgb(37, 158, 37);
  }
  55% {
    color: rgb(132, 235, 235);
  }
  71% {
    color: rgb(150, 94, 191);
  }
  85% {
    color: rgb(229, 169, 229);
  }
  100% {
    color: rgb(233, 156, 12);
  }
}

@keyframes failure {
  0% {
    color: rgb(94, 66, 66);
  }
  14% {
    color: rgb(122, 111, 88);
  }
  28% {
    color: rgb(135, 135, 98);
  }
  42% {
    color: rgb(98, 130, 98);
  }
  57% {
    color: rgb(72, 72, 93);
  }
  71% {
    color: rgb(113, 100, 122);
  }
  85% {
    color: rgb(117, 94, 117);
  }
  100% {
    color: rgb(116, 95, 95);
  }
}
</style>

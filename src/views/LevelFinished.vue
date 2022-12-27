<template>
    <div class="m-main o-levelFinished">
        <div class="o-levelFinished__textContainer">
            <h1 class="o-levelFinished__title">LEVEL CLEARED</h1>
            <p class="o-levelFinished__text">you found<br /></p>
            <button @click="router.push({ name: 'home', params: { nextLevel: 'yes', yyy: 'uyyy' } })" class="a-button">
                Next level
            </button>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useTurn } from '@/composables/useTurn'
import { ETurnState } from '@/enums/ETurnState'
import { useRouter } from 'vue-router'

const { updateTurnStateMachine } = useTurn()
updateTurnStateMachine(ETurnState.Init)
const router = useRouter()
</script>

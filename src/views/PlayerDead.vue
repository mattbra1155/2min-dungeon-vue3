<script setup lang="ts">
import { onMounted } from 'vue'
import { useTurn } from '@/composables/useTurn'
import { useRouter } from 'vue-router'
import { usePlayer } from '@/composables/usePlayer'
import { useSceneManager } from '@/composables/useSceneManager'
import { ETurnState } from '@/enums/ETurnState'
import { useGameStateManager } from '@/composables/useGameStateManager'
import { EGameState } from '@/enums/EGameState'

const { deadPlayer } = usePlayer()
const router = useRouter()
const { activeCharacter, resetTurn } = useTurn()
const { resetScene } = useSceneManager()
const { updateGameState } = useGameStateManager()

const init = () => {
    deadPlayer()
    resetTurn()
    updateGameState(EGameState.PlayerDead)
    resetScene()
    // createScene()
}

init()
</script>

<template>
    <div class="m-main o-playerDead">
        <div class="o-playerDead__textContainer">
            <h1 class="o-playerDead__title">YOU DIED</h1>
            <p class="o-playerDead__text">
                you were killed by:<br />
                {{ activeCharacter?.name }} with a {{ activeCharacter?.weapon?.name }}
            </p>
            <button @click="router.push({ name: 'characterCreation' })" class="a-button">Try again</button>
        </div>
    </div>
</template>

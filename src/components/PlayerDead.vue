<script setup lang="ts">
import { EGameState } from '@/enums/EGameState'
import { useTurnStore } from '@/stores/useTurn'
import { useGameStateStore } from '@/stores/useGameStateManager'
import { usePlayerStore } from '@/stores/usePlayer'
import { ETurnState } from '@/enums/ETurnState'
import { useSceneManagerStore } from '@/stores/useSceneManager'

const playerStore = usePlayerStore()
const turnStore = useTurnStore()
const gameStateStore = useGameStateStore()
const sceneMangerStore = useSceneManagerStore()

const closeView = () => {
    playerStore.resetPlayer()
    turnStore.updateTurnStateMachine(ETurnState.Disabled)
    gameStateStore.updateGameState(EGameState.Init)
    sceneMangerStore.resetRoomList()
}
</script>

<template>
    <div class="m-main o-playerDead">
        <div class="o-playerDead__textContainer">
            <h1 class="o-playerDead__title">YOU DIED</h1>
            <p class="o-playerDead__text">
                you were killed by:<br />
                {{ turnStore.activeCharacter?.name }} with a {{ turnStore.activeCharacter?.weapon?.name }}
            </p>
            <button @click="closeView" class="a-button">Try again</button>
        </div>
    </div>
</template>

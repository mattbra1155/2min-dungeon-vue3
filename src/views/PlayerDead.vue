<script setup lang="ts">
import { useRouter } from 'vue-router'
import { EGameState } from '@/enums/EGameState'
import { useFeedStore } from '@/stores/useFeed'
import { useTurnStore } from '@/stores/useTurn'
import { useGameStateStore } from '@/stores/useGameStateManager'

const playerStore = usePlayer()
const router = useRouter()
const feedStore = useFeedStore()
const turnStore = useTurnStore()
const gameStateStore = useGameStateStore()

const init = () => {
    playerStore.deadPlayer()
    gameStateStore.updateGameState(EGameState.PlayerDead)
    feedStore.resetBattleFeed()
}

const closeView = () => {
    turnStore.resetTurn()
    router.push({ name: 'characterCreation' })
}

init()

function usePlayer(): { deadPlayer: any } {
    throw new Error('Function not implemented.')
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

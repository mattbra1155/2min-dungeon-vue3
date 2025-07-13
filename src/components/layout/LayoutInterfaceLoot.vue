<script setup lang="ts">
import { EGameState } from '@/enums/EGameState'
import { useGameStateStore } from '@/stores/useGameStateManager'

const gameStateStore = useGameStateStore()
const close = () => {
    if (gameStateStore.isStory) {
        gameStateStore.updateGameState(EGameState.Story)
    } else {
        gameStateStore.updateGameState(EGameState.Travel)
    }
}
</script>

<template>
    <div class="o-interface">
        <div class="o-interface__row">
            <button class="a-button" @click="close">Close</button>
        </div>
    </div>
</template>

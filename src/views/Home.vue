<script setup lang="ts">
import { watch } from 'vue'
import LayoutInterface from '@/components/layout/LayoutInterface.vue'
import LayoutFeed from '@/components/layout/LayoutFeed.vue'
import { useGameStateManager } from '@/composables/useGameStateManager'
import { useSceneManager } from '@/composables/useSceneManager'
import { EGameState } from '@/enums/EGameState'
import { useTurn } from '@/composables/useTurn'
import { ETurnState } from '@/enums/ETurnState'
import { usePlayer } from '@/composables/usePlayer'
import { useRouter } from 'vue-router'
import LayoutTopBar from '@/components/layout/LayoutTopBar.vue'

const { activeGameState } = useGameStateManager()
const { createScene } = useSceneManager()
const { updateTurnStateMachine, turnOrder } = useTurn()
const { player } = usePlayer()
const router = useRouter()

if (history.state.nextLevel) {
    createScene()
}

if (activeGameState.value === EGameState.Battle) {
    updateTurnStateMachine(ETurnState.Init)
}

watch(player.value, () => {
    if (player.value.isAlive === false) {
        router.push({ name: 'playerDead' })
    }
})

watch(turnOrder.value, () => {
    if (!turnOrder.value.length) {
        router.push({ name: 'levelFinished' })
    }
})
</script>

<template>
    <div class="home">
        <LayoutTopBar />
        <LayoutFeed />
        <LayoutInterface />
    </div>
</template>

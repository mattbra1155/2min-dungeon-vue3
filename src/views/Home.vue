<script setup lang="ts">
import { watch } from 'vue'
import LayoutInterface from '@/components/layout/LayoutInterface.vue'
import LayoutFeed from '@/components/layout/LayoutFeed.vue'
import { useGameStateManager } from '@/composables/useGameStateManager'
import { EGameState } from '@/enums/EGameState'
import { useTurn } from '@/composables/useTurn'
import { ETurnState } from '@/enums/ETurnState'
import { useRouter } from 'vue-router'
import LayoutTopBar from '@/components/layout/LayoutTopBar.vue'
import { sceneManager } from '@/assets/models/SceneManager'

const { activeGameState } = useGameStateManager()
const { turnModel } = useTurn()
import { player } from '@/assets/models/playerManager'
const router = useRouter()

if (history.state.nextLevel) {
    sceneManager.createScene()
}

if (activeGameState.value === EGameState.Battle) {
    turnModel.value.updateTurnStateMachine(ETurnState.Init)
}

watch(player, () => {
    if (player.isAlive === false) {
        router.push({ name: 'playerDead' })
    }
})

watch(turnModel.value.turnOrder, () => {
    if (!turnModel.value.turnOrder.length) {
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

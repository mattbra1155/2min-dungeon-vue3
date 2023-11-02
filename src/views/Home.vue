<script setup lang="ts">
import { onMounted, watch } from 'vue'
import LayoutInterface from '@/components/layout/LayoutInterface.vue'
import LayoutFeed from '@/components/layout/LayoutFeed.vue'
import { useGameStateManager } from '@/composables/useGameStateManager'
import { EGameState } from '@/enums/EGameState'
import { useTurn } from '@/composables/useTurn'
import { ETurnState } from '@/enums/ETurnState'
import { usePlayer } from '@/composables/usePlayer'
import { useRouter } from 'vue-router'
import LayoutTopBar from '@/components/layout/LayoutTopBar.vue'
import LayoutInterfaceTravel from '@/components/layout/LayoutInterfaceTravel.vue'
import { useSceneManager } from '@/composables/useSceneManager'

const { activeScene, createScene } = useSceneManager()
const { activeGameState } = useGameStateManager()
const { turnModel } = useTurn()
const { player } = usePlayer()
const router = useRouter()

if (history.state.nextLevel) {
    createScene()
}

if (activeGameState.value === EGameState.Battle) {
    turnModel.value.updateTurnStateMachine(ETurnState.Init)
}

watch(player.value, () => {
    if (player.value.isAlive === false) {
        router.push({ name: 'playerDead' })
    }
})

watch(turnModel.value.turnOrder, () => {
    if (!turnModel.value.turnOrder.length) {
        router.push({ name: 'levelFinished' })
    }
})

onMounted(() => {
    if (!activeScene.value) {
        return
    }
    const entry = activeScene.value.roomList.find((room) => room.id === 0)

    if (!entry) {
        return
    }
    activeScene.value.changeCurrentRoom(entry)
    console.log(activeScene.value)
})
</script>

<template>
    <div class="home">
        <LayoutTopBar />
        <LayoutFeed />
        <LayoutInterface v-if="activeGameState === EGameState.Battle" />
        <LayoutInterfaceTravel v-else />
    </div>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue'
import LayoutInterface from '@/components/layout/LayoutInterface.vue'
import { useGameStateManager } from '@/composables/useGameStateManager'
import { EGameState } from '@/enums/EGameState'
import { useTurn } from '@/composables/useTurn'
import { ETurnState } from '@/enums/ETurnState'
import { usePlayer } from '@/composables/usePlayer'
import { useRouter } from 'vue-router'
import LayoutTopBar from '@/components/layout/LayoutTopBar.vue'
import LayoutInterfaceTravel from '@/components/layout/LayoutInterfaceTravel.vue'
import { useSceneManagerStore } from '@/stores/useSceneManager'
import FeedPanel from '@/components/FeedPanel.vue'

const { loadScene } = useSceneManagerStore()
const { activeGameState } = useGameStateManager()
const { updateTurnStateMachine } = useTurn()
const { player } = usePlayer()
const router = useRouter()

if (activeGameState.value === EGameState.Battle) {
    updateTurnStateMachine(ETurnState.Init)
}

watch(
    () => activeGameState.value,
    (state) => {
        if (state === EGameState.Travel) {
            updateTurnStateMachine(ETurnState.Disabled)
        }
        if (state === EGameState.Battle) {
            updateTurnStateMachine(ETurnState.Init)
        }
        if (state === EGameState.LevelCleared) {
            router.push({ name: 'levelFinished' })
        }
    }
)

watch(player.value, () => {
    if (player.value.isAlive === false) {
        router.push({ name: 'playerDead' })
    }
})

onMounted(async () => {
    await loadScene()
})
</script>

<template>
    <div class="home">
        <LayoutTopBar />
        <FeedPanel />
        <LayoutInterface v-if="activeGameState === EGameState.Battle" />
        <LayoutInterfaceTravel v-if="activeGameState === EGameState.Travel" />
    </div>
</template>

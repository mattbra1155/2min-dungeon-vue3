<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import LayoutInterfaceCombat from '@/components/layout/LayoutInterfaceCombat.vue'
import { EGameState } from '@/enums/EGameState'
import { ETurnState } from '@/enums/ETurnState'
import LayoutTopBar from '@/components/layout/LayoutTopBar.vue'
import LayoutInterfaceTravel from '@/components/layout/LayoutInterfaceTravel.vue'
import { useSceneManagerStore } from '@/stores/useSceneManager'
import FeedPanel from '@/components/FeedPanel.vue'
import { useGameStateStore } from '@/stores/useGameStateManager'
import { usePlayerStore } from '@/stores/usePlayer'
import { useTurnStore } from '@/stores/useTurn'
import LayoutInterfaceLoot from '@/components/layout/LayoutInterfaceLoot.vue'

const sceneManger = useSceneManagerStore()
const gameStateStore = useGameStateStore()
const turnStore = useTurnStore()
const playerStore = usePlayerStore()
const router = useRouter()

if (gameStateStore.activeGameState === EGameState.Battle) {
    turnStore.updateTurnStateMachine(ETurnState.Init)
}
watch(
    () => playerStore.player,
    () => {
        if (playerStore.player?.isAlive === false) {
            router.push({ name: 'playerDead' })
        }
    }
)
</script>

<template>
    <div class="home">
        {{ gameStateStore.activeGameState }}
        <LayoutTopBar />
        <FeedPanel />
        <LayoutInterfaceCombat v-if="gameStateStore.activeGameState === EGameState.Battle" />
        <LayoutInterfaceLoot v-else-if="gameStateStore.activeGameState === EGameState.Loot" />
        <LayoutInterfaceTravel v-else />
    </div>
</template>

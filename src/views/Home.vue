<script setup lang="ts">
import { watch } from 'vue'
import Feed from '@/components/layout/Feed.vue'
import TopBar from '@/components/layout/TopBar.vue'
import Interface from '@/components/layout/Interface.vue'
import { useGameStateManager } from '@/composables/useGameStateManager'
import { useSceneManager } from '@/composables/useSceneManager'
import { EGameState } from '@/enums/EGameState'
import { useTurn } from '@/composables/useTurn'
import { ETurnState } from '@/enums/ETurnState'
import { usePlayer } from '@/composables/usePlayer'
import { useRouter } from 'vue-router'
import { ItemGenerator } from '@/assets/generators/itemGenerator'
import { EItemCategory } from '@/enums/ItemCategory'

const { activeGameState } = useGameStateManager()
const { createScene } = useSceneManager()
const { updateTurnStateMachine, turnOrder } = useTurn()
const { player } = usePlayer()
const router = useRouter()

if (history.state.nextLevel) {
    createScene()
}

const armor = new ItemGenerator().createItem(EItemCategory.Armor)

console.log(armor)

if (activeGameState.value === EGameState.Battle) {
    updateTurnStateMachine(ETurnState.Init)
}

watch(player.value, () => {
    if (player.value.isAlive === false) {
        router.push({ name: 'playerDead' })
    }
})

watch(turnOrder.value, () => {
    console.log(turnOrder.value)
    if (!turnOrder.value.length) {
        router.push({ name: 'levelFinished' })
    }
})
</script>

<template>
    <div class="home">
        <TopBar />
        <Feed />
        <Interface />
    </div>
</template>

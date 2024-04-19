<script setup lang="ts">
import { onMounted } from 'vue'
import { useTurn } from '@/composables/useTurn'
import { useRouter } from 'vue-router'
import { usePlayer } from '@/composables/usePlayer'
import { useSceneManagerStore } from '@/stores/useSceneManager'
import { ETurnState } from '@/enums/ETurnState'
import { useGameStateManager } from '@/composables/useGameStateManager'
import { EGameState } from '@/enums/EGameState'
import { useFeedStore } from '@/stores/useFeed'

const { deadPlayer } = usePlayer()
const router = useRouter()
const feedStore = useFeedStore()
const { activeCharacter, resetTurn } = useTurn()
const { resetMapLocation, resetMapLocationList } = useSceneManagerStore()
const { updateGameState } = useGameStateManager()

const init = () => {
    deadPlayer()
    updateGameState(EGameState.PlayerDead)
    resetMapLocation()
    resetMapLocationList()
    feedStore.resetBattleFeed()
}

const closeView = () => {
    resetTurn()
    router.push({ name: 'characterCreation' })
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
            <button @click="closeView" class="a-button">Try again</button>
        </div>
    </div>
</template>

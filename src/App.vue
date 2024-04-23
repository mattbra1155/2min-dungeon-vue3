<script lang="ts">
import { MonsterGenerator } from './assets/generators/monsterGenerator'
import InventoryPanel from './components/InventoryPanel.vue'
import CharacterScreen from './components/CharacterScreen.vue'

const monsterGenerator = new MonsterGenerator()

export { monsterGenerator }
</script>

<script setup lang="ts">
import { usePlayer } from './composables/usePlayer'
import { useRouter } from 'vue-router'
import { useGameStateManager } from './composables/useGameStateManager'
import { EGameState } from './enums/EGameState'
import { PlayerModel } from './assets/models/playerModel'
import { useSceneManagerStore } from '@/stores/useSceneManager'
import { storeToRefs } from 'pinia'
const sceneManager = useSceneManagerStore()
const { fetchPlayer, setPlayer } = usePlayer()
const { activeGameState, updateGameState } = useGameStateManager()
const router = useRouter()

const init = async () => {
    updateGameState(EGameState.Init)
    if (activeGameState.value === EGameState.Init) {
        const player: PlayerModel | undefined = await fetchPlayer()
        if (player) {
            await setPlayer(player)
            updateGameState(EGameState.Travel)
            router.push({ name: 'home' })
        } else {
            updateGameState(EGameState.CreateChar)
            router.push({ name: 'characterCreation' })
        }
        sceneManager.createLocations('outskirts_north')

    }
}

// starts the app
init()
</script>

<template>
    <nav class="nav">
        <router-link to="/">Main</router-link>
        <router-link to="/character-creation/">Create</router-link>
    </nav>

    <router-view class="o-page" />
    <inventory-panel />
    <character-screen />
</template>

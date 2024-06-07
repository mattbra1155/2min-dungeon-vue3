<script lang="ts">
import { MonsterGenerator } from './assets/generators/monsterGenerator'
import InventoryPanel from './components/InventoryPanel.vue'
import CharacterScreen from './components/CharacterScreen.vue'
import LoadingScreen from './components/LoadingScreen.vue'
import { useFeedStore } from './stores/useFeed'
import localforage from 'localforage'
import { ref } from 'vue'
import { useGlobalStore } from './stores/useGlobal'

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
const sceneManager = useSceneManagerStore()
const { fetchPlayer, setPlayer } = usePlayer()
const { activeGameState, updateGameState } = useGameStateManager()
const router = useRouter()
const globalStore = useGlobalStore()
globalStore.toggleIsLoading()

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

        try {
            console.time('qq')
            sceneManager.createLocations('castle_drakenhof')
            console.timeEnd('qq')
        } catch (error) {
            console.error(error)
        } finally {
            globalStore.toggleIsLoading()
        }

        if (sceneManager.activeRoom?.x === undefined && sceneManager.activeRoom?.y === undefined) {
            return
        }
        sceneManager.moveToLocation(sceneManager.activeRoom?.x, sceneManager.activeRoom?.y)
    }
}

const resetStorage = () => {
    localforage.removeItem('activeRoom')
    localforage.removeItem('initPlayer')
    localforage.removeItem('instanceList')
    localforage.removeItem('locationList')
    localforage.removeItem('player')
    localforage.removeItem('savedSceneList')

    window.location.reload()
}

// starts the app
init()
</script>

<template>
    <nav class="nav">
        <router-link class="a-text --dark" to="/">Main</router-link>
        <router-link class="a-text --dark" to="/character-creation/">Create</router-link>
        <button @click="resetStorage()" class="a-text --dark">Reset storage</button>
    </nav>

    <router-view class="o-page" />
    <inventory-panel />
    <character-screen />
    <LoadingScreen v-if="globalStore.isLoading" />
</template>

<style scoped>
nav {
    display: flex;
    gap: 1rem;
}
</style>

<script lang="ts">
import { MonsterGenerator } from './assets/generators/monsterGenerator'
import InventoryPanel from './components/InventoryPanel.vue'
import CharacterScreen from './components/CharacterScreen.vue'
import LoadingScreen from './components/LoadingScreen.vue'
import localforage from 'localforage'
import { useGlobalStore } from './stores/useGlobal'
import { useGameStateStore } from './stores/useGameStateManager'

const monsterGenerator = new MonsterGenerator()

export { monsterGenerator }
</script>

<script setup lang="ts">
import { EGameState } from '@/enums/EGameState'
const { updateGameState } = useGameStateStore()
const globalStore = useGlobalStore()
globalStore.toggleIsLoading()

const init = async () => {
    updateGameState(EGameState.Init)
}

const resetStorage = () => {
    localforage.removeItem('activeRoom')
    localforage.removeItem('initPlayer')
    localforage.removeItem('instanceList')
    localforage.removeItem('visitedLocationList')
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

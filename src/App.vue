<script setup lang="ts">
import { onMounted } from 'vue'
import { usePlayer } from './composables/usePlayer'
import { useRouter } from 'vue-router'
import { IPlayer } from './interfaces/IPlayer'
import { useGameStateManager } from './composables/useGameStateManager'
import { EGameState } from './enums/EGameState'
import InventoryPanel from './components/InventoryPanel.vue'

const { fetchPlayer, setPlayer } = usePlayer()
const { activeGameState, updateGameState } = useGameStateManager()
const router = useRouter()

const init = async () => {
    updateGameState(EGameState.Init)
    if (activeGameState.value === EGameState.Init) {
        const player: IPlayer | undefined = await fetchPlayer()
        if (player) {
            await setPlayer(player)
            updateGameState(EGameState.Battle)
            router.push({ name: 'home' })
        } else {
            updateGameState(EGameState.CreateChar)
            router.push({ name: 'characterCreation' })
        }
    }
}

// starts the app
init()
</script>

<template>
    <div id="app">
        <nav class="nav">
            <router-link to="/">Main</router-link>
            <router-link to="/character-creation/">Create</router-link>
        </nav>
        <router-view />
        <inventory-panel />
    </div>
</template>

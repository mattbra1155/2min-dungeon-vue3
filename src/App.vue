<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useGameStateManager } from './composables/useGameStateManager'
import { EGameState } from './enums/EGameState'
import InventoryPanel from './components/InventoryPanel.vue'
import CharacterScreen from './components/CharacterScreen.vue'
import { playerManager } from './assets/models/playerManager'
import { IPlayer } from './interfaces/IPlayer'

const { activeGameState, updateGameState } = useGameStateManager()
const router = useRouter()

const init = async () => {
    updateGameState(EGameState.Init)
    if (activeGameState.value === EGameState.Init) {
        const player: IPlayer | undefined = await playerManager.fetchPlayer()
        if (player) {
            await playerManager.setPlayer(player)
            updateGameState(EGameState.Battle)
            router.push({ name: 'home' })
            return player
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

        <router-view class="o-page" />
        <inventory-panel />
        <character-screen />
    </div>
</template>

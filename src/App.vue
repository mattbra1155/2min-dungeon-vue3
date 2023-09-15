<script setup lang="ts">
import { usePlayer } from './composables/usePlayer'
import { useRouter } from 'vue-router'
import { useGameStateManager } from './composables/useGameStateManager'
import { EGameState } from './enums/EGameState'
import InventoryPanel from './components/InventoryPanel.vue'
import CharacterScreen from './components/CharacterScreen.vue'
import { PlayerModel } from './assets/models/playerModel'

const { fetchPlayer, setPlayer, player: pp } = usePlayer()
const { activeGameState, updateGameState } = useGameStateManager()
const router = useRouter()

const init = async () => {
    updateGameState(EGameState.Init)
    if (activeGameState.value === EGameState.Init) {
        const player: PlayerModel | undefined = await fetchPlayer()
        if (player) {
            console.log(player)
            await setPlayer(player)
            updateGameState(EGameState.Battle)
            console.log(player)
            router.push({ name: 'home' })
            return player
        } else {
            console.log(player)
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

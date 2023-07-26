<script setup lang="ts">
import { usePlayer } from './composables/usePlayer'
import { useRouter } from 'vue-router'
import { useGameStateManager } from './composables/useGameStateManager'
import { EGameState } from './enums/EGameState'
import InventoryPanel from './components/InventoryPanel.vue'
import CharacterScreen from './components/CharacterScreen.vue'
import { PlayerModel } from './assets/models/playerModel'
import { ModifierItem } from './assets/models/modifierItemModel'
import { EModifierTypes } from './enums/EModifierTypes'

const { fetchPlayer, setPlayer } = usePlayer()
const { activeGameState, updateGameState } = useGameStateManager()
const router = useRouter()

const init = async () => {
    updateGameState(EGameState.Init)
    if (activeGameState.value === EGameState.Init) {
        // TO FIX: Player is not a class but just a object with interface added.
        const player: PlayerModel | undefined = await fetchPlayer()
        if (player) {
            await setPlayer(player)
            updateGameState(EGameState.Battle)
            console.log(player)
            const mmm = new ModifierItem(
                888,
                'test',
                EModifierTypes.Passive,
                { attacks: 4, ranged: 100 },
                player,
                player,
                true
            )
            const nnn = new ModifierItem(
                999,
                'test123',
                EModifierTypes.Passive,
                { hp: 44, melee: 120 },
                player,
                player,
                true
            )
            player.modifiers.addItem(mmm)
            player.modifiers.addItem(nnn)
            router.push({ name: 'home' })
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
        <router-view />
        <inventory-panel />
        <character-screen />
    </div>
</template>

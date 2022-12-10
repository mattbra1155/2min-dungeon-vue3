<template>
    <div id="app">
        <nav class="nav">
            <router-link to="/">Main</router-link>
            <router-link to="/character-creation/">Create</router-link>
        </nav>
        <router-view />
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, watch } from 'vue'
import { useSceneManager } from '@/composables/useSceneManager'
import { useTurn } from '@/composables/useTurn'
import { usePlayer } from './composables/usePlayer'
import { useRouter } from 'vue-router'
import { IPlayer } from './interfaces/IPlayer'
import { useGameStateManager } from './composables/useGameStateManager'
import { EGameState } from './enums/EGameState'
export default defineComponent({
    setup() {

        const { fetchPlayer, setPlayer, initPlayer } = usePlayer()
        const { activeGameState, updateGameState } = useGameStateManager()
        const router = useRouter()

        onMounted(async () => {
            updateGameState(EGameState.Init)
                if (activeGameState.value === EGameState.Init) {
                    const player: IPlayer | undefined = await fetchPlayer()
                    if (player) {
                        await setPlayer(player)
                        updateGameState(EGameState.Battle)
                        router.push({ name: 'home' })
                    } else {
                        updateGameState(EGameState.Create)
                        router.push({ name: 'characterCreation' })
                    }
                }
        })
        return {}
    },
})
</script>

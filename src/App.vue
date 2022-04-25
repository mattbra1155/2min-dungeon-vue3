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
import { useTurn } from '@/composables/index'
import { usePlayer } from './composables/usePlayer'
import { useRouter } from 'vue-router'
import { IPlayer } from './interfaces/IPlayer'
import { ETurnState } from './enums/TurnState'
import { useStateManager } from './composables/useStateManager'
import { EGameState } from './enums/EGameState'
// import { useEnemy } from './composables/useEnemy'
export default defineComponent({
    setup() {
        
        const { turnState, turnStateMachine } = useTurn()
        const { fetchPlayer, setPlayer } = usePlayer()
        const { activeGameState, updateGameState } = useStateManager()
        const router = useRouter()

        updateGameState(EGameState.Init)
       
        watch(activeGameState, (newState, oldState) => {
            console.log(`${oldState} => ${newState}`)
            updateGameState(newState)
        })

        onMounted(async () => {
            try {
                const player: IPlayer | undefined = await fetchPlayer()
                console.log(player)
                if (player) {
                    await setPlayer(player)
                } else {
                    router.push({ name: 'characterCreation' })
                }
            } catch (error) {
                console.log(error)
            }

            router.push({ name: 'home' })
        })

        return {}
    },
})
</script>

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
import { useGameStateManager } from './composables/useGameStateManager'
import { EGameState } from './enums/EGameState'
// import { useEnemy } from './composables/useEnemy'
export default defineComponent({
    setup() {

        const { fetchPlayer, setPlayer } = usePlayer()
        const { activeGameState, updateGameState } = useGameStateManager()
        const router = useRouter()



        // watch(activeGameState, (newState, oldState) => {
        //     console.log(`${oldState} => ${newState}`)
        //     updateGameState(newState)
        // })

        onMounted(async () => {
            updateGameState(EGameState.Init)

            try {

                if (activeGameState.value === EGameState.Init) {

                    const player: IPlayer | undefined = await fetchPlayer()
                    console.log(player)
                    if (player) {
                        await setPlayer(player)
                    } else {
                        router.push({ name: 'characterCreation' })
                    }
                }

            } catch (error) {
                console.log(error)
            }
            updateGameState(EGameState.Battle)

            router.push({ name: 'home' })

        })

        return {}
    },
})
</script>

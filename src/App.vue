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
// import { useEnemy } from './composables/useEnemy'
export default defineComponent({
    setup() {
        const { createScene } = useSceneManager()
        const { turnStateMachine } = useTurn()
        const { fetchPlayer, setPlayer } = usePlayer()
        // const { enemy } = useEnemy()
        // const { enemy } = useTurn()
        const router = useRouter()

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

            createScene('level 1', 4)
            watch(turnStateMachine, (oldState, newState) => {
                console.log(oldState, newState)
            })
            turnStateMachine()
            router.push({ name: 'home' })
        })
        return {}
    },
})
</script>

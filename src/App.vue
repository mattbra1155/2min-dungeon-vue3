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
import { defineComponent, onMounted, reactive, watch } from 'vue'
import { ItemGenerator } from '@/assets/generators/itemGenerator'
import { useSceneManager } from '@/composables/useSceneManager'
import { useTurn } from '@/composables/useTurn'
import { usePlayer } from './composables/usePlayer'
import { useRoute, useRouter } from 'vue-router'
// import { useEnemy } from './composables/useEnemy'
export default defineComponent({
    setup() {
        const { scene, createScene } = useSceneManager()
        const { turnStateMachine } = useTurn()
        const { player, fetchPlayer } = usePlayer()
        // const { enemy } = useEnemy()
        // const { enemy } = useTurn()
        const router = useRouter()
        const route = useRoute()

        onMounted(async () => {
            try {
                const player = await fetchPlayer()
                console.log(player)
                if (!player) {
                    router.push({ name: 'characterCreation' })
                }
            } catch (error) {
                console.log(error)
                return
            }

            createScene('level 1', 4)
            watch(turnStateMachine, (oldState, newState) => {
                console.log(oldState, newState)
            })
            turnStateMachine()
        })
        return {}
    },
})
</script>

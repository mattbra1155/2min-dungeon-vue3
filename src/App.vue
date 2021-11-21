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
import { defineComponent, reactive, watch } from 'vue'
import { ItemGenerator } from '@/assets/generators/itemGenerator'
import { useSceneManager } from '@/composables/useSceneManager'
import { useTurn } from '@/composables/useTurn'
import { usePlayer } from './composables/usePlayer'
// import { useEnemy } from './composables/useEnemy'
export default defineComponent({
    setup() {
        const { scene, createScene } = useSceneManager()
        const { sortTurnOrder, turnStateMachine } = useTurn()
        const { player } = usePlayer()
        // const { enemy } = useEnemy()
        // const { enemy } = useTurn()
        // console.log(player.value.attack(enemy.value))

        createScene('level 1', 4)
        watch(turnStateMachine, (oldState, newState) => {
            console.log(oldState, newState)
        })
        turnStateMachine()

        return {}
    },
})
</script>

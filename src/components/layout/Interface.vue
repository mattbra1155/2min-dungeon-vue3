<template>
    <div class="o-interface">
        <button
            id="attackButtonOne"
            type="button"
            class="action__button"
            @click="attack"
            :disbaled="turnState !== 'Player attack'"
        >
            Attack1
        </button>
        <button id="inventoryButton" type="button" class="action__button">Inventory</button>
    </div>
</template>

<script lang="ts">
import { usePlayer } from '@/composables/usePlayer'
import { useSceneManager } from '@/composables/useSceneManager'
import { useTurn } from '@/composables/useTurn'

import { ETurnState } from '@/enums/TurnState'

import { defineComponent } from 'vue'
export default defineComponent({
    setup() {
        const { turnState } = useTurn()
        const { player } = usePlayer()
        const { scene } = useSceneManager()
        const attack = () => {
            player.value.attack(scene.value.enemy[0])
        }
        console.log(turnState.value)
        return {
            attack,
            turnState,
        }
    },
})
</script>

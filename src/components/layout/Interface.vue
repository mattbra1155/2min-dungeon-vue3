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
import { iMonster } from '@/interfaces/Monster'
import { iPlayer } from '@/interfaces/Player'

import { defineComponent, reactive } from 'vue'
export default defineComponent({
    setup() {
        const { turnState, changeTurnState } = useTurn()
        const { player, targetToAttack } = usePlayer()
        const { scene } = useSceneManager()

        const attack = () => {
            const damage: number | undefined = player.value.attack(targetToAttack.value)
            if (damage) {
                changeTurnState(ETurnState.CalculateDamage)
            } else {
                console.log(turnState.value)
                changeTurnState(ETurnState.EnemyAttack)
            }
        }
        return {
            attack,
            turnState,
        }
    },
})
</script>

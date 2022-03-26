<template>
    <div class="o-interface">
        <button
            id="attackButtonOne"
            type="button"
            class="action__button"
            @click="attack"
            :disbaled="turnState !== 'Player attack'"
        >
            Attack
        </button>
        <button id="inventoryButton" type="button" class="action__button">Inventory</button>
    </div>
</template>

<script lang="ts">
import { useTurn } from '@/composables/useTurn'
import { ETurnState } from '@/enums/TurnState'
import { defineComponent } from 'vue'
export default defineComponent({
    setup() {
        const { turnState, changeTurnState, playerAttack } = useTurn()

        const attack = async () => {
            changeTurnState(ETurnState.PlayerAttack)
            playerAttack()
        }
        return {
            attack,
            turnState,
        }
    },
})
</script>

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
import { useTurn } from '@/composables/useTurn'
import { ETurnState } from '@/enums/TurnState'
import { defineComponent, reactive } from 'vue'
export default defineComponent({
    setup() {
        const { turnState, changeTurnState } = useTurn()

        const attack = async () => {
            changeTurnState(ETurnState.PlayerAttack)
        }
        return {
            attack,
            turnState,
        }
    },
})
</script>

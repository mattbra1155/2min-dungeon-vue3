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
import { usePlayer } from '@/composables/usePlayer'
import { useTurn } from '@/composables/useTurn'
import { ETurnState } from '@/enums/TurnState'
import { defineComponent } from 'vue'
export default defineComponent({
    setup() {
        const { turnState, changeTurnState } = useTurn()
        const { playerAttackTarget } = usePlayer()

        const attack = async () => {
            changeTurnState(ETurnState.PlayerAttack)
            playerAttackTarget()
        }
        return {
            attack,
            turnState,
        }
    },
})
</script>

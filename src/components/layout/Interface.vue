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
import { useAttack } from '@/composables/useAttack'
import { useTurn } from '@/composables/index'
import { ETurnState } from '@/enums/TurnState'
import { defineComponent } from 'vue'
export default defineComponent({
    setup() {
        const { turnState, changeTurnState } = useTurn()
        const { playerAttackTarget } = useAttack()

        const attack = () => {
            changeTurnState(ETurnState.PlayerAttack)
            playerAttackTarget()
            changeTurnState(ETurnState.EnemyAttack)
        }
        return {
            attack,
            turnState,
        }
    },
})
</script>

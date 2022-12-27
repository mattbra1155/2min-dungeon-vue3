<template>
    <div class="o-interface">
        <button
            id="attackButtonOne"
            type="button"
            class="action__button"
            @click="playerAttack"
            :disbaled="activeTurnState !== ETurnState.PlayerAttack"
            :disabled="!player.isAlive"
        >
            Attack
        </button>
        <button id=" inventoryButton" type="button" class="action__button">Inventory</button>
        <button :disabled="activeTurnState !== ETurnState.Init" @click="updateTurnStateMachine(ETurnState.Init)">
            start BATTLE
        </button>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, watch } from 'vue'

import { useAttack } from '@/composables/useAttack'
import { useEnemy } from '@/composables/useEnemy'
import { useTurn } from '@/composables/useTurn'
import { ETurnState } from '@/enums/ETurnState'
import { usePlayer } from '@/composables/usePlayer'
import { IMonster } from '@/interfaces/IMonster'
import { IPlayer } from '@/interfaces/IPlayer'
import { useGameStateManager } from '@/composables/useGameStateManager'
import { EGameState } from '@/enums/EGameState'

export default defineComponent({
    setup() {
        const { activeTurnState, activeCharacter, updateTurnStateMachine } = useTurn()
        const { targetToAttack, attack } = useAttack()
        const { player } = usePlayer()

        const playerAttack = () => {
            if (targetToAttack.value) {
                attack(activeCharacter.value, targetToAttack.value)
                updateTurnStateMachine(ETurnState.EnemyAttack)
            }
        }

        return {
            player,
            attack,
            activeTurnState,
            playerAttack,
            ETurnState,
            updateTurnStateMachine,
        }
    },
})
</script>

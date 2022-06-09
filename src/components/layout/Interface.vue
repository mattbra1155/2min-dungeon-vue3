<template>
    <div class="o-interface">
        <button id="attackButtonOne" type="button" class="action__button" @click="playerAttack"
            :disbaled="activeTurnState !== ETurnState.PlayerAttack">
            Attack
        </button>
        <button id=" inventoryButton" type="button" class="action__button">Inventory</button>
        <button @click="updateTurnStateMachine(ETurnState.Init)"> start BATTLE</button>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, watch } from 'vue'

import { useAttack } from '@/composables/useAttack'
import { useEnemy } from '@/composables/useEnemy'
import { useTurn } from '@/composables/index'
import { ETurnState } from '@/enums/ETurnState'
import { usePlayer } from '@/composables/usePlayer'
import { IMonster } from '@/interfaces/IMonster'
import { IPlayer } from '@/interfaces/IPlayer'
import { useGameStateManager } from '@/composables/useGameStateManager'
import { EGameState } from '@/enums/EGameState'

export default defineComponent({
    setup() {
        const { activeTurnState, activeCharacter, turnOrder, updateTurnStateMachine } = useTurn()
        const { playerAttackTarget, setTargetToAttack, targetToAttack, attack } = useAttack()
        const { enemyAttackTarget } = useEnemy()
        const { player } = usePlayer()
        const { activeGameState, updateGameState } = useGameStateManager()

        const playerAttack = () => {
            if (targetToAttack.value) {
                attack(activeCharacter.value, targetToAttack.value)
                updateTurnStateMachine(ETurnState.EnemyAttack)
            }
        }

        watch(activeGameState, (newState) => {
            console.log(activeGameState, newState);

            updateTurnStateMachine(ETurnState.Init)
        })


        return {
            attack,
            activeTurnState,
            playerAttack,
            ETurnState,
            updateTurnStateMachine
        }
    },
})
</script>

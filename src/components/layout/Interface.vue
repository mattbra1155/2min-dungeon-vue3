<template>
    <div class="o-interface">
        <button id="attackButtonOne" type="button" class="action__button" @click="attack"
            :disbaled="activeTurnState !== 'Player attack'">
            Attack
        </button>
        <button id="inventoryButton" type="button" class="action__button">Inventory</button>
    </div>
</template>

<script lang="ts">
import { defineComponent, watch } from 'vue'

import { useAttack } from '@/composables/useAttack'
import { useEnemy } from '@/composables/useEnemy'
import { useTurn } from '@/composables/index'
import { ETurnState } from '@/enums/ETurnState'
import { usePlayer } from '@/composables/usePlayer'
import { IMonster } from '@/interfaces/IMonster'
import { IPlayer } from '@/interfaces/IPlayer'

export default defineComponent({
    setup() {
        const { activeTurnState, turnOrder, changeActiveTurnState, sortTurnOrder } = useTurn()
        const { playerAttackTarget, setTargetToAttack, targetToAttack } = useAttack()
        const { enemyAttackTarget } = useEnemy()
        const { player } = usePlayer()

        const attack = () => {
            changeActiveTurnState(ETurnState.PlayerAttack)
            playerAttackTarget()
            changeActiveTurnState(ETurnState.EnemyAttack)
        }

        const EnemyAttack = () => {
            console.log(turnOrder.value);

            turnOrder.value.forEach((enemy) => {
                console.log(`${enemy.name} attacks`)
                enemyAttackTarget(enemy, player.value)
                checkIfDead()
            })
        }

        const turnStateMachine = () => {
            switch (activeTurnState.value) {
                case ETurnState.Init:
                    console.log('TURN STATE:', ETurnState.Init)
                    changeActiveTurnState(ETurnState.SortOrder)
                    break
                case ETurnState.SortOrder:
                    console.log('TURN STATE:', ETurnState.SortOrder)
                    sortTurnOrder()
                    changeActiveTurnState(ETurnState.PlayerAttack)
                    break
                case ETurnState.PlayerAttack:
                    console.log('TURN STATE:', ETurnState.PlayerAttack)
                    console.log(targetToAttack.value)
                    break
                case ETurnState.EnemyAttack:
                    console.log('TURN STATE:', ETurnState.EnemyAttack)
                    EnemyAttack()
                    changeActiveTurnState(ETurnState.EndTurn)

                    break
                case ETurnState.CalculateDamage:
                    console.log('TURN STATE:', ETurnState.CalculateDamage)

                    break
                case ETurnState.EndTurn:
                    console.log('TURN STATE:', ETurnState.EndTurn)
                    changeActiveTurnState(ETurnState.PlayerAttack)
                    break

                default:
                    console.log('no state')
                    break
            }
        }


        const checkIfDead = () => {
            console.log('checking who is dead')
            turnOrder.value.forEach((enemy) => {
                if (enemy.stats.hp <= 0) {
                    console.log(`${enemy.name} is dead`)
                    removeDeadFromOrder(enemy)
                }
            })
            if (player.value && player.value.stats.hp <= 0) {
                console.log('Player dead')
            }
        }

        const removeDeadFromOrder = (dead: IMonster | IPlayer) => {
            const deadPerson = turnOrder.value.find((character) => character === dead)
            const deadPersonIndex = turnOrder.value.findIndex((character) => character === deadPerson)
            const updatedTurnOrder = turnOrder.value.splice(deadPersonIndex, 1)
            setTargetToAttack(null)
            return updatedTurnOrder
        }

        watch(activeTurnState, () => {
            console.log(activeTurnState.value)
            turnStateMachine()
        })


        return {
            attack,
            activeTurnState,
        }
    },
})
</script>

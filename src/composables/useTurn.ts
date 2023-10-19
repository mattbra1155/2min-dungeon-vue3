import { reactive, toRefs } from 'vue'
import { TurnModel } from '@/assets/models/turnModel'

interface iTurn {
    turnModel: TurnModel
}

const state: iTurn = reactive({
    turnModel: new TurnModel(),
})

export const useTurn = () => {
    // const sortTurnOrder = () => {
    //     if (!scene.value) {
    //         return new Error('No scene')
    //     }
    //     const sorted = scene.value.enemy.sort((a, b) => b.currentStats.initiative - a.currentStats.initiative)
    //     state.turnOrder = sorted
    //     return sorted
    // }

    // const updateTurnStateMachine = (newTurnState: ETurnState) => {
    //     if (!player.value.isAlive) {
    //         return
    //     }
    //     state.activeTurnState = newTurnState
    //     switch (state.activeTurnState) {
    //         case ETurnState.Init: {
    //             console.log('TURN STATE:', ETurnState.Init)
    //             state.turn = 1
    //             updateTurnStateMachine(ETurnState.SortOrder)
    //             break
    //         }
    //         case ETurnState.SortOrder:
    //             console.log('TURN STATE:', ETurnState.SortOrder)
    //             sortTurnOrder()
    //             updateTurnStateMachine(ETurnState.PlayerAttack)
    //             break
    //         case ETurnState.PlayerAttack:
    //             console.log('<====>')

    //             player.value.status.updateStatusList(player.value, state.turn)
    //             console.log(player.value)

    //             console.log('TURN STATE:', ETurnState.PlayerAttack)
    //             state.activeCharacter = player.value
    //             break
    //         case ETurnState.EnemyAttack: {
    //             console.log('TURN STATE:', ETurnState.EnemyAttack)
    //             const enemyAttack = () => {
    //                 state.turnOrder.forEach((enemy) => {
    //                     if (player.value.isAlive === false) {
    //                         console.log(player.value.isAlive)
    //                         return
    //                     }
    //                     enemy.status.updateStatusList(enemy, state.turn)
    //                     state.activeCharacter = enemy
    //                     console.log(`${enemy.name} attacks`)
    //                     state.activeCharacter.attack(player.value)
    //                     checkIfDead()
    //                 })
    //                 updateTurnStateMachine(ETurnState.EndTurn)
    //             }
    //             enemyAttack()
    //             break
    //         }
    //         case ETurnState.CalculateDamage:
    //             console.log('TURN STATE:', ETurnState.CalculateDamage)

    //             break
    //         case ETurnState.EndTurn:
    //             console.log('TURN STATE:', ETurnState.EndTurn)
    //             state.turn++
    //             updateTurnStateMachine(ETurnState.PlayerAttack)
    //             break

    //         default:
    //             console.log('no state')
    //             break
    //     }
    // }

    // const checkIfDead = () => {
    //     console.log('checking who is dead...')
    //     state.turnOrder.forEach((enemy) => {
    //         console.log(enemy)
    //         if (enemy.currentStats.hp <= 0) {
    //             console.log(`${enemy.name} is dead`)
    //             removeDeadFromOrder(enemy)
    //         }
    //     })
    //     if (player.value && player.value.currentStats.hp <= 0) {
    //         console.log('Player dead')
    //         player.value.isAlive = false
    //         updateGameState(EGameState.PlayerDead)
    //         return
    //     }
    // }

    // const removeDeadFromOrder = (dead: MonsterModel | PlayerModel) => {
    //     const deadPerson = state.turnOrder.find((character) => character === dead)
    //     const deadPersonIndex = state.turnOrder.findIndex((character) => character === deadPerson)
    //     const updatedTurnOrder = state.turnOrder.splice(deadPersonIndex, 1)
    //     return updatedTurnOrder
    // }

    return {
        ...toRefs(state),
        // sortTurnOrder,
        // updateTurnStateMachine,
        // checkIfDead,
    }
}

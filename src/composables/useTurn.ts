import { IMonster } from '@/interfaces/IMonster'
import { IPlayer } from '@/interfaces/IPlayer'
import { usePlayer } from '@/composables/usePlayer'
import { reactive, toRefs } from 'vue'
import { ETurnState } from '@/enums/ETurnState'
import { useSceneManager } from '@/composables/useSceneManager'
import { useEnemy } from '@/composables/useEnemy'
import { useAttack } from '@/composables/useAttack'
import { PlayerModel } from '@/assets/models/playerModel'
import { useGameStateManager } from '@/composables/useGameStateManager'
import { EGameState } from '@/enums/EGameState'

const { scene } = useSceneManager()
const { player } = usePlayer()
const { enemyAttackTarget } = useEnemy()
const { attack } = useAttack()
const { updateGameState } = useGameStateManager()

interface iTurn {
    turn: number
    turnOrder: Array<IMonster | IPlayer>
    activeTurnState: ETurnState
    activeCharacter: IPlayer | IMonster
}

const state: iTurn = reactive({
    turn: 0,
    turnOrder: [],
    activeTurnState: ETurnState.Init,
    activeCharacter: player.value
})

export const useTurn = () => {

const sortTurnOrder = () => {
        if (!scene.value) {
            return new Error('No scene')
        }
        const sorted = scene.value.enemy.sort((a, b) => b.stats.initiative - a.stats.initiative)
        state.turnOrder = sorted
        return sorted
    }

    const updateTurnStateMachine = (newTurnState: ETurnState) => {
        if (!player.value.isAlive) {
            return
        }
        state.activeTurnState = newTurnState
        switch (state.activeTurnState) {
            case ETurnState.Init:
                console.log('TURN STATE:', ETurnState.Init)
                updateTurnStateMachine(ETurnState.SortOrder)
                break
            case ETurnState.SortOrder:
                console.log('TURN STATE:', ETurnState.SortOrder)
                sortTurnOrder()
                updateTurnStateMachine(ETurnState.PlayerAttack)
                break
            case ETurnState.PlayerAttack:
                console.log('<====>');

                console.log('TURN STATE:', ETurnState.PlayerAttack)
                state.activeCharacter = player.value
                break
            case ETurnState.EnemyAttack:
                console.log('TURN STATE:', ETurnState.EnemyAttack)
                const enemyAttack = () => {
                    console.log(state.turnOrder);
                    console.log(player.value.isAlive);
                    state.turnOrder.forEach((enemy) => {
                        if (player.value.isAlive === false) {
                            console.log(player.value.isAlive);
                            return
                        }
                        state.activeCharacter = enemy
                        console.log(`${enemy.name} attacks`)
                        attack(state.activeCharacter, player.value)
                        checkIfDead()
                    })
                    updateTurnStateMachine(ETurnState.EndTurn)
                }
                enemyAttack()
                break
            case ETurnState.CalculateDamage:
                console.log('TURN STATE:', ETurnState.CalculateDamage)

                break
            case ETurnState.EndTurn:
                console.log('TURN STATE:', ETurnState.EndTurn)
                state.turn++
                updateTurnStateMachine(ETurnState.PlayerAttack)
                break

            default:
                console.log('no state')
                break
        }
    }

    const checkIfDead = () => {
        console.log('checking who is dead...')
        state.turnOrder.forEach((enemy) => {
            if (enemy.stats.hp <= 0) {
                console.log(`${enemy.name} is dead`)
                removeDeadFromOrder(enemy)
            }
        })
        if (player.value && player.value.stats.hp <= 0) {
            console.log('Player dead')
            player.value.isAlive = false
            updateGameState(EGameState.PlayerDead)
            return
        }
    }

    const removeDeadFromOrder = (dead: IMonster | IPlayer) => {
        const deadPerson = state.turnOrder.find((character) => character === dead)
        const deadPersonIndex = state.turnOrder.findIndex((character) => character === deadPerson)
        const updatedTurnOrder = state.turnOrder.splice(deadPersonIndex, 1)
        return updatedTurnOrder
    }


    return {
        ...toRefs(state),
        sortTurnOrder,
        updateTurnStateMachine,
    }
}

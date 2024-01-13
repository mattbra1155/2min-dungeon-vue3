import { reactive, toRefs } from 'vue'
import { PlayerModel } from '@/assets/models/playerModel'
import { MonsterModel } from '@/assets/models/monsterModel'
import { ETurnState } from '@/enums/ETurnState'
import { EGameState } from '@/enums/EGameState'
import { usePlayer } from '@/composables/usePlayer'
import { useGameStateManager } from '@/composables/useGameStateManager'
import { useSceneManager } from './useSceneManager'

const { updateGameState } = useGameStateManager()
const { activeScene } = useSceneManager()

interface ITurn {
    turnNumber: number
    turnOrder: Array<PlayerModel | MonsterModel> | undefined
    activeCharacter: PlayerModel | MonsterModel | undefined
    activeTurnState: ETurnState
}

const state: ITurn = reactive({
    turnNumber: 0,
    turnOrder: undefined,
    activeCharacter: undefined,
    activeTurnState: ETurnState.Init,
})

export const useTurn = () => {
    const sortTurnOrder = (entityList: Array<PlayerModel | MonsterModel>) => {
        const sorted = entityList.sort((a, b) => b.currentStats.initiative - a.currentStats.initiative)
        console.log('logn', sorted)

        state.turnOrder = sorted
        return sorted
    }

    const updateTurnStateMachine = (newTurnState: ETurnState) => {
        const { player } = usePlayer()

        const monsterList = activeScene.value?.currentRoom?.monsterList

        console.log(activeScene.value?.currentRoom?.monsterList)

        if (!player.value.isAlive) {
            return
        }
        state.activeTurnState = newTurnState
        switch (state.activeTurnState) {
            case ETurnState.Disabled: {
                state.turnNumber = 0
                state.turnOrder = undefined
                state.activeCharacter = undefined
                console.log('turn state: ', state)

                break
            }
            case ETurnState.Init: {
                console.log('TURN STATE:', ETurnState.Init)
                state.turnNumber = 1
                updateTurnStateMachine(ETurnState.SortOrder)
                break
            }
            case ETurnState.SortOrder:
                console.log('TURN STATE:', ETurnState.SortOrder)
                state.turnOrder = undefined
                console.log(monsterList)
                if (!monsterList) {
                    console.error('no monster list')

                    return
                }

                sortTurnOrder(monsterList)
                updateTurnStateMachine(ETurnState.PlayerAttack)
                break
            case ETurnState.PlayerAttack:
                console.log('<====>')

                player.value.status.updateStatusList(player.value, state.turnNumber)
                console.log(player.value)

                if (state.turnOrder?.length === 0) {
                    console.log('turn Order empty')
                    return
                }
                console.log('TURN STATE:', ETurnState.PlayerAttack)
                state.activeCharacter = player.value
                break
            case ETurnState.EnemyAttack: {
                console.log('TURN STATE:', ETurnState.EnemyAttack)
                const enemyAttack = () => {
                    if (!state.turnOrder) {
                        console.error('no turn order!')
                        return
                    }
                    const isCleared = !state.turnOrder.find((enemy) => enemy.isAlive)
                    console.log('isCleared', isCleared)

                    if (isCleared) {
                        updateGameState(EGameState.LevelCleared)
                        return
                    }
                    state.turnOrder.forEach((enemy) => {
                        if (!player.value.isAlive) {
                            console.log('Player is dead')
                            return
                        }

                        enemy.status.updateStatusList(enemy, state.turnNumber)
                        state.activeCharacter = enemy
                        console.log(`${enemy.name} attacks`)
                        state.activeCharacter.attack(player.value)
                        checkIfDead()
                    })
                    updateTurnStateMachine(ETurnState.EndTurn)
                }
                enemyAttack()
                break
            }
            case ETurnState.CalculateDamage:
                console.log('TURN STATE:', ETurnState.CalculateDamage)

                break
            case ETurnState.EndTurn:
                console.log('TURN STATE:', ETurnState.EndTurn)
                state.turnNumber++
                updateTurnStateMachine(ETurnState.PlayerAttack)
                break

            default:
                console.log('no state')
                break
        }
    }

    const checkIfDead = () => {
        const { player } = usePlayer()
        console.log('checking who is dead...')
        if (!state.turnOrder) {
            console.error('no turn order')
            return
        }
        state.turnOrder.forEach((enemy) => {
            console.log(enemy)
            if (enemy.currentStats.hp <= 0) {
                console.log(`${enemy.name} is dead`)
                enemy.isAlive = false
                // removeDeadFromOrder(enemy)
            }
        })
        if (player.value && player.value.currentStats.hp <= 0) {
            console.log('Player dead')
            player.value.isAlive = false
            updateGameState(EGameState.PlayerDead)
            return
        }
    }

    const resetTurn = () => {
        console.log('here')

        updateTurnStateMachine(ETurnState.Disabled)
    }

    // const removeDeadFromOrder = (dead: MonsterModel | PlayerModel) => {
    //     if (!state.turnOrder) {
    //         console.error('No turn order')
    //         return
    //     }
    //     console.log('dead')

    //     const deadPerson = state.turnOrder.find((character) => character === dead)
    //     const deadPersonIndex = state.turnOrder.findIndex((character) => character === deadPerson)
    //     const updatedTurnOrder = state.turnOrder.splice(deadPersonIndex, 1)
    //     return updatedTurnOrder
    // }
    return {
        ...toRefs(state),
        updateTurnStateMachine,
        resetTurn,
        checkIfDead,
    }
}

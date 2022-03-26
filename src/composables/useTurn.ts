import { iMonster } from '@/interfaces/Monster'
import { iPlayer } from '@/interfaces/Player'
import { usePlayer } from '@/composables/usePlayer'
import { reactive, toRefs } from 'vue'
import { ETurnState } from '@/enums/TurnState'
import { useSceneManager } from '@/composables/useSceneManager'

interface iTurn {
    turn: number
    turnOrder: Array<iMonster | iPlayer>
    turnState: ETurnState
}

const state: iTurn = reactive({
    turn: 0,
    turnOrder: [],
    turnState: ETurnState.Init,
})

export const useTurn = () => {
    const { scene } = useSceneManager()
    const { player, targetToAttack, setTargetToAttack } = usePlayer()

    const changeTurnState = (newState: ETurnState) => {
        state.turnState = newState
    }

    const sortTurnOrder = () => {
        const sorted = scene.value.enemy.sort((a, b) => b.stats.initiative - a.stats.initiative)
        state.turnOrder = sorted
        return sorted
    }

    const removeDeadFromOrder = (dead: iMonster | iPlayer) => {
        const deadPerson = state.turnOrder.find((character) => character === dead)
        const deadPersonIndex = state.turnOrder.findIndex((character) => character === deadPerson)
        const updatedTurnOrder = state.turnOrder.splice(deadPersonIndex, 1)
        setTargetToAttack(null)
        return updatedTurnOrder
    }

    const playerAttack = () => {
        if (!player.value) {
            return
        }
        if (!targetToAttack.value) {
            console.log('choose target')
        } else {
            const damage: number | undefined = player.value.attack(targetToAttack.value)
            if (damage) {
                changeTurnState(ETurnState.CalculateDamage)
            }
            changeTurnState(ETurnState.EnemyAttack)
        }
    }

    const turnStateMachine = () => {
        switch (state.turnState) {
            case ETurnState.Init:
                console.log(ETurnState.Init)
                changeTurnState(ETurnState.SortOrder)
                break
            case ETurnState.SortOrder:
                console.log(ETurnState.SortOrder)
                sortTurnOrder()
                changeTurnState(ETurnState.PlayerAttack)
                break
            case ETurnState.PlayerAttack:
                console.log(ETurnState.PlayerAttack)
                console.log(targetToAttack.value)
                break
            case ETurnState.EnemyAttack:
                console.log(ETurnState.EnemyAttack)
                state.turnOrder.forEach((enemy) => {
                    console.log(enemy)
                    if (!player.value) {
                        return false
                    }
                    enemy.attack(player.value)
                    console.log('ere')
                    // changeTurnState(ETurnState.CalculateDamage)
                    state.turnOrder.forEach((enemy) => {
                        if (enemy.stats.hp <= 0) {
                            removeDeadFromOrder(enemy)
                        }
                        if (player.value && player.value.stats.hp <= 0) {
                            console.log('Player dead')
                        }
                    })
                })
                break
            case ETurnState.CalculateDamage:
                console.log(ETurnState.CalculateDamage)
                state.turnOrder.forEach((enemy) => {
                    if (enemy.stats.hp <= 0) {
                        removeDeadFromOrder(enemy)
                    }
                    if (player.value && player.value.stats.hp <= 0) {
                        console.log('Player dead')
                    }
                })
                break
            case ETurnState.EndTurn:
                console.log(ETurnState.EndTurn)
                changeTurnState(ETurnState.EndTurn)
                break

            default:
                console.log('no state')
                break
        }
    }

    return {
        ...toRefs(state),
        sortTurnOrder,
        turnStateMachine,
        changeTurnState,
        playerAttack,
    }
}

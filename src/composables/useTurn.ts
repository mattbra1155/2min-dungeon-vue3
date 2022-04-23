import { IMonster } from '@/interfaces/IMonster'
import { IPlayer } from '@/interfaces/IPlayer'
import { usePlayer } from '@/composables/usePlayer'
import { reactive, toRefs } from 'vue'
import { ETurnState } from '@/enums/TurnState'
import { useSceneManager } from '@/composables/useSceneManager'
import { useEnemy } from '@/composables/useEnemy'
import { useAttack } from '@/composables/useAttack'

interface iTurn {
    turn: number
    turnOrder: Array<IMonster | IPlayer>
    turnState: ETurnState
}

const state: iTurn = reactive({
    turn: 0,
    turnOrder: [],
    turnState: ETurnState.Init,
})

export const useTurn = () => {
    const { scene } = useSceneManager()
    const { player } = usePlayer()
    const { targetToAttack, setTargetToAttack } = useAttack()
    const { enemyAttackTarget } = useEnemy()

    const changeTurnState = (newState: ETurnState) => {
        state.turnState = newState
    }

    const sortTurnOrder = () => {
        const sorted = scene.value.enemy.sort((a, b) => b.stats.initiative - a.stats.initiative)
        state.turnOrder = sorted
        return sorted
    }

    const removeDeadFromOrder = (dead: IMonster | IPlayer) => {
        const deadPerson = state.turnOrder.find((character) => character === dead)
        const deadPersonIndex = state.turnOrder.findIndex((character) => character === deadPerson)
        const updatedTurnOrder = state.turnOrder.splice(deadPersonIndex, 1)
        setTargetToAttack(null)
        return updatedTurnOrder
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
                    enemyAttackTarget(enemy, player.value)
                    console.log('enemy attack')
                    changeTurnState(ETurnState.CalculateDamage)
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
                    console.log('dead' + enemy.name)
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
    }
}

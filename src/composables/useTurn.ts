import { iMonster } from '@/interfaces/Monster'
import { iPlayer } from '@/interfaces/Player'
import { usePlayer } from '@/composables/usePlayer'
import { useEnemy } from '@/composables/useEnemy'
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

    const changeTurnState = (newState: ETurnState) => {
        state.turnState = newState
    }

    const sortTurnOrder = (sortedList: Array<iMonster | iPlayer>) => {
        state.turnOrder = scene.value.enemy
        state.turnOrder = sortedList
    }

    const calculateInitiative = () => {
        const sorted = state.turnOrder.sort((a, b) => b.stats.initiative - a.stats.initiative)
        return sorted
    }

    const turnStateMachine = () => {
        switch (state.turnState) {
            case ETurnState.Init:
                console.log(ETurnState.Init)
                changeTurnState(ETurnState.Init)
                changeTurnState(ETurnState.CalculateInitiative)
                break
            case ETurnState.CalculateInitiative:
                console.log(ETurnState.CalculateInitiative)
                changeTurnState(ETurnState.CalculateInitiative)
                calculateInitiative()
                changeTurnState(ETurnState.SortOrder)
                break
            case ETurnState.SortOrder:
                console.log(ETurnState.SortOrder)
                sortTurnOrder(calculateInitiative())
                changeTurnState(ETurnState.PlayerAttack)
                break
            case ETurnState.PlayerAttack:
                console.log(ETurnState.PlayerAttack)
                break
            case ETurnState.EnemyAttack:
                console.log(ETurnState.EnemyAttack)
                changeTurnState(ETurnState.EnemyAttack)
                break
            case ETurnState.CalculateDamage:
                console.log(ETurnState.CalculateDamage)
                changeTurnState(ETurnState.CalculateDamage)
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
    }
}

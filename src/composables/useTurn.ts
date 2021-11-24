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
    const { player } = usePlayer()

    const changeTurnState = (newState: ETurnState) => {
        state.turnState = newState
    }

    const sortTurnOrder = () => {
        const sorted = scene.value.enemy.sort((a, b) => b.stats.initiative - a.stats.initiative)
        state.turnOrder = sorted
        return sorted
    }

    const calculateDamage = (woundedPerson: iPlayer | iMonster, damage: number) => {
        return woundedPerson.stats.hp - damage
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
                break
            case ETurnState.EnemyAttack:
                console.log(ETurnState.EnemyAttack)
                console.log(state.turnOrder)
                state.turnOrder.forEach((enemy) => {
                    console.log(enemy)
                    enemy.attack(player.value)
                })
                break
            case ETurnState.CalculateDamage:
                console.log(ETurnState.CalculateDamage)

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

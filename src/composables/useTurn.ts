import { IMonster } from '@/interfaces/IMonster'
import { IPlayer } from '@/interfaces/IPlayer'
import { usePlayer } from '@/composables/usePlayer'
import { reactive, toRefs } from 'vue'
import { ETurnState } from '@/enums/ETurnState'
import { useSceneManager } from '@/composables/useSceneManager'
import { useEnemy } from '@/composables/useEnemy'
import { useAttack } from '@/composables/useAttack'

interface iTurn {
    turn: number
    turnOrder: Array<IMonster | IPlayer>
    activeTurnState: ETurnState
}

const state: iTurn = reactive({
    turn: 0,
    turnOrder: [],
    activeTurnState: ETurnState.Init,
})

export const useTurn = () => {
    const { scene } = useSceneManager()
    const { player } = usePlayer()
    const { targetToAttack, setTargetToAttack } = useAttack()
    const { enemyAttackTarget } = useEnemy()

    const changeActiveTurnState = (newState: ETurnState) => {
        state.activeTurnState = newState
        return state.activeTurnState
    }

    const sortTurnOrder = () => {
        const sorted = scene.value.enemy.sort((a, b) => b.stats.initiative - a.stats.initiative)
        state.turnOrder = sorted
        return sorted
    }




    return {
        ...toRefs(state),
        sortTurnOrder,
        changeActiveTurnState,
    }
}

import { EGameState } from '@/enums/GameState'
import { ETurnState } from '@/enums/TurnState'
import { reactive, toRefs } from 'vue'
import { useTurn } from '@/composables/index'

console.log(useTurn())

// const { turnState, changeTurnState } = test

interface IGameStateState {
    activeGameState: EGameState
}

const state: IGameStateState = reactive({
    activeGameState: EGameState.Init,
})

export const useStateManager = () => {
    const setGameState = (newState: EGameState) => {
        state.activeGameState = newState
        return state.activeGameState
    }

    const updateGameState = () => {
        switch (state.activeGameState) {
            case EGameState.Init:
                console.log('GAME STATE: Init')
                // changeTurnState(ETurnState.Init)
                break
            case EGameState.LevelCleared:
                console.log('GAME STATE: Level cleared')
                break
            case EGameState.PlayerDead:
                console.log('GAME STATE: Player dead')
                break
            case EGameState.Playing:
                console.log('GAME STATE: Playing')
                break
            default:
                console.log('GAME STATE: unset')
                break
        }
    }
    return {
        ...toRefs(state),
        setGameState,
        updateGameState,
    }
}

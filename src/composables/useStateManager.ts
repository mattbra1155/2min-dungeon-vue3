import { EGameState } from '@/enums/EGameState'
import { ETurnState } from '@/enums/TurnState'
import { reactive, toRefs } from 'vue'
import { useSceneManager } from '@/composables/useSceneManager'

const { createScene } = useSceneManager()

interface IGameStateState {
    activeGameState: EGameState
}

const state: IGameStateState = reactive({
    activeGameState: EGameState.Init,
})

export const useStateManager = () => {
    const updateGameState = (newState: EGameState) => {

        state.activeGameState = newState

        switch (state.activeGameState) {
            case EGameState.Init:
                console.log('GAME STATE: Init')
                // changeTurnState(ETurnState.Init)
                createScene('level 1', 4)
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
        updateGameState,
    }
}

import { EGameState } from '@/enums/EGameState'
import { reactive, toRefs } from 'vue'
import { useSceneManager } from '@/composables/useSceneManager'

const { createScene } = useSceneManager()

interface IGameStateState {
    activeGameState: EGameState
}

const state: IGameStateState = reactive({
    activeGameState: EGameState.Init,
})

export const useGameStateManager = () => {
    const updateGameState = (newState: EGameState) => {
        state.activeGameState = newState
        switch (state.activeGameState) {
            case EGameState.Init:
                console.log('GAME STATE: Init')
                // changeActiveTurnState(ETurnState.Init)
                createScene()
                break
            case EGameState.CreateChar:
                console.log('GAME STATE: Create Character')
                break
            case EGameState.CreateLevel:
                console.log('GAME STATE: Create Level')
                createScene()
                break
            case EGameState.Battle:
                console.log('GAME STATE: Battle started')
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

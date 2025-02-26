import { ref } from 'vue'
import { defineStore } from 'pinia'
import { EGameState } from '@/enums/EGameState'
import { useSceneManagerStore } from '@/stores/useSceneManager'

export const useGameStateStore = defineStore('gameState', () => {
    const sceneManager = useSceneManagerStore()
    const activeGameState = ref<EGameState>(EGameState.Init)

    const updateGameState = async (newState: EGameState) => {
        activeGameState.value = newState
        switch (activeGameState.value) {
            case EGameState.Init:
                console.log('GAME STATE: Init')
                break
            case EGameState.CreateChar:
                console.log('GAME STATE: Create Character')
                break
            case EGameState.CreateLevel:
                console.log('GAME STATE: Create Level')
                await sceneManager.createLocation('northern_fields')
                break
            case EGameState.Travel:
                console.log('GAME STATE: Travel')
                break
            case EGameState.Loot:
                console.log('GAME STATE: Loot')
                break
            case EGameState.Town:
                console.log('GAME STATE: Town')
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
        updateGameState,
        activeGameState,
    }
})

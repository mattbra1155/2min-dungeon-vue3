import { ref } from 'vue'
import { defineStore } from 'pinia'
import { EGameState } from '@/enums/EGameState'
import { useSceneManagerStore } from '@/stores/useSceneManager'
import { usePlayerStore } from './usePlayer'
import { useRouter } from 'vue-router'
import { useTurnStore } from './useTurn'
import { ETurnState } from '@/enums/ETurnState'

export const useGameStateStore = defineStore('gameState', () => {
    const router = useRouter()
    const sceneManager = useSceneManagerStore()
    const playerStore = usePlayerStore()
    const turnStore = useTurnStore()
    const activeGameState = ref<EGameState>(EGameState.Init)

    const updateGameState = async (newState: EGameState) => {
        activeGameState.value = newState
        switch (activeGameState.value) {
            case EGameState.Init: {
                console.log('GAME STATE: Init')
                if (playerStore.player) {
                    updateGameState(EGameState.StartGame)
                    break
                } else {
                    updateGameState(EGameState.CreateChar)
                }
                break
            }
            case EGameState.CreateChar: {
                console.log('GAME STATE: Create Character')
                router.push({ name: 'characterCreation' })
                break
            }
            case EGameState.StartGame: {
                console.log('GAME STATE: Start Game')
                // const location = await sceneManager.createLocation(undefined, 11, 11)
                // if (!location) {
                //     return
                // }
                sceneManager.moveToLocation(11, 11)
                // sceneManager.setActiveLocation()
                updateGameState(EGameState.Travel)
                break
            }
            case EGameState.Travel: {
                console.log('GAME STATE: Travel')
                turnStore.updateTurnStateMachine(ETurnState.Disabled)
                router.push({ name: 'home' })
                break
            }
            case EGameState.Town: {
                console.log('GAME STATE: Town')
                break
            }
            case EGameState.Battle: {
                console.log('GAME STATE: Battle started')
                turnStore.updateTurnStateMachine(ETurnState.Init)
                break
            }
            case EGameState.Loot: {
                console.log('GAME STATE: Loot')
                break
            }
            case EGameState.LevelCleared: {
                console.log('GAME STATE: Level cleared')
                turnStore.updateTurnStateMachine(ETurnState.Disabled)
                // updateGameState(EGameState.Travel) <-- to check if this should be triggered somewhere else
                break
            }
            case EGameState.PlayerDead: {
                console.log('GAME STATE: Player dead')
                turnStore.updateTurnStateMachine(ETurnState.Disabled)
                break
            }
            case EGameState.Playing: {
                console.log('GAME STATE: Playing')
                break
            }
            default: {
                console.log('GAME STATE: unset')
                break
            }
        }
    }
    return {
        updateGameState,
        activeGameState,
    }
})

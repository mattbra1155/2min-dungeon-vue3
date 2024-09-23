import { reactive, toRefs } from 'vue'
import { PlayerModel } from '@/assets/models/playerModel'
import { MonsterModel } from '@/assets/models/monsterModel'
import { ETurnState } from '@/enums/ETurnState'
import { EGameState } from '@/enums/EGameState'
import { usePlayer } from '@/composables/usePlayer'
import { useGameStateManager } from '@/composables/useGameStateManager'
import { useSceneManagerStore } from '@/stores/useSceneManager'
import { playAudio } from '@/helpers/playAudio'
import { useFeedStore } from '@/stores/useFeed'
import { useGlobalStore } from '@/stores/useGlobal'

const { updateGameState } = useGameStateManager()
interface ITurn {
    turnNumber: number
    turnOrder: Array<PlayerModel | MonsterModel> | undefined
    activeCharacter: PlayerModel | MonsterModel | undefined
    activeTurnState: ETurnState
    monsterList: Array<PlayerModel | MonsterModel> | undefined
}

const state: ITurn = reactive({
    turnNumber: 0,
    turnOrder: undefined,
    activeCharacter: undefined,
    activeTurnState: ETurnState.Init,
    monsterList: undefined,
})

export const useTurn = () => {
    const sortTurnOrder = (entityList: Array<PlayerModel | MonsterModel>) => {
        const sorted = entityList.sort((a, b) => b.currentStats.initiative - a.currentStats.initiative)
        state.turnOrder = sorted
        return sorted
    }

    const updateTurnStateMachine = (newTurnState: ETurnState) => {
        const { player } = usePlayer()
        const globalStore = useGlobalStore()
        const sceneManager = useSceneManagerStore()

        const monsterList = state.monsterList

        if (monsterList?.length && !monsterList.find((item) => item !== player.value)) {
            monsterList?.push(player.value)
        }
        if (!player.value.isAlive) {
            return
        }
        state.activeTurnState = newTurnState
        switch (state.activeTurnState) {
            case ETurnState.Disabled: {
                state.turnNumber = 0
                state.turnOrder = undefined
                state.activeCharacter = undefined
                console.log('turn state: ', state)
                break
            }
            case ETurnState.Init: {
                console.log('TURN STATE:', ETurnState.Init)
                state.turnNumber = 1
                updateTurnStateMachine(ETurnState.SortOrder)
                break
            }
            case ETurnState.SortOrder:
                console.log('TURN STATE:', ETurnState.SortOrder)
                state.turnOrder = undefined
                console.log(monsterList)
                if (!monsterList?.length) {
                    console.error('no monster list')
                    return
                }

                sortTurnOrder(monsterList)
                updateTurnStateMachine(ETurnState.PlayerAttack)
                break
            case ETurnState.PlayerAttack:
                console.log('<====>')

                player.value.status.updateStatusList(player.value, state.turnNumber)

                if (state.turnOrder?.length === 0) {
                    console.log('turn Order empty')
                    return
                }
                console.log('TURN STATE:', ETurnState.PlayerAttack)
                state.activeCharacter = player.value
                break
            case ETurnState.EnemyAttack: {
                console.log('TURN STATE:', ETurnState.EnemyAttack)

                const enemyAttack = () => {
                    if (!state.turnOrder) {
                        console.error('no turn order!')
                        return
                    }
                    const isCleared = !state.turnOrder.find((enemy) => enemy.isAlive)

                    if (isCleared) {
                        updateGameState(EGameState.LevelCleared)
                        return
                    }

                    state.turnOrder?.forEach((enemy, index) => {
                        globalStore.isAttacking = true
                        setTimeout(() => {
                            if (!player.value.isAlive) {
                                console.log('Player is dead')
                                return
                            }
                            if (!enemy.isAlive) {
                                console.log(`${enemy.name}`)
                                return
                            }

                            enemy.status.updateStatusList(enemy, state.turnNumber)
                            checkIfDead()
                            state.activeCharacter = enemy
                            console.log(`${enemy.name} attacks`)
                            state.activeCharacter.attack(player.value)
                            checkIfDead()
                            globalStore.isAttacking = false
                        }, 1000 * (index + 1))
                    })
                    updateTurnStateMachine(ETurnState.EndTurn)
                }

                enemyAttack()
                console.log(globalStore.isAttacking)

                break
            }
            case ETurnState.CalculateDamage:
                console.log('TURN STATE:', ETurnState.CalculateDamage)

                break
            case ETurnState.EndTurn:
                console.log('TURN STATE:', ETurnState.EndTurn)
                state.turnNumber++
                updateTurnStateMachine(ETurnState.PlayerAttack)
                break

            default:
                console.log('no state')
                break
        }
    }

    const checkIfDead = async () => {
        const { player } = usePlayer()
        const feedStore = useFeedStore()

        console.log('checking who is dead...')
        if (!state.turnOrder) {
            console.error('no turn order')
            return
        }
        state.turnOrder.forEach((enemy) => {
            if (enemy.currentStats.hp <= 0) {
                feedStore.setBattleFeedItem(`${enemy.name} is dead`)
                console.log(`${enemy.name} is dead`)
                enemy.isAlive = false
                playAudio(['24_orc_death_spin.wav'])
                removeDeadFromOrder(enemy)
                return
            }
        })
        if (player.value && player.value.currentStats.hp <= 0) {
            console.log('Player dead')
            feedStore.setBattleFeedItem(`${player.value.name} is dead`)
            await playAudio(['14_human_death_spin.wav'])
            player.value.isAlive = false
            updateGameState(EGameState.PlayerDead)
            return
        }
    }

    const resetTurn = () => {
        updateTurnStateMachine(ETurnState.Disabled)
    }

    const removeDeadFromOrder = (dead: MonsterModel | PlayerModel) => {
        if (!state.turnOrder) {
            console.error('No turn order')
            return
        }
        console.log('dead')

        const deadPerson = state.turnOrder.find((character) => character === dead)
        const deadPersonIndex = state.turnOrder.findIndex((character) => character === deadPerson)
        const updatedTurnOrder = state.turnOrder.splice(deadPersonIndex, 1)
        return updatedTurnOrder
    }
    const setMonsterList = (monsterList: MonsterModel[]) => {
        state.monsterList = monsterList
    }
    return {
        ...toRefs(state),
        updateTurnStateMachine,
        resetTurn,
        checkIfDead,
        setMonsterList,
    }
}

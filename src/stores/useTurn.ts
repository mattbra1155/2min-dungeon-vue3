import { reactive, ref, toRefs } from 'vue'
import { MonsterModel } from '@/assets/models/monsterModel'
import { ETurnState } from '@/enums/ETurnState'
import { EGameState } from '@/enums/EGameState'
import { useSceneManagerStore } from '@/stores/useSceneManager'
import { playAudio } from '@/helpers/playAudio'
import { useFeedStore } from '@/stores/useFeed'
import { useGlobalStore } from '@/stores/useGlobal'
import { useGameStateStore } from '@/stores/useGameStateManager'
import { IPlayer } from '@/interfaces/IPlayer'
import { usePlayerStore } from '@/stores/usePlayer'
import { defineStore } from 'pinia'

export const useTurnStore = defineStore('turn', () => {
    const gameStateStore = useGameStateStore()
    const turnNumber = ref<number>(0)
    const turnOrder = ref<Array<IPlayer | MonsterModel> | undefined>(undefined)
    const activeCharacter = ref<IPlayer | MonsterModel | undefined>(undefined)
    const activeTurnState = ref<ETurnState>(ETurnState.Init)
    const monsterList = ref<Array<IPlayer | MonsterModel> | undefined>(undefined)

    const sortTurnOrder = (entityList: Array<IPlayer | MonsterModel>) => {
        const sorted = entityList.sort((a, b) => b.currentStats.initiative - a.currentStats.initiative)
        turnOrder.value = sorted
        return sorted
    }

    const updateTurnStateMachine = (newTurnState: ETurnState) => {
        const playerStore = usePlayerStore()
        const globalStore = useGlobalStore()
        const sceneManager = useSceneManagerStore()

        if (!playerStore.player || !monsterList.value) {
            return
        }

        if (monsterList.value.length && !monsterList.value.find((item) => item !== playerStore.player)) {
            monsterList.value.push(playerStore.player)
        }
        if (!playerStore.player.isAlive) {
            return
        }
        activeTurnState.value = newTurnState
        switch (activeTurnState.value) {
            case ETurnState.Disabled: {
                turnNumber.value = 0
                turnOrder.value = undefined
                activeCharacter.value = undefined
                console.log('turn state: ', activeTurnState.value)
                break
            }
            case ETurnState.Init: {
                console.log('TURN STATE:', ETurnState.Init)
                turnNumber.value = 1
                updateTurnStateMachine(ETurnState.SortOrder)
                break
            }
            case ETurnState.SortOrder:
                console.log('TURN STATE:', ETurnState.SortOrder)
                turnOrder.value = undefined
                console.log(monsterList.value)
                if (!monsterList.value.length) {
                    console.error('no monster list')
                    return
                }

                sortTurnOrder(monsterList.value)
                updateTurnStateMachine(ETurnState.PlayerAttack)
                break
            case ETurnState.PlayerAttack:
                console.log('<====>')

                playerStore.player.status.updateStatusList(playerStore.player, turnNumber.value)

                if (turnOrder.value?.length === 0) {
                    console.log('turn Order empty')
                    return
                }
                console.log('TURN STATE:', ETurnState.PlayerAttack)
                activeCharacter.value = playerStore.player
                break
            case ETurnState.EnemyAttack: {
                console.log('TURN STATE:', ETurnState.EnemyAttack)

                const enemyAttack = () => {
                    if (!turnOrder.value) {
                        console.error('no turn order!')
                        return
                    }
                    const isCleared = !turnOrder.value.find((enemy) => enemy.isAlive)

                    if (isCleared) {
                        gameStateStore.updateGameState(EGameState.LevelCleared)
                        return
                    }

                    turnOrder.value?.forEach((enemy, index) => {
                        globalStore.isAttacking = true
                        setTimeout(() => {
                            if (!playerStore.player?.isAlive) {
                                console.log('Player is dead')
                                return
                            }
                            if (!enemy.isAlive) {
                                console.log(`${enemy.name}`)
                                return
                            }

                            enemy.status.updateStatusList(enemy, turnNumber.value)
                            checkIfDead()
                            activeCharacter.value = enemy
                            console.log(`${enemy.name} attacks`)
                            activeCharacter.value.attack(playerStore.player)
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
                turnNumber.value++
                updateTurnStateMachine(ETurnState.PlayerAttack)
                break

            default:
                console.log('no state')
                break
        }
    }

    const checkIfDead = async () => {
        const playerStore = usePlayerStore()
        const feedStore = useFeedStore()

        console.log('checking who is dead...')
        if (!turnOrder.value) {
            console.error('no turn order')
            return
        }
        turnOrder.value.forEach((enemy) => {
            if (enemy.currentStats.hp <= 0) {
                feedStore.setBattleFeedItem(`${enemy.name} is dead`)
                console.log(`${enemy.name} is dead`)
                enemy.isAlive = false
                playAudio(['24_orc_death_spin.wav'])
                removeDeadFromOrder(enemy)
                return
            }
        })
        if (playerStore.player && playerStore.player.currentStats.hp <= 0) {
            console.log('Player dead')
            feedStore.setBattleFeedItem(`${playerStore.player.name} is dead`)
            await playAudio(['14_human_death_spin.wav'])
            playerStore.player.isAlive = false
            gameStateStore.updateGameState(EGameState.PlayerDead)
            return
        }
    }

    const resetTurn = () => {
        updateTurnStateMachine(ETurnState.Disabled)
    }

    const removeDeadFromOrder = (dead: MonsterModel | IPlayer) => {
        if (!turnOrder.value) {
            console.error('No turn order')
            return
        }
        console.log('dead')

        const deadPerson = turnOrder.value.find((character) => character === dead)
        const deadPersonIndex = turnOrder.value.findIndex((character) => character === deadPerson)
        const updatedTurnOrder = turnOrder.value.splice(deadPersonIndex, 1)
        return updatedTurnOrder
    }
    const setMonsterList = (monsterListPayload: MonsterModel[]) => {
        monsterList.value = monsterListPayload
    }
    return {
        activeCharacter,
        activeTurnState,
        turnNumber,
        turnOrder,
        monsterList,
        updateTurnStateMachine,
        resetTurn,
        checkIfDead,
        setMonsterList,
    }
})

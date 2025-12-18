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
    const turnOrder = ref<Array<IPlayer | MonsterModel>>([])
    const activeCharacter = ref<IPlayer | MonsterModel | undefined>(undefined)
    const activeTurnState = ref<ETurnState>(ETurnState.Init)
    const monsterList = ref<Array<IPlayer | MonsterModel>>([])

    const sortTurnOrder = (entityList: Array<IPlayer | MonsterModel>) => {
        const sorted = [...entityList].sort((a, b) => b.currentStats.initiative - a.currentStats.initiative)
        turnOrder.value = sorted
        return sorted
    }

    const updateTurnStateMachine = (newTurnState: ETurnState) => {
        const playerStore = usePlayerStore()
        const globalStore = useGlobalStore()
        const sceneManager = useSceneManagerStore()
        const feedStore = useFeedStore()
        activeTurnState.value = newTurnState

        switch (activeTurnState.value) {
            case ETurnState.Disabled: {
                turnNumber.value = 0
                turnOrder.value = []
                monsterList.value = []
                feedStore.resetBattleFeed()

                activeCharacter.value = undefined
                console.log('turn state: ', activeTurnState.value)
                break
            }
            case ETurnState.Init: {
                console.log('TURN STATE:', ETurnState.Init)
                console.log(playerStore.player, monsterList.value)
                if (!playerStore.player || !monsterList.value?.length) {
                    console.log(playerStore.player, monsterList.value)
                    console.log('no player or monster list')
                    return
                }
                if (monsterList.value.length && !monsterList.value.find((item) => item !== playerStore.player)) {
                    monsterList.value.push(playerStore.player)
                }
                if (!playerStore.player.isAlive) {
                    return
                }
                turnNumber.value = 1
                updateTurnStateMachine(ETurnState.SortOrder)
                break
            }
            case ETurnState.SortOrder:
                console.log('TURN STATE:', ETurnState.SortOrder)
                turnOrder.value = []
                console.log(monsterList.value)
                if (!monsterList.value.length) {
                    console.error('no monster list')
                    return
                }

                sortTurnOrder(monsterList.value)
                updateTurnStateMachine(ETurnState.PlayerAttack)
                break
            case ETurnState.PlayerAttack: {
                console.log('<====>')
                console.log('TURN STATE:', ETurnState.PlayerAttack)
                if (!playerStore.player) {
                    return
                }
                if (!turnOrder.value.length) {
                    console.log('turn Order empty')
                    return
                }
                activeCharacter.value = playerStore.player
                playerStore.player.status.updateStatusList(playerStore.player, turnNumber.value)
                checkIfDead()

                break
            }
            case ETurnState.EnemyAttack: {
                console.log('TURN STATE:', ETurnState.EnemyAttack)

                const aliveEnemies = turnOrder.value.filter((enemy) => enemy.isAlive)

                if (aliveEnemies.length === 0) {
                    console.log('No enemies left')
                    gameStateStore.updateGameState(EGameState.Loot)
                    break
                }

                globalStore.isAttacking = true

                // Inline async function to handle enemy attack logic
                const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

                const attackEnemies = async () => {
                    for (const enemy of aliveEnemies) {
                        if (!playerStore.player?.isAlive) {
                            console.log('Player is dead, stopping attacks')
                            break
                        }

                        await wait(1000)

                        enemy.status.updateStatusList(enemy, turnNumber.value)
                        checkIfDead()

                        if (!enemy.isAlive) {
                            console.log(`${enemy.name} died from status effects. Stopping further enemy actions.`)
                            break
                        }

                        activeCharacter.value = enemy
                        console.log(`${enemy.name} attacks`)
                        activeCharacter.value.attack(playerStore.player)

                        checkIfDead()

                        if (!playerStore.player?.isAlive) {
                            console.log('Player died after attack')
                            break
                        }
                    }
                    if (aliveEnemies.length === 0) {
                        console.log('No enemies left')
                        gameStateStore.updateGameState(EGameState.Loot)
                    }
                    globalStore.isAttacking = false

                    updateTurnStateMachine(ETurnState.EndTurn)
                }

                // Fire the async logic, no await here
                attackEnemies()

                break
            }

            case ETurnState.CalculateDamage: {
                console.log('TURN STATE:', ETurnState.CalculateDamage)
                break
            }
            case ETurnState.EndTurn: {
                console.log('TURN STATE:', ETurnState.EndTurn)
                turnNumber.value++
                updateTurnStateMachine(ETurnState.PlayerAttack)
                break
            }
            default: {
                console.log('no state')
                break
            }
        }
    }

    const checkIfDead = async () => {
        const playerStore = usePlayerStore()
        const feedStore = useFeedStore()

        console.log('checking who is dead...')
        // if (!turnOrder.value.length) {
        //     console.error('no turn order')
        //     return
        // }
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

    const removeDeadFromOrder = (dead: MonsterModel | IPlayer): void => {
        if (!turnOrder.value.length) {
            console.error('No turn order')
            return
        }
        console.log('dead')
        console.log(monsterList.value)

        turnOrder.value = turnOrder.value.filter((character) => character !== dead)
        console.log(turnOrder.value)
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

import { ETurnState } from '@/enums/ETurnState'
import { useGameStateManager } from '@/composables/useGameStateManager'
import { EGameState } from '@/enums/EGameState'
import { sceneManager } from './SceneManager'
import { playerManager } from './playerManager'

const { updateGameState } = useGameStateManager()

const { player } = playerManager

interface ITurn {
    turn: number
    turnOrder: string[]
    activeTurnState: ETurnState
    activeCharacterId: string
}

class TurnModel implements ITurn {
    constructor(
        public turn: number = 0,
        public turnOrder: string[] = [],
        public activeTurnState: ETurnState = ETurnState.Init,
        public activeCharacterId: string = ''
    ) {}

    sortTurnOrder = () => {
        if (!sceneManager.scene) {
            return new Error('No scene')
        }
        const sorted = sceneManager.scene.enemyList.sort(
            (a, b) => b.currentStats.initiative - a.currentStats.initiative
        )
        this.turnOrder = sorted.map((entitiy) => entitiy.id)
        return sorted
    }

    updateTurnStateMachine = (newTurnState: ETurnState) => {
        if (!player.isAlive) {
            return
        }
        this.activeTurnState = newTurnState
        switch (this.activeTurnState) {
            case ETurnState.Init: {
                console.log('TURN STATE:', ETurnState.Init)
                this.turn = 1
                this.updateTurnStateMachine(ETurnState.SortOrder)
                break
            }
            case ETurnState.SortOrder:
                console.log('TURN STATE:', ETurnState.SortOrder)
                this.sortTurnOrder()
                this.updateTurnStateMachine(ETurnState.PlayerAttack)
                break
            case ETurnState.PlayerAttack:
                console.log('<====>')

                player.status.updateStatusList(player.id, this.turn)
                console.log(player)

                console.log('TURN STATE:', ETurnState.PlayerAttack)
                this.activeCharacterId = player.id
                break
            case ETurnState.EnemyAttack: {
                console.log('TURN STATE:', ETurnState.EnemyAttack)
                const enemyAttack = () => {
                    this.turnOrder.forEach((enemyId) => {
                        if (player.isAlive === false) {
                            console.log(player.isAlive)
                            return
                        }

                        const enemy = sceneManager.scene?.enemyList.find((entity) => entity.id === enemyId)
                        if (!enemy) {
                            return
                        }
                        enemy.status.updateStatusList(enemy.id, this.turn)
                        this.activeCharacterId = enemy.id
                        console.log(`${enemy.name} attacks`)
                        console.log(player.id)

                        enemy.attack(player.id)
                        this.checkIfDead()
                    })
                    this.updateTurnStateMachine(ETurnState.EndTurn)
                }
                enemyAttack()
                break
            }
            case ETurnState.CalculateDamage:
                console.log('TURN STATE:', ETurnState.CalculateDamage)

                break
            case ETurnState.EndTurn:
                console.log('TURN STATE:', ETurnState.EndTurn)
                this.turn++
                this.updateTurnStateMachine(ETurnState.PlayerAttack)
                break

            default:
                console.log('no this')
                break
        }
    }

    checkIfDead = () => {
        console.log('checking who is dead...')
        this.turnOrder.forEach((enemyId) => {
            const enemy = sceneManager.scene?.entityList.find((entity) => entity.id === enemyId)
            if (!enemy) {
                return
            }
            console.log(enemy)

            if (enemy.currentStats.hp <= 0) {
                console.log(`${enemy.name} is dead`)
                this.removeDeadFromOrder(enemy.id)
                return
            }
        })
        if (player && player.currentStats.hp <= 0) {
            console.log('Player dead')
            player.isAlive = false
            updateGameState(EGameState.PlayerDead)
            return
        }
    }

    removeDeadFromOrder = (id: string) => {
        const deadPerson = this.turnOrder.find((entityId) => entityId === id)
        const deadPersonIndex = this.turnOrder.findIndex((character) => character === deadPerson)
        const updatedTurnOrder = this.turnOrder.splice(deadPersonIndex, 1)
        return updatedTurnOrder
    }
}

const turnModel = new TurnModel()
export { turnModel, TurnModel }

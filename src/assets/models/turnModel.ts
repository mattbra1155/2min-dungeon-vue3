// import { ETurnState } from '@/enums/ETurnState'
// import { MonsterModel } from './monsterModel'
// import { PlayerModel } from './playerModel'
// import { useGameStateManager } from '@/composables/useGameStateManager'
// import { usePlayer } from '@/composables/usePlayer'
// import { EGameState } from '@/enums/EGameState'
// import { useSceneManager } from '@/composables/useSceneManager'

// const { updateGameState } = useGameStateManager()
// const { activeScene } = useSceneManager()
// interface ITurn {
//     turn: number
//     turnOrder: Array<MonsterModel | PlayerModel>
//     activeTurnState: ETurnState
//     activeCharacter: PlayerModel | MonsterModel | undefined
// }

// class TurnModel implements ITurn {
//     constructor(
//         public turn: number = 0,
//         public turnOrder: Array<MonsterModel | PlayerModel> = [],
//         public activeTurnState: ETurnState = ETurnState.Init,
//         public activeCharacter: PlayerModel | MonsterModel | undefined = undefined
//     ) {}

//     sortTurnOrder = () => {
//         if (!activeScene.value) {
//             return new Error('No scene')
//         }
//         const sorted = activeScene.value.entityList.sort(
//             (a, b) => b.currentStats.initiative - a.currentStats.initiative
//         )
//         this.turnOrder = sorted
//         return sorted
//     }

//     updateTurnStateMachine = (newTurnState: ETurnState) => {
//         const { player } = usePlayer()

//         if (!player.value.isAlive) {
//             return
//         }
//         this.activeTurnState = newTurnState
//         switch (this.activeTurnState) {
//             case ETurnState.Init: {
//                 console.log('TURN STATE:', ETurnState.Init)
//                 this.turn = 1
//                 this.updateTurnStateMachine(ETurnState.SortOrder)
//                 break
//             }
//             case ETurnState.SortOrder:
//                 console.log('TURN STATE:', ETurnState.SortOrder)
//                 this.sortTurnOrder()
//                 this.updateTurnStateMachine(ETurnState.PlayerAttack)
//                 break
//             case ETurnState.PlayerAttack:
//                 console.log('<====>')

//                 player.value.status.updateStatusList(player.value, this.turn)
//                 console.log(player.value)

//                 console.log('TURN STATE:', ETurnState.PlayerAttack)
//                 this.activeCharacter = player.value
//                 break
//             case ETurnState.EnemyAttack: {
//                 console.log('TURN STATE:', ETurnState.EnemyAttack)
//                 const enemyAttack = () => {
//                     this.turnOrder.forEach((enemy) => {
//                         console.log('here', this.turnOrder)

//                         if (player.value.isAlive === false) {
//                             console.log(player.value.isAlive)
//                             return
//                         }
//                         console.log('here')

//                         console.log(enemy.name)

//                         enemy.status.updateStatusList(enemy, this.turn)
//                         this.activeCharacter = enemy
//                         console.log(`${enemy.name} attacks`)
//                         this.activeCharacter.attack(player.value)
//                         this.checkIfDead()
//                     })
//                     this.updateTurnStateMachine(ETurnState.EndTurn)
//                 }
//                 enemyAttack()
//                 break
//             }
//             case ETurnState.CalculateDamage:
//                 console.log('TURN STATE:', ETurnState.CalculateDamage)

//                 break
//             case ETurnState.EndTurn:
//                 console.log('TURN STATE:', ETurnState.EndTurn)
//                 this.turn++
//                 this.updateTurnStateMachine(ETurnState.PlayerAttack)
//                 break

//             default:
//                 console.log('no this')
//                 break
//         }
//     }

//     checkIfDead = () => {
//         const { player } = usePlayer()
//         console.log('checking who is dead...')
//         this.turnOrder.forEach((enemy) => {
//             console.log(enemy)
//             if (enemy.currentStats.hp <= 0) {
//                 console.log(`${enemy.name} is dead`)
//                 this.removeDeadFromOrder(enemy)
//             }
//         })
//         if (player.value && player.value.currentStats.hp <= 0) {
//             console.log('Player dead')
//             player.value.isAlive = false
//             updateGameState(EGameState.PlayerDead)
//             return
//         }
//     }

//     removeDeadFromOrder = (dead: MonsterModel | PlayerModel) => {
//         const deadPerson = this.turnOrder.find((character) => character === dead)
//         const deadPersonIndex = this.turnOrder.findIndex((character) => character === deadPerson)
//         const updatedTurnOrder = this.turnOrder.splice(deadPersonIndex, 1)
//         return updatedTurnOrder
//     }
// }

// export { TurnModel }

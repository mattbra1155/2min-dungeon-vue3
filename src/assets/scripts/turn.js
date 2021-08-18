import { sceneEngine, global, attackButton } from './index.js'

class Turn {
    constructor(name) {
        this.name = name
        this.turns = []
    }

    checkRoom(monster) {
        if ((monster.isAlive === true)) {
            global.combat = true
        }
    }

    turnNumberOne() {
        this.turnNumber++
        const turn = document.querySelector('#turnNumber')
        turn.textContent = this.turnNumber
    }

    initiativeRoll() {
      /*   const monsterResult = global.diceRoll(1, 100)
        const playerResult = global.diceRoll(1, 100) */
        
    }

    playerTurn() {
        const level = sceneEngine.currentScene

        console.log(level.player)
        level.player.attack(level.monster)
        attackButton.disabled = true
        level.player.isActive = false
        global.updatePersonHealth()
        global.checkIfAlive(level.monster)
        console.log(`end of Player turn`)
    }

    enemyTurn() {
        const level = sceneEngine.currentScene

        console.log(level.monster)
        console.log(`changed to monster turn`)
        level.monster.attack(level.player)
        level.monster.isActive = false
        global.updatePersonHealth()
        attackButton.disabled = false
        global.checkIfAlive(level.player)
        level.player.isActive = true
        console.log(`end of Monster turn`)
        console.log(`changed to Player turn`)
    }
}

const turn = new Turn('turn')

export { turn }

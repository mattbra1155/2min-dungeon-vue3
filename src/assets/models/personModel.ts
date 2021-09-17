// import { sceneEngine, global, turn } from '../scripts/index.js'
import { diceRollK100, diceRollK6 } from '@/assets/scripts/diceRoll'
import { bodyPartsModel } from '@/assets/models/bodyPartsModel'
import { stats } from '@/assets/models/statsModel'

import { iPerson } from '@/interfaces/Person'
import { iArmor, iPotion, iUtility, iWeapon } from '@/interfaces/Item'
import { iBodyParts } from '@/interfaces/BodyParts'
import { iMonster } from '@/interfaces/Monster'
import { iPlayer } from '@/interfaces/Player'

const { head, leftArm, rightArm, torso, leftLeg, rightLeg } = bodyPartsModel
const {
    hp,
    melee,
    ranged,
    dexterity,
    strength,
    thoughtness,
    speed,
    initiative,
    attacks,
    inteligence,
    willPower,
    charisma,
} = stats

class PersonModel implements iPerson {
    constructor(
        public name: string = '',
        public race: string = '',
        public stats: {
            hp: number
            melee: number
            ranged: number
            dexterity: number
            strength: number
            thoughtness: number
            speed: number
            initiative: number
            attacks: number
            inteligence: number
            willPower: number
            charisma: number
        } = {
            hp,
            melee,
            ranged,
            dexterity,
            strength,
            thoughtness,
            speed,
            initiative,
            attacks,
            inteligence,
            willPower,
            charisma,
        },
        public bodyParts: iBodyParts = {
            head,
            leftArm,
            rightArm,
            torso,
            leftLeg,
            rightLeg,
        },
        public weapon: iWeapon | null = null,
        public description: string = '',
        public inventory: Array<iWeapon | iArmor | iPotion | iUtility> = [],
        public isAlive: boolean = true
    ) {}

    attack(enemy: iMonster | iPlayer) {
        // dice roll
        const diceRollHitResult = diceRollK100()
        console.log(`Dice roll: ${diceRollHitResult}`)
        // check if attack hits
        if (this.stats.melee > diceRollHitResult) {
            const diceRollBodyPartResult = diceRollK100()

            console.log(`Body part hit result: ${diceRollBodyPartResult}`)

            const getBodyPart = () => {
                if (diceRollBodyPartResult >= 1 && diceRollBodyPartResult <= 15) {
                    console.log(`${this.name} hit ${enemy.name} in the Head`)
                    return enemy.bodyParts['head']
                } else if (diceRollBodyPartResult >= 16 && diceRollBodyPartResult <= 35) {
                    console.log(`${this.name} hit ${enemy.name} in the Right arm`)
                    return enemy.bodyParts.rightArm
                } else if (diceRollBodyPartResult >= 36 && diceRollBodyPartResult <= 55) {
                    console.log(`${this.name} hit ${enemy.name} in the Left arm`)
                    return enemy.bodyParts.leftArm
                } else if (diceRollBodyPartResult >= 56 && diceRollBodyPartResult <= 80) {
                    console.log(`${this.name} hit ${enemy.name} in the Torso`)
                    return enemy.bodyParts['torso']
                } else if (diceRollBodyPartResult >= 81 && diceRollBodyPartResult <= 90) {
                    console.log(`${this.name} hit ${enemy.name} in the Right leg`)
                    return enemy.bodyParts.rightLeg
                } else if (diceRollBodyPartResult >= 91 && diceRollBodyPartResult <= 100) {
                    console.log(`${this.name} hit ${enemy.name} in the Left leg`)
                    return enemy.bodyParts.leftLeg
                }
            }

            const savedBodyPart = getBodyPart()

            const enemyArmorPoints = savedBodyPart?.armor.armorPoints
            // const enemyArmorName = savedBodyPart.name
            const damageDiceRoll = diceRollK6()
            console.log(damageDiceRoll)

            // Calculate damage
            const damage = () => {
                let damagePoints =
                    this.stats.strength -
                    enemy.stats.thoughtness -
                    (enemyArmorPoints ? enemyArmorPoints : 0) +
                    ((this.weapon === null ? 0 : this.weapon.damage) + damageDiceRoll)
                if (damagePoints < 0) {
                    damagePoints = 0
                }
                console.log(damagePoints)
                return damagePoints
            }
            /*  turn.turns.unshift({
                person: this,
                action: `${this.name} rolls: ${diceRollHitResult} and hit's ${
                    enemy.name
                } in ${enemyArmorName} for ${damage()} damage with ${
                    this.weapon.name
                }`
            }) */

            // reduce health
            // if (this.player === true) {
            //     store.dispatch(`enemy/takeDamage`, damage())
            // } else {
            //     store.dispatch(`player/takeDamage`, damage())
            // }
            // update health
        } else {
            // add action to the turn array
            /* turn.turns.unshift({
                person: this,
                action: `${this.name} rolls: ${diceRollHitResult} and misses.`
            }) */
        }
    }
}
export { PersonModel }

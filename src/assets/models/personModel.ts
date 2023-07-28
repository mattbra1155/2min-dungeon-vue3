import { diceRollK100, diceRollK6 } from '@/assets/scripts/diceRoll'
import { bodyPartsModel } from '@/assets/models/bodyPartsModel'
import { IPerson } from '@/interfaces/Person'
import { iBodyPart } from '@/interfaces/BodyParts'
import { IMonster } from '@/interfaces/IMonster'
import { Inventory } from '@/assets/models/inventoryModel'
import { PlayerModel } from '@/assets/models//playerModel'
import { Weapon } from '@/assets/models//itemsModel'
import { Modifiers } from '@/assets/models/modifiersModel'
import { IStats } from '@/interfaces/IStats'
import localforage from 'localforage'
class PersonModel implements IPerson {
    constructor(
        public id: string = self.crypto.randomUUID(),
        public name: string = '',
        public race: string = '',
        public stats: IStats = {
            hp: 0,
            melee: 0,
            ranged: 0,
            dexterity: 0,
            strength: 0,
            thoughtness: 0,
            speed: 0,
            initiative: 0,
            attacks: 0,
            inteligence: 0,
            willPower: 0,
            charisma: 0,
        },
        public currentStats: IStats = stats,
        public bodyParts: iBodyPart = bodyPartsModel,
        public weapon: Weapon | null = null,
        public description: string = '',
        public inventory: Inventory,
        public isAlive: boolean = true,
        public modifiers: Modifiers
    ) {}

    async clearCurrentStats() {
        this.currentStats = JSON.parse(JSON.stringify(this.stats))
    }

    attack(enemy: IMonster | PlayerModel) {
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

            // Calculate damage
            const damage = () => {
                const damageDiceRoll = diceRollK6()
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
            // playerTakeDamage(damage())
            const finalDamage = damage()

            if (finalDamage) {
                console.log(`${enemy.name} took ${finalDamage} damage`)
                enemy.stats.hp -= finalDamage
                return finalDamage | 0
            }
        }
        // } else {
        //     // add action to the turn array
        //     /* turn.turns.unshift({
        //         person: this,
        //         action: `${this.name} rolls: ${diceRollHitResult} and misses.`
        //     }) */
        // }
    }
}
export { PersonModel }

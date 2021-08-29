// import { sceneEngine, global, turn } from '../scripts/index.js'
import { diceRollK100, diceRollK6 } from '@/assets/scripts/diceRoll'
import { Person } from '@/interfaces/Person'
import { Weapon } from '@/interfaces/Item'
import { BodyParts } from '@/interfaces/BodyParts'
import { Monster } from '@/interfaces/Monster'
import { Player } from '@/interfaces/Player'
class PersonModel implements Person {
    name: string
    race: string
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
    weapon: Weapon
    description: string
    inventory: Array<Weapon>
    bodyParts: BodyParts
    isAlive: Boolean
    constructor(
        name: string,
        race: string,
        hp: number,
        melee: number,
        ranged: number,
        dexterity: number,
        strength: number,
        thoughtness: number,
        speed: number,
        initiative: number,
        attacks: number,
        inteligence: number,
        willPower: number,
        charisma: number,
        weapon: Weapon,
        description: string,
        inventory: Array<Weapon>,
        bodyParts: BodyParts,
        isAlive: Boolean
    ) {
        this.name = name
        this.race = race
        this.hp = hp
        this.melee = melee
        this.ranged = ranged
        this.dexterity = dexterity
        this.strength = strength
        this.thoughtness = thoughtness
        this.speed = speed
        this.initiative = initiative
        this.attacks = attacks
        this.inteligence = inteligence
        this.willPower = willPower
        this.charisma = charisma
        this.weapon = weapon
        this.inventory = inventory
        this.bodyParts = {
            head: {
                name: 'Head',
                armor: {
                    armorPoints: 0,
                    item: null,
                },
            },
            'right arm': {
                name: 'Right arm',
                armor: {
                    armorPoints: 0,
                    item: null,
                },
            },
            'left arm': {
                name: 'Left arm',
                armor: {
                    armorPoints: 0,
                    item: null,
                },
            },
            torso: {
                name: 'Torso',
                armor: {
                    armorPoints: 0,
                    item: null,
                },
            },
            'right leg': {
                name: 'Right leg',
                armor: {
                    armorPoints: 0,
                    item: null,
                },
            },
            'left leg': {
                name: 'Left leg',
                armor: {
                    armorPoints: 0,
                    item: null,
                },
            },
        }
        this.description = description
        this.isAlive = true
    }

    attack(enemy: Monster | Player) {
        // dice roll
        const diceRollHitResult = diceRollK100()
        console.log(`Dice roll: ${diceRollHitResult}`)
        // check if attack hits
        if (this.melee > diceRollHitResult) {
            const diceRollBodyPartResult = diceRollK100()

            console.log(`Body part hit result: ${diceRollBodyPartResult}`)

            const getBodyPart = () => {
                if (
                    diceRollBodyPartResult >= 1 &&
                    diceRollBodyPartResult <= 15
                ) {
                    console.log(`${this.name} hit ${enemy.name} in the Head`)
                    return enemy.bodyParts['head']
                } else if (
                    diceRollBodyPartResult >= 16 &&
                    diceRollBodyPartResult <= 35
                ) {
                    console.log(
                        `${this.name} hit ${enemy.name} in the Right arm`
                    )
                    return enemy.bodyParts['right arm']
                } else if (
                    diceRollBodyPartResult >= 36 &&
                    diceRollBodyPartResult <= 55
                ) {
                    console.log(
                        `${this.name} hit ${enemy.name} in the Left arm`
                    )
                    return enemy.bodyParts['left arm']
                } else if (
                    diceRollBodyPartResult >= 56 &&
                    diceRollBodyPartResult <= 80
                ) {
                    console.log(`${this.name} hit ${enemy.name} in the Torso`)
                    return enemy.bodyParts['torso']
                } else if (
                    diceRollBodyPartResult >= 81 &&
                    diceRollBodyPartResult <= 90
                ) {
                    console.log(
                        `${this.name} hit ${enemy.name} in the Right leg`
                    )
                    return enemy.bodyParts['right leg']
                } else if (
                    diceRollBodyPartResult >= 91 &&
                    diceRollBodyPartResult <= 100
                ) {
                    console.log(
                        `${this.name} hit ${enemy.name} in the Left leg`
                    )
                    return enemy.bodyParts['left leg']
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
                    this.strength -
                    enemy.thoughtness -
                    (enemyArmorPoints ? enemyArmorPoints : 0) +
                    ((this.weapon === null ? 0 : this.weapon.damage) +
                        damageDiceRoll)
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

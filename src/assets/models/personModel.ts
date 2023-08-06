import { diceRollK100, diceRollK6 } from '@/assets/scripts/diceRoll'
import { bodyPartsModel } from '@/assets/models/bodyPartsModel'
import { IPerson } from '@/interfaces/Person'
import { iBodyPart } from '@/interfaces/BodyParts'
import { Inventory } from '@/assets/models/inventoryModel'
import { PlayerModel } from '@/assets/models//playerModel'
import { Weapon } from '@/assets/models//itemsModel'
import { Modifiers } from '@/assets/models/modifiersModel'
import { IStats } from '@/interfaces/IStats'
import { EModifierTypes } from '@/enums/EModifierTypes'
import { EStats } from '@/enums/EStats'
import { MonsterModel } from '@/assets/models/monsterModel'
class PersonModel implements IPerson {
    constructor(
        public id: string = self.crypto.randomUUID(),
        public name: string = '',
        public race: string = '',
        public stats: IStats = {
            hp: {
                name: 'hp',
                symbol: 'hp',
                value: 0,
            },
            melee: {
                name: 'melee',
                symbol: 'mle',
                value: 0,
            },
            ranged: {
                name: 'ranged',
                symbol: 'rd',
                value: 0,
            },
            dexterity: {
                name: 'dexterity',
                symbol: 'dx',
                value: 0,
            },
            strength: {
                name: 'strength',
                symbol: 's',
                value: 0,
            },
            thoughtness: {
                name: 'thoughtness',
                symbol: 't',
                value: 0,
            },
            speed: {
                name: 'speed',
                symbol: 'spd',
                value: 0,
            },
            initiative: {
                name: 'initiative',
                symbol: 'i',
                value: 0,
            },
            attacks: {
                name: 'attacks',
                symbol: 'a',
                value: 0,
            },
            inteligence: {
                name: 'inteligence',
                symbol: 'int',
                value: 0,
            },
            willPower: {
                name: 'will powier',
                symbol: 'wp',
                value: 0,
            },
            charisma: {
                name: 'charisma',
                symbol: 'ch',
                value: 0,
            },
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

    attack(enemy: MonsterModel | PlayerModel) {
        // dice roll
        const diceRollHitResult = diceRollK100()
        console.log(`Dice roll: ${diceRollHitResult}`)

        // set temp character stats for attack
        const attackStats = JSON.parse(JSON.stringify(this.currentStats))

        const addModifiers = () => {
            this.modifiers.list.forEach((modifier) => {
                if (modifier.type !== EModifierTypes.Attack) {
                    return
                }
                if (modifier.modifiers !== EStats) {
                    return
                }
                const mods = Object.entries(modifier.modifiers)
                mods.forEach((modItem) => {
                    const statName = Object.values(EStats).find((stat) => stat === modItem[0])
                    if (!statName) {
                        throw new Error('No statName')
                    }
                    if (modItem[0] === statName) {
                        attackStats[statName] += modItem[1]
                    }
                })
            })
        }

        addModifiers()

        // check if attack hits
        if (attackStats.melee < diceRollHitResult) {
            console.log(`${this.name} missed`)
            return
        }

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

        // Calculate damage
        const damage = () => {
            const damageDiceRoll = diceRollK6()
            let damagePoints = 0

            const weaponDamage = () => {
                if (!this.weapon) {
                    return 0
                }

                let baseDamage = 0
                let prefixDamage = 0
                let modifierDamage = 0

                const getModifierDamage = () => {
                    let sum = 0
                    this.modifiers.list.forEach((modifier) => {
                        if (typeof modifier.modifiers !== 'number') {
                            return 0
                        }

                        sum += modifier.modifiers
                        console.log(this.weapon, modifier.modifiers, sum)
                    })
                    return sum
                }

                baseDamage = this.weapon.damage
                prefixDamage = this.weapon.prefix.modifier
                modifierDamage = getModifierDamage()

                const damage = baseDamage + prefixDamage + modifierDamage

                return damage
            }

            damagePoints += attackStats.strength
            damagePoints += enemyArmorPoints ? enemyArmorPoints : 0
            damagePoints += weaponDamage()
            damagePoints += damageDiceRoll
            damagePoints -= enemy.stats.thoughtness.value

            if (damagePoints < 0) {
                damagePoints = 0
            }
            console.log('damage', damagePoints)
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

        const finalDamage = damage()

        if (finalDamage) {
            console.log(`${enemy.name} took ${finalDamage} damage`)
            enemy.stats.hp.value -= finalDamage
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
export { PersonModel }

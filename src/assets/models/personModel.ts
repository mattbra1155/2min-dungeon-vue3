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
import { MonsterModel } from '@/assets/models/monsterModel'
import { stats as statsModel } from '@/assets/models/statsModel'
import { Status } from './statusModel'
import { StatusAttackBonusDamage, StatusDamageOverTime } from './statusItemModel'
import { toRaw } from 'vue'
import { EStats } from '@/enums/EStats'

class PersonModel implements IPerson {
    constructor(
        public id: string = self.crypto.randomUUID(),
        public name: string = '',
        public race: string = '',
        public stats: IStats = structuredClone(statsModel),
        public currentStats: IStats = structuredClone(statsModel),
        public bodyParts: iBodyPart = bodyPartsModel,
        public weapon: Weapon | null = null,
        public description: string = '',
        public inventory: Inventory,
        public isAlive: boolean = true,
        public modifiers: Modifiers = new Modifiers(),
        public status: Status = new Status()
    ) {}

    async clearCurrentStats() {
        const baseStats = structuredClone(toRaw(this.stats))

        this.currentStats = baseStats

        // Add already advanced stats from professions to current stats
        if (this instanceof PlayerModel) {
            const advancedStats = structuredClone(toRaw(this.advancedStats))

            Object.entries(advancedStats).forEach((statItem) => {
                const foundStat = Object.entries(this.currentStats).find((stat) => stat[0] === statItem[0])
                if (!foundStat) {
                    return
                }
                const statName = Object.values(EStats).find((stat) => stat === foundStat[0])

                if (!statName) {
                    return
                }
                foundStat[1] += statItem[1]
                this.currentStats[statName] = foundStat[1]

                return foundStat
            })
        }
    }

    attack(enemy: MonsterModel | PlayerModel) {
        // dice roll
        const diceRollHitResult = diceRollK100()
        console.log(`Dice roll: ${diceRollHitResult}`)

        // set temp character stats for attack
        const attackStats: IStats = JSON.parse(JSON.stringify(this.currentStats))

        const addBonusStatModifiers = () => {
            this.inventory.inventory.forEach((item) => {
                item.modifiers.forEach((itemModifier) => {
                    if (itemModifier.type !== EModifierTypes.AttackBonusStats) {
                        return
                    }
                    itemModifier.use(this)
                })
            })
        }

        addBonusStatModifiers()

        // check if attack hits
        if (diceRollHitResult > attackStats.melee) {
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

            const weaponDamage = (): number => {
                if (!this.weapon) {
                    return 0
                }

                let baseDamage = 0
                // let modifierDamage = 0

                // const getModifierDamage = (): number => {
                //     let sum = 0
                //     this.modifiers.list.forEach((modifier) => {
                //         if (typeof modifier.modifiers !== 'number') {
                //             return 0
                //         }

                //         sum += modifier.modifiers
                //         console.log(this.weapon, modifier.modifiers, sum)
                //     })
                //     return sum
                // }

                baseDamage = this.weapon.damage
                // modifierDamage = getModifierDamage()

                // const damage = baseDamage + modifierDamage
                const damage = baseDamage
                return damage
            }

            const addBonusDamageModifiers = () => {
                this.inventory.inventory.forEach((item) => {
                    item.modifiers.forEach((itemModifier) => {
                        if (itemModifier.type !== EModifierTypes.AttackBonusDamage) {
                            return
                        }
                        itemModifier.use(this)
                    })
                })
            }

            addBonusDamageModifiers()

            const modifierDamage = () => {
                let damageSum = 0
                this.status.list.forEach((statusItem) => {
                    if (statusItem.type !== EModifierTypes.AttackBonusDamage) {
                        return 0
                    }

                    const StatusAttackBonusDamage = statusItem as StatusAttackBonusDamage

                    damageSum = StatusAttackBonusDamage.use()
                })
                return damageSum
            }

            damagePoints += attackStats.strength
            damagePoints += enemyArmorPoints ? enemyArmorPoints : 0
            damagePoints += weaponDamage()
            damagePoints += damageDiceRoll
            damagePoints += modifierDamage()
            damagePoints -= enemy.currentStats.thoughtness

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

        const applyAttackStatusEffects = () => {
            this.inventory.inventory.forEach((item) => {
                if (!item.isEquipped) {
                    return
                }
                item.modifiers.forEach((modifier) => {
                    if (modifier.type === EModifierTypes.DamageApplyEffect) {
                        console.log('hrrrrrer', modifier)

                        modifier.use(enemy)
                        return
                    }
                })
            })
        }

        applyAttackStatusEffects()

        console.log(`${enemy.name} took ${finalDamage} damage`)
        enemy.currentStats.hp -= finalDamage
        return finalDamage | 0
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

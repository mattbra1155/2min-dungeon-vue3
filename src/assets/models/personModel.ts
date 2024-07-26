import { diceRollK100, diceRollK6 } from '@/assets/scripts/diceRoll'
import { bodyPartsModel } from '@/assets/models/bodyPartsModel'
import { IPerson } from '@/interfaces/Person'
import { iBodyPart } from '@/interfaces/BodyParts'
import { Inventory } from '@/assets/models/inventoryModel'
import { PlayerModel } from '@/assets/models//playerModel'
import { Armor, Weapon } from '@/assets/models//itemsModel'
import { Modifiers } from '@/assets/models/modifiersModel'
import { IStats } from '@/interfaces/IStats'
import { EModifierTypes } from '@/enums/EModifierTypes'
import { MonsterModel } from '@/assets/models/monsterModel'
import { stats as statsModel } from '@/assets/models/statsModel'
import { Status } from './statusModel'
import { StatusAttackBonusDamage } from './statusItemModel'
import { toRaw } from 'vue'
import { EStats } from '@/enums/EStats'
import { ISkill } from '@/interfaces/ISkill'
import { playAudio, playRandomAudio } from '@/helpers/playAudio'
import { useFeedStore } from '@/stores/useFeed'
import { EItemCategory } from '@/enums/ItemCategory'
abstract class PersonModel implements IPerson {
    constructor(
        public id: string = self.crypto.randomUUID(),
        public name: string = '',
        public race: string = '',
        public stats: IStats = structuredClone(statsModel),
        public currentStats: IStats = structuredClone(statsModel),
        public bodyParts: iBodyPart = bodyPartsModel,
        public weapon: Weapon | null = null,
        public offHand: Weapon | null = null,
        public description: string = '',
        public inventory: Inventory,
        public isAlive: boolean = true,
        public modifiers: Modifiers = new Modifiers(),
        public status: Status = new Status(),
        public skills: ISkill[] = [],
        public image: string | null = null
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
        const feedStore = useFeedStore()
        feedStore.setBattleFeedItem(`${this.name} attacks!`)
        // dice roll
        const diceRollHitResult = diceRollK100()
        feedStore.setBattleFeedItem(`Dice roll: ${diceRollHitResult}`)
        console.log(`Dice roll: ${diceRollHitResult}`)

        // set temp character stats for attack
        const attackStats: IStats = JSON.parse(JSON.stringify(this.currentStats))

        const addBonusStatModifiers = () => {
            this.inventory.inventory.forEach((item) => {
                if (item instanceof Weapon === false) {
                    return
                }
                item.modifiers.forEach((itemModifier) => {
                    if (itemModifier.type !== EModifierTypes.AttackBonusStats) {
                        return
                    }
                    itemModifier.use(this)
                })
            })
        }

        addBonusStatModifiers()
        // Add critical failure 98,99,100
        if (diceRollHitResult >= 98) {
            const criticalDamageRoll = diceRollK6()
            this.currentStats.hp -= criticalDamageRoll
            feedStore.setBattleFeedItem(`${this.name} hit himself for ${criticalDamageRoll} damage`)
            return
        }

        // check if attack hits
        if (diceRollHitResult > attackStats.melee) {
            feedStore.setBattleFeedItem(`${this.name} missed`)
            console.log(`${this.name} missed`)
            playRandomAudio(['27_sword_miss_1.wav', '27_sword_miss_2.wav', '27_sword_miss_3.wav'])
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

        const hitBodyPart = getBodyPart()
        if (!hitBodyPart) {
            console.error('hitBodyPart undefined')
            return
        }
        const enemyArmorPoints = hitBodyPart.armor.items.reduce((acc: number, currItem: Armor): number => {
            return (acc + currItem.armorPoints) | 0
        }, 0)

        // Calculate damage
        const damage = () => {
            const damageDiceRoll = diceRollK6()
            let damagePoints = 0

            const weaponDamage = (): number => {
                if (!this.weapon) {
                    return 0
                }
                return this.weapon.damage
            }

            const addBonusDamageModifiers = () => {
                this.inventory.inventory.forEach((item) => {
                    if (item instanceof Weapon === false) {
                        return
                    }
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

            const mightyBlowSkill = () => (this.skills.find((skill) => skill.id === 'mighty_blow') ? 1 : 0)

            damagePoints += attackStats.strength
            damagePoints += weaponDamage()
            damagePoints += damageDiceRoll
            damagePoints += modifierDamage()
            damagePoints += mightyBlowSkill()
            // double damage if critial success
            if (diceRollHitResult === 1) {
                damagePoints *= 2
            }
            damagePoints -= enemyArmorPoints ? enemyArmorPoints : 0
            damagePoints -= enemy.currentStats.thoughtness

            if (damagePoints < 0) {
                damagePoints = 0
            }

            feedStore.setBattleFeedItem(
                `${this.name} hit ${enemy.name} in the ${hitBodyPart?.name} for ${damagePoints} damage`
            )
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
                if (item instanceof Weapon === false) {
                    return
                }
                if (!item.isEquipped) {
                    return
                }
                item.modifiers.forEach((modifier) => {
                    if (modifier.type === EModifierTypes.DamageApplyEffect) {
                        modifier.use(enemy)
                        return
                    }
                })
            })
        }

        applyAttackStatusEffects()

        console.log(`${enemy.name} took ${finalDamage} damage`)
        enemy.currentStats.hp -= finalDamage

        playRandomAudio(['26_sword_hit_1.wav', '26_sword_hit_2.wav', '26_sword_hit_3.wav'])
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

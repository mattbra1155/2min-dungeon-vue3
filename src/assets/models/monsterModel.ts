import { PersonModel } from '@/assets/models/personModel'
import { iBodyParts } from '@/interfaces/BodyParts'
import { iArmor, iPotion, iUtility, iWeapon } from '@/interfaces/Item'

class Monster extends PersonModel implements Monster {
    constructor(
        public name: string,
        public race: string,
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
            charisma: number
            willPower: number
        },
        public weapon: iWeapon | null,
        public bodyParts: iBodyParts,
        public inventory: Array<iWeapon | iArmor | iPotion | iUtility>,
        public description: string,
        public isAlive: boolean
    ) {
        super(
            name,
            race,
            stats,
            bodyParts,
            weapon,
            description,
            inventory,
            isAlive
        )
        this.name = ''
        this.race = ''
        this.stats = {
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
            charisma: 0,
            willPower: 0,
        }
        this.bodyParts = {
            head: {
                name: 'Head',
                armor: {
                    armorPoints: 0,
                    item: null,
                },
            },
            rightArm: {
                name: 'Right arm',
                armor: {
                    armorPoints: 0,
                    item: null,
                },
            },
            leftArm: {
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
            rightLeg: {
                name: 'Right leg',
                armor: {
                    armorPoints: 0,
                    item: null,
                },
            },
            leftLeg: {
                name: 'Left leg',
                armor: {
                    armorPoints: 0,
                    item: null,
                },
            },
        }
        this.weapon = null
        this.inventory = []
        this.description = ''
        this.isAlive = true
    }
}

export { Monster }

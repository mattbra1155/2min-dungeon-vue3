import { PersonModel } from '@/assets/models/personModel'
import { iBodyParts } from '@/interfaces/BodyParts'
import { iArmor, iPotion, iUtility, iWeapon } from '@/interfaces/Item'
import { IMonster } from '@/interfaces/IMonster'
import { bodyPartsModel } from './bodyPartsModel'

const { head, leftArm, rightArm, torso, leftLeg, rightLeg } = bodyPartsModel

class MonsterModel extends PersonModel implements IMonster {
    constructor(
        public id: number = 0,
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
            charisma: number
            willPower: number
        } = {
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
        },
        public weapon: null | iWeapon = {
            name: '',
            category: '',
            damage: 0,
            type: '',
            modifier: 0,
            prefix: {
                name: '',
                modifier: 0,
            },
            description: '',
            id: 0,
        },
        public bodyParts: iBodyParts = {
            head,
            leftArm,
            rightArm,
            torso,
            leftLeg,
            rightLeg,
        },
        public inventory: Array<iWeapon | iArmor | iPotion | iUtility> = [],
        public description: string = '',
        public isAlive: boolean = true
    ) {
        super(name, race, stats, bodyParts, weapon, description, inventory, isAlive)
    }
}

export { MonsterModel }

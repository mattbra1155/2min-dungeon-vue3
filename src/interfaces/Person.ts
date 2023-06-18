import { iBodyParts } from '@/interfaces/BodyParts'
import { iArmor, iPotion, iUtility, iWeapon } from '@/interfaces/Item'
import { IMonster } from './IMonster'
import { IPlayer } from './IPlayer'

export interface iPerson {
    name: string
    race: string
    stats: {
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
    }
    weapon: iWeapon | null
    description: string
    inventory: Array<iWeapon | iArmor | iPotion | iUtility>
    bodyParts: iBodyParts
    isAlive: boolean
}

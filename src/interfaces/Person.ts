import { iBodyParts } from '@/interfaces/BodyParts'
import { IArmor, IPotion, iUtility, IWeapon } from '@/interfaces/IItem'
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
    weapon: IWeapon | null
    description: string
    inventory: Array<IWeapon | IArmor | IPotion | iUtility>
    bodyParts: iBodyParts
    isAlive: boolean
}

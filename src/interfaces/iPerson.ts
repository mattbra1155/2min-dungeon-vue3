import { iBodyParts } from '@/interfaces/iBodyParts'
import { iWeapon } from '@/interfaces/iItem'

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
    inventory: Array<iWeapon>
    bodyParts: iBodyParts
    isAlive: Boolean
}

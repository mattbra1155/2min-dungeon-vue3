import { BodyParts } from '@/interfaces/BodyParts'
import { Weapon } from '@/interfaces/Item'

export interface Person {
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
    weapon: Weapon | null
    description: string
    inventory: Array<Weapon>
    bodyParts: BodyParts
    isAlive: Boolean
}

import { iBodyPart } from '@/interfaces/BodyParts'
import { IWeapon } from '@/interfaces/IItem'
import { Inventory } from '@/assets/models/inventoryModel'
import { Modifiers } from '@/assets/models/modifiersModel'

export interface IPerson {
    id: string
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
    inventory: Inventory
    bodyParts: iBodyPart
    isAlive: boolean
    modifiers: Modifiers
}

import { iBodyPart } from '@/interfaces/BodyParts'
import { IWeapon } from '@/interfaces/IItem'
import { Inventory } from '@/assets/models/inventoryModel'
import { IModifier } from './IModifier'
import { ModifierList } from '@/assets/models/modifierListModel'

export interface IPerson {
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
    modifiers: ModifierList
}

import { BodyParts } from '@/interfaces/BodyParts'
import { Weapon } from '@/interfaces/Item'

export interface Person {
    name: string
    race: string
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
    weapon: Weapon
    description: string
    inventory: Array<Weapon>
    bodyParts: BodyParts
    isAlive: Boolean
}

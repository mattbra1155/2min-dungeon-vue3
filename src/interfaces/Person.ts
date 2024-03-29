import { iBodyPart } from '@/interfaces/BodyParts'
import { IWeapon } from '@/interfaces/IItem'
import { Inventory } from '@/assets/models/inventoryModel'
import { Modifiers } from '@/assets/models/modifiersModel'
import { IStats } from '@/interfaces/IStats'
import { PlayerModel } from '@/assets/models/playerModel'
import { MonsterModel } from '@/assets/models/monsterModel'

export interface IPerson {
    id: string
    name: string
    race: string
    stats: IStats
    currentStats: IStats
    weapon: IWeapon | null
    description: string
    inventory: Inventory
    bodyParts: iBodyPart
    isAlive: boolean
    modifiers: Modifiers
    clearCurrentStats(): void
    attack(enemy: PlayerModel | MonsterModel): number | undefined
}

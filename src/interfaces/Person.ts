import { iBodyPart } from '@/interfaces/BodyParts'
import { IWeapon } from '@/interfaces/IItem'
import { Inventory } from '@/assets/models/inventoryModel'
import { Modifiers } from '@/assets/models/modifiersModel'
import { IStats } from '@/interfaces/IStats'
import { Status } from '@/assets/models/statusModel'
import { Weapon } from '@/assets/models/itemsModel'

export interface IPerson {
    id: string
    name: string
    race: string
    stats: IStats
    currentStats: IStats
    weapon: Weapon | null
    description: string
    inventory: Inventory
    bodyParts: iBodyPart
    isAlive: boolean
    modifiers: Modifiers
    status: Status
    // clearCurrentStats(): void
    attack(enemyId: string): number | undefined
}

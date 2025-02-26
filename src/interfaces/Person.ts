import { iBodyPart } from '@/interfaces/BodyParts'
import { IWeapon } from '@/interfaces/IItem'
import { ISkill } from '@/interfaces/ISkill'
import { IStats } from '@/interfaces/IStats'
import { Inventory } from '@/assets/models/inventoryModel'
import { Modifiers } from '@/assets/models/modifiersModel'
import { MonsterModel } from '@/assets/models/monsterModel'
import { Status } from '@/assets/models/statusModel'
import { IPlayer } from './IPlayer'
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
    skills: ISkill[]
    status: Status
    image: string | null
    clearCurrentStats(): void
    attack(enemy: IPlayer | MonsterModel): number | undefined
}

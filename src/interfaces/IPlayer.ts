import { Profession } from '@/assets/models/professionModel'
import { IStats } from '@/interfaces/IStats'
import { MonsterModel } from '@/assets/models/monsterModel'
import { Weapon } from '@/assets/models/itemsModel'
import { Inventory } from '@/assets/models/inventoryModel'
import { Modifiers } from '@/assets/models/modifiersModel'
import { Status } from '@/assets/models/statusModel'
import { iBodyPart } from './BodyParts'
import { IWeapon } from './IItem'
import { ISkill } from './ISkill'
import { IPerson } from './IPerson'

export interface IPlayer extends IPerson {
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
    isPlayer: boolean
    profession: Profession | undefined
    advancedStats: Partial<IStats>
    offHand: Weapon | null
    attack(enemy: IPlayer | MonsterModel): number | undefined
}

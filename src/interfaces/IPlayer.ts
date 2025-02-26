import { Profession } from '@/assets/models/professionModel'
import { IPerson } from '@/interfaces/Person'
import { IStats } from '@/interfaces/IStats'
import { MonsterModel } from '@/assets/models/monsterModel'
import { Weapon } from '@/assets/models/itemsModel'

export interface IPlayer extends IPerson {
    player: boolean
    profession: Profession | undefined
    advancedStats: Partial<IStats>
    offHand: Weapon | null
    attack(enemy: IPlayer | MonsterModel): number | undefined
}

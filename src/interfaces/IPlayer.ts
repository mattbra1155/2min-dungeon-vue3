import { Profession } from '@/assets/models/professionModel'
import { IPerson } from '@/interfaces/Person'
import { IStats } from '@/interfaces/IStats'
import { MonsterModel } from '@/assets/models/monsterModel'
import { PlayerModel } from '@/assets/models/playerModel'

export interface IPlayer extends IPerson {
    player: boolean
    profession: Profession | undefined
    advancedStats: Partial<IStats>
    attack(enemy: PlayerModel | MonsterModel): number | undefined
}

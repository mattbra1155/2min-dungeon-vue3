import { Profession } from '@/assets/models/professionModel'
import { IPerson } from '@/interfaces/Person'
import { IStats } from '@/interfaces/IStats'

export interface IPlayer extends IPerson {
    player: boolean
    profession: Profession | undefined
    advancedStats: Partial<IStats>[]
}

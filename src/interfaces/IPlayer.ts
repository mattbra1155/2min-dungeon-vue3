import { IPerson } from '@/interfaces/Person'
import { IStats } from './IStats'

export interface IPlayer extends IPerson {
    player: boolean
    profession: string
}

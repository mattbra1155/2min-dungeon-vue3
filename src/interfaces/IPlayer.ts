import { IPerson } from '@/interfaces/Person'

export interface IPlayer extends IPerson {
    player: boolean
    profession: string
}

import { IPerson } from '@/interfaces/Person'

export interface IPlayer extends IPerson {
    id: number
    player: boolean
    profession: string
}

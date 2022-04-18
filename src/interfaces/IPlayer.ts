import { iPerson } from '@/interfaces/Person'

export interface IPlayer extends iPerson {
    player: boolean
    profession: string
}

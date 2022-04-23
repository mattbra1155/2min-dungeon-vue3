import { iPerson } from '@/interfaces/Person'

export interface IPlayer extends iPerson {
    id: number
    player: boolean
    profession: string
}

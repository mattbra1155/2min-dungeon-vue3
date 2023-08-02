import { Profession } from '@/assets/models/professionModel'
import { IPerson } from '@/interfaces/Person'

export interface IPlayer extends IPerson {
    player: boolean
    profession: Profession
}

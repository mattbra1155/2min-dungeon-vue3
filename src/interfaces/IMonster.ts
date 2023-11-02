import { IPerson } from '@/interfaces/Person'

export interface IMonster extends IPerson {
    prefferedPosition: string
    level: number
    isHostile: boolean
}

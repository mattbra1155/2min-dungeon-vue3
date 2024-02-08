import { IPerson } from '@/interfaces/Person'

export interface IMonster extends IPerson {
    originId: string
    prefferedPosition: string
    level: number
    isHostile: boolean
}

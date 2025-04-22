import { IPerson } from '@/interfaces/IPerson'

export interface IMonster extends IPerson {
    originId: string
    prefferedPosition: string
    level: number
    isHostile: boolean
}

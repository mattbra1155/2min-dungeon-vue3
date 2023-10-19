import { IPerson } from '@/interfaces/Person'

export interface IMonster extends IPerson {
    prefferedPosition: string
    level: number
    isEnemy: boolean
}

import { IMonster } from '@/interfaces/IMonster'

export interface iScene {
    id: number
    name: string
    enemy: IMonster[]
}

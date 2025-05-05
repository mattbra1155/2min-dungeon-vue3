import { MonsterModel } from '@/assets/models/monsterModel'

export interface iScene {
    id: number
    name: string
    enemy: MonsterModel[]
}

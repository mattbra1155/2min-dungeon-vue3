import { iMonster } from '@/interfaces/Monster'

export interface iScene {
    id: number
    name: string
    enemy: iMonster[]
}

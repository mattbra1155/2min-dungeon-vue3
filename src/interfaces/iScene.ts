import { iMonster } from './iMonster'
import { iPlayer } from './iPlayer'

export interface iScene {
    id: number
    name: string
    player: iPlayer
    enemy: iMonster
}

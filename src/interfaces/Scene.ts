import { iMonster } from './Monster'
import { iPlayer } from './Player'

export interface iScene {
    id: number
    name: string
    player: iPlayer
    enemy: iMonster
}

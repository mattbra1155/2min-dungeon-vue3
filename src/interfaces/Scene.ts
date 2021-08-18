import { Monster } from './Monster'
import { Player } from './Player'

export interface Scene {
    id: number
    name: string
    player: Player
    enemy: Monster
}

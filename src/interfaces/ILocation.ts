import { Room } from '@/assets/models/RoomModel'
import { MonsterModel } from '@/assets/models/monsterModel'
import { PlayerModel } from '@/assets/models/playerModel'

export interface ILocation {
    id: string
    x: number
    y: number
    name: string
    entityList: Array<PlayerModel | MonsterModel>
    currentRoom: Room | undefined
    description: string
    links: number[]
}

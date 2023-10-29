import { Room } from '@/assets/models/RoomModel'
import { MonsterModel } from '@/assets/models/monsterModel'
import { PlayerModel } from '@/assets/models/playerModel'

export interface IScene {
    id: number
    name: string
    entityList: Array<PlayerModel | MonsterModel>
    currentRoom: Room | undefined
    roomList: Room[]
    description: string
    links: number[]
}

import { Room } from '@/assets/models/RoomModel'
import { MonsterModel } from '@/assets/models/monsterModel'
import { IPlayer } from '@/interfaces/IPlayer'

export interface ILocation {
    id: string
    x: number
    y: number
    name: string
    entityList: Array<IPlayer | MonsterModel>
    currentRoom: Room | undefined
    description: string
    links: number[]
}

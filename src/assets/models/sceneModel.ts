import { MonsterModel } from '@/assets/models/monsterModel'
import { iScene } from '@/interfaces/Scene'
import { Room } from './RoomModel'

class Scene implements iScene {
    constructor(
        public id: number = 0,
        public name: string = '',
        public enemy: MonsterModel[] = [],
        public roomList: Room[] = []
    ) {
        this.id = id
        this.name = name
        this.enemy = enemy
        this.roomList = roomList
    }
}

export { Scene }

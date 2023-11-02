import { MonsterModel } from '@/assets/models/monsterModel'
import { PlayerModel } from '@/assets/models/playerModel'

interface IRoom {
    id: number
    name: string
    description: string
    monsterList: Array<PlayerModel | MonsterModel>
    lootList: string[]
    exits: number[]
}

class Room implements IRoom {
    constructor(
        public id: number = 0,
        public name: string = `Room - ${id}`,
        public description: string = '',
        public monsterList: Array<PlayerModel | MonsterModel> = [],
        public lootList: string[] = [],
        public exits: number[] = []
    ) {
        this.id
        this.name = name
        this.description = description
        this.exits = exits
        this.monsterList = monsterList
        this.lootList = lootList
    }
}

export { Room }

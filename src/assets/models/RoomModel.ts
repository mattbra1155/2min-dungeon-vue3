import { MonsterModel } from '@/assets/models/monsterModel'
import { PlayerModel } from '@/assets/models/playerModel'
import { ERoomTypes } from '@/enums/ERoomTypes'

interface IRoom {
    id: number
    name: string
    description: string
    monsterList: Array<PlayerModel | MonsterModel>
    lootList: string[]
    exits: number[]
    type: ERoomTypes
    isExplored: boolean
}

export interface IRoomExit extends IRoom {
    sceneLinks?: number[]
}

class Room implements IRoom {
    constructor(
        public id: number = 0,
        public name: string = `Room - ${id}`,
        public description: string = '',
        public monsterList: Array<PlayerModel | MonsterModel> = [],
        public lootList: string[] = [],
        public exits: number[] = [],
        public isExplored: boolean = false,
        public type: ERoomTypes = ERoomTypes.Empty
    ) {
        this.id
        this.name = name
        this.description = description
        this.exits = exits
        this.monsterList = monsterList
        this.lootList = lootList
        this.type = type
        this.isExplored = isExplored
    }
    unaliveMonsters = () => {
        this.monsterList.map((monster) => (monster.isAlive = false))
    }
}

class RoomExit extends Room implements IRoomExit {
    constructor(
        public id: number = 0,
        public name: string = `Room - ${id}`,
        public description: string = '',
        public monsterList: Array<PlayerModel | MonsterModel> = [],
        public lootList: string[] = [],
        public exits: number[] = [],
        public type: ERoomTypes = ERoomTypes.Empty,
        public isExplored: boolean = false,
        public sceneLinks: [] | undefined = []
    ) {
        super(id, name, description, monsterList, lootList, exits, isExplored, type)
        this.sceneLinks = sceneLinks
    }
}

export { Room, RoomExit }

import { MonsterModel } from '@/assets/models/monsterModel'
import { PlayerModel } from '@/assets/models/playerModel'
import { ERoomTypes } from '@/enums/ERoomTypes'
import { IRoomObject } from '@/interfaces/IRoomObject'

interface IRoom {
    id: string
    name: string
    description: string
    monsterList: Array<PlayerModel | MonsterModel>
    roomObjects: IRoomObject[]
    lootList: string[]
    exits: number[]
    type: ERoomTypes
    isExplored: boolean
    isSearched: boolean
}

export interface IRoomExit extends IRoom {
    sceneLinks?: string[]
}

class Room implements IRoom {
    constructor(
        public id: string = '0',
        public name: string = `Room - ${id}`,
        public description: string = '',
        public monsterList: Array<PlayerModel | MonsterModel> = [],
        public roomObjects: IRoomObject[] = [],
        public lootList: string[] = [],
        public exits: number[] = [],
        public isExplored: boolean = false,
        public isSearched: boolean = false,
        public type: ERoomTypes = ERoomTypes.Empty
    ) {
        this.id
        this.name = name
        this.description = description
        this.exits = exits
        this.monsterList = monsterList
        this.roomObjects = roomObjects
        this.lootList = lootList
        this.type = type
        this.isExplored = isExplored
        this.isSearched = isSearched
    }
    unaliveMonsters = () => {
        this.monsterList.map((monster) => (monster.isAlive = false))
    }
}

class RoomExit extends Room implements IRoomExit {
    constructor(
        public id: string = '0',
        public name: string = `Room - ${id}`,
        public description: string = '',
        public monsterList: Array<PlayerModel | MonsterModel> = [],
        public roomObjects: IRoomObject[] = [],
        public lootList: string[] = [],
        public exits: number[] = [],
        public type: ERoomTypes = ERoomTypes.Empty,
        public isExplored: boolean = false,
        public isSearched: boolean = false,
        public sceneLinks: string[] | undefined = []
    ) {
        super(id, name, description, monsterList, roomObjects, lootList, exits, isExplored, isSearched, type)
        this.sceneLinks = sceneLinks
    }
}

export { Room, RoomExit }

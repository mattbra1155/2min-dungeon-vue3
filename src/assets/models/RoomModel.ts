import { MonsterModel } from '@/assets/models/monsterModel'
import { PlayerModel } from '@/assets/models/playerModel'
import { ERoomTypes } from '@/enums/ERoomTypes'
import { IRoomObject } from '@/interfaces/IRoomObject'
import { diceRollK100 } from '../scripts/diceRoll'
import { usePlayer } from '@/composables/usePlayer'

interface IRoom {
    id: string
    name: string
    description: string
    monsterList: Array<PlayerModel | MonsterModel>
    roomObjects: IRoomObject[]
    lootList: string[]
    exits: Array<string | number>
    type: ERoomTypes
    isExplored: boolean
    isSearched: boolean
    searchRoom(player: PlayerModel): boolean
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
        public exits: Array<string | number> = [],
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
    searchRoom() {
        const initiativeRoll = diceRollK100()
        const { player } = usePlayer()

        if (initiativeRoll <= player.value.currentStats.initiative) {
            return true
        }

        this.isSearched = true
        return false
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
        public exits: Array<string | number> = [],
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

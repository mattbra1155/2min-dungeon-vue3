import { MonsterModel } from '@/assets/models/monsterModel'
import { PlayerModel } from '@/assets/models/playerModel'
import { ERoomTypes } from '@/enums/ERoomTypes'
import { IRoomObject } from '@/interfaces/IRoomObject'
import { diceRollK100 } from '../scripts/diceRoll'
import { AllItemTypes } from '@/interfaces/IItem'

interface IRoom {
    id: string
    name: string
    description: string
    monsterList: Array<PlayerModel | MonsterModel>
    roomObjects: IRoomObject[]
    hiddenRoomObjects: Array<IRoomObject | AllItemTypes>
    lootList: string[]
    exits: number[]
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
        public hiddenRoomObjects: Array<IRoomObject | AllItemTypes> = [],
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
        this.hiddenRoomObjects = hiddenRoomObjects
        this.lootList = lootList
        this.type = type
        this.isExplored = isExplored
        this.isSearched = isSearched
    }
    unaliveMonsters = () => {
        this.monsterList.map((monster) => (monster.isAlive = false))
    }
    searchRoom(player: PlayerModel) {
        const initiativeRoll = diceRollK100()

        if (initiativeRoll <= player.currentStats.initiative) {
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
        public hiddenRoomObjects: Array<IRoomObject | AllItemTypes> = [],
        public lootList: string[] = [],
        public exits: number[] = [],
        public type: ERoomTypes = ERoomTypes.Empty,
        public isExplored: boolean = false,
        public isSearched: boolean = false,
        public sceneLinks: string[] | undefined = []
    ) {
        super(
            id,
            name,
            description,
            monsterList,
            roomObjects,
            hiddenRoomObjects,
            lootList,
            exits,
            isExplored,
            isSearched,
            type
        )
        this.sceneLinks = sceneLinks
    }
}

export { Room, RoomExit }

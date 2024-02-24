import { MonsterModel } from '@/assets/models/monsterModel'
import { PlayerModel } from '@/assets/models/playerModel'
import { ERoomTypes } from '@/enums/ERoomTypes'
import { IRoomObject } from '@/interfaces/IRoomObject'
import { diceRollK100 } from '../scripts/diceRoll'
import { usePlayer } from '@/composables/usePlayer'

export interface IRoomExit {
    sceneId: string
    roomId: string
}

interface IRoom {
    id: string
    image: string
    name: string
    description: string
    monsterList: Array<PlayerModel | MonsterModel>
    roomObjects: IRoomObject[]
    lootList: string[]
    exits: Array<number | IRoomExit>
    type: ERoomTypes
    isExplored: boolean
    isSearched: boolean
    searchRoom(player: PlayerModel): boolean
}

export function isRoomExit(object: IRoomExit): object is IRoomExit {
    return object.sceneId ? true : false
}

class Room implements IRoom {
    constructor(
        public id: string = '0',
        public name: string = `Room - ${id}`,
        public image: string = '',
        public description: string = '',
        public monsterList: Array<MonsterModel> = [],
        public roomObjects: IRoomObject[] = [],
        public lootList: string[] = [],
        public exits: Array<number | IRoomExit> = [],
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

export { Room }

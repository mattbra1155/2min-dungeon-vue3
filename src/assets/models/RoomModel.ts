import { MonsterModel } from '@/assets/models/monsterModel'
import { PlayerModel } from '@/assets/models/playerModel'
import { ERoomTypes } from '@/enums/ERoomTypes'
import { diceRollK100 } from '../scripts/diceRoll'
import { usePlayer } from '@/composables/usePlayer'
import { IContainer } from '@/interfaces/IContainer'
export interface IRoomExit {
    sceneId: string
    roomId: string
}

interface IRoom {
    id: string
    x: number
    y: number
    image: string
    name: string
    description: string
    monsterList: Array<PlayerModel | MonsterModel>
    roomObjects: IContainer[]
    lootList: string[]
    exits: Array<number | IRoomExit>
    type: ERoomTypes
    isExplored: boolean
    isSearched: boolean
    isDark: boolean
    searchRoom(player: PlayerModel): boolean
    connectedLocation: { id: string; entryId: string } | undefined
}

export function isRoomExit(object: IRoomExit): object is IRoomExit {
    return object.sceneId ? true : false
}

class Room implements IRoom {
    constructor(
        public id: string = '0',
        public x: number = 0,
        public y: number = 0,
        public name: string = `Room - ${id}`,
        public image: string = '',
        public description: string = '',
        public monsterList: Array<MonsterModel> = [],
        public roomObjects: IContainer[] = [],
        public lootList: string[] = [],
        public exits: Array<number | IRoomExit> = [],
        public isExplored: boolean = false,
        public isSearched: boolean = false,
        public isDark: boolean = false,
        public type: ERoomTypes = ERoomTypes.Empty,
        public connectedLocation: { id: string; entryId: string } | undefined = undefined
    ) {
        this.id
        this.x = x
        this.y = y
        this.name = name
        this.description = description
        this.exits = exits
        this.monsterList = monsterList
        this.roomObjects = roomObjects
        this.lootList = lootList
        this.type = type
        this.isExplored = isExplored
        this.isSearched = isSearched
        this.isDark = isDark
        this.connectedLocation = connectedLocation
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

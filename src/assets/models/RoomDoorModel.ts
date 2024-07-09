import { ERoomTypes } from '@/enums/ERoomTypes'
import { IContainer } from '@/interfaces/IContainer'
import { IRoomExit, Room } from './RoomModel'
import { MonsterModel } from './monsterModel'

export class RoomDoor extends Room {
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
        super(
            id,
            x,
            y,
            name,
            image,
            description,
            monsterList,
            roomObjects,
            lootList,
            exits,
            isExplored,
            isSearched,
            isDark,
            type,
            connectedLocation
        )
    }
}

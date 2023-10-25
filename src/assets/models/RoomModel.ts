import { AllItemTypes } from '@/interfaces/IItem'
import { MonsterModel } from './monsterModel'
import { Gold } from './itemsModel'
import { EDirections } from '@/enums/EDirections'

interface IRoom {
    id: number
    name: string
    description: string
    monsterList: MonsterModel[]
    lootList: Array<AllItemTypes | Gold>
    exits: number[]
}

class Room implements IRoom {
    constructor(
        public id: number = 0,
        public name: string = `Room - ${id}`,
        public description: string = '',
        public monsterList: MonsterModel[] = [],
        public lootList: Array<AllItemTypes | Gold> = [],
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

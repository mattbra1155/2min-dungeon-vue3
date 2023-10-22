import { AllItemTypes } from '@/interfaces/IItem'
import { MonsterModel } from './monsterModel'
import { Gold } from './itemsModel'
import { EDirections } from '@/enums/EDirections'

interface IRoom {
    id: string
    name: string
    monsterList: MonsterModel[]
    lootList: Array<AllItemTypes | Gold>
    exits: EDirections[]
}

class Room implements IRoom {
    constructor(
        public id: string = self.crypto.randomUUID(),
        public name = `Room - ${id}`,
        public monsterList: MonsterModel[] = [],
        public lootList: Array<AllItemTypes | Gold> = [],
        public exits: EDirections[] = []
    ) {
        this.id
        this.name = name
        this.exits = exits
    }
}

export { Room }

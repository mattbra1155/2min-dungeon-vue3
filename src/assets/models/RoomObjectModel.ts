import { AllItemTypes } from '@/interfaces/IItem'
import { IRoomObject } from '@/interfaces/IRoomObject'

class RoomObject implements IRoomObject {
    constructor(
        public id: string = '',
        public name: string = '',
        public description: string = '',
        public items: AllItemTypes[] = []
    ) {
        this.id = id
        this.name = name
        this.description = description
        this.items = items
    }
}

export { RoomObject }

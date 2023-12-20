import { AllItemTypes } from '@/interfaces/IItem'
import { IRoomObject } from '@/interfaces/IRoomObject'

class RoomObject implements IRoomObject {
    constructor(
        public id: string = '',
        public image: string = '',
        public imageSearched: string = '',
        public name: string = '',
        public description: string = '',
        public items: AllItemTypes[] = [],
        public isSearched: boolean = false
    ) {
        this.id = id
        this.name = name
        this.description = description
        this.items = items
    }

    setIsSearch(state: boolean) {
        this.isSearched = state
    }
}

export { RoomObject }

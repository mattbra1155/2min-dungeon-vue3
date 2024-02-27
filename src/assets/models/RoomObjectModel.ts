import { AllItemTypes } from '@/interfaces/IItem'
import { IRoomObject } from '@/interfaces/IRoomObject'
import { PlayerModel } from './playerModel'

class RoomObject implements IRoomObject {
    constructor(
        public id: string = crypto.randomUUID(),
        public type: string = '',
        public image: string = '',
        public imageSearched: string = '',
        public name: string = '',
        public description: string = '',
        public items: AllItemTypes[] = [],
        public isSearched: boolean = false,
        public isLocked: boolean = false
    ) {
        this.type = type
        this.name = name
        this.description = description
        this.items = items
    }
    setIsSearch(state: boolean) {
        this.isSearched = state
    }
    unlock(person: PlayerModel) {
        if (person.skills.find((skill) => skill.id === 'lockpicking')) {
            this.isLocked = false
            return true
        }
        return false
    }
}

export { RoomObject }

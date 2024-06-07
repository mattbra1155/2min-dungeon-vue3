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
        public description: string = ''
    ) {
        this.type = type
        this.name = name
        this.description = description
    }
}

interface Container {
    id: string
    name: string
    items: AllItemTypes[]
    isSearched: boolean
    isLocked: boolean
    setIsSearch(state: boolean): void
    unlock(person: PlayerModel): boolean
}

class Container extends RoomObject implements Container {
    constructor(
        public type: string = 'container',
        public image: string,
        public imageSearched: string,
        public name: string,
        public description: string,
        public items: AllItemTypes[] = [],
        public isSearched: boolean = false,
        public isLocked: boolean = false
    ) {
        super(type, image, imageSearched, name, description)
        this.id = `${type}-${crypto.randomUUID()}`
        this.items = items
        this.type = type
        this.isSearched = isSearched
        this.isLocked = isLocked
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

export { RoomObject, Container }

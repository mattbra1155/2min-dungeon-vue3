import { PlayerModel } from '@/assets/models/playerModel'
import { AllItemTypes } from './IItem'

export interface IRoomObject {
    id: string
    type: string
    image: string
    imageSearched: string
    name: string
    description: string
    items: AllItemTypes[]
    isSearched: boolean
    isLocked: boolean
    setIsSearch(state: boolean): void
    unlock(person: PlayerModel): boolean
}

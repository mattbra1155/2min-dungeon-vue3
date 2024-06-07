import { PlayerModel } from '@/assets/models/playerModel'
import { AllItemTypes } from '@/interfaces/IItem'
import { IRoomObject } from './IRoomObject'

export interface IContainer extends IRoomObject {
    id: string
    name: string
    items: AllItemTypes[]
    isSearched: boolean
    isLocked: boolean
    setIsSearch(state: boolean): void
    unlock(person: PlayerModel): boolean
}

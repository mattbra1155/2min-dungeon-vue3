import { AllItemTypes } from '@/interfaces/IItem'
import { IRoomObject } from '@/interfaces/IRoomObject'
import { IPlayer } from '@/interfaces/IPlayer'

export interface IContainer extends IRoomObject {
    id: string
    name: string
    items: AllItemTypes[]
    isSearched: boolean
    isLocked: boolean
    isHidden: boolean
    setIsSearch(state: boolean): void
    unlock(person: IPlayer): boolean
}

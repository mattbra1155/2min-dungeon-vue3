import { AllItemTypes } from './IItem'

export interface IRoomObject {
    id: string
    image: string
    imageSearched: string
    name: string
    description: string
    items: AllItemTypes[]
    isSearched: boolean
    setIsSearch(state: boolean): void
}

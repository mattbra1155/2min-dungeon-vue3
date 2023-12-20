import { AllItemTypes } from './IItem'

export interface IRoomObject {
    id: string
    name: string
    description: string
    items: AllItemTypes[]
}

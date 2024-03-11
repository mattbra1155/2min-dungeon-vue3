import { AllItemTypes } from '@/interfaces/IItem'

export interface IInventoryState {
    activeItemId: string | null
    isOpen: boolean
    notifications: string[]
}
export interface IInventory {
    inventory: Array<AllItemTypes>
    gold: number
    encumbrance: {
        max: number
        current: number
    }
}

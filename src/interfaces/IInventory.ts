import { AllItemTypes } from '@/interfaces/IItem'

export interface IInventoryState {
    activeItemId: string | null
    isOpen: boolean
}
export interface IInventory {
    inventory: Array<AllItemTypes>
    gold: number
}

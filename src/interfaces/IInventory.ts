import { IArmor, IPotion, IWeapon } from '@/interfaces/IItem'

export interface IInventoryState {
    activeItemId: string | null
    isOpen: boolean
}
export interface IInventory {
    inventory: Array<IWeapon | IArmor | IPotion>
}

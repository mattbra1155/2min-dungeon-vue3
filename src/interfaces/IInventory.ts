import { IArmor, IPotion, IWeapon } from '@/interfaces/IItem'

export interface IInventory {
    inventory: Array<IWeapon | IArmor | IPotion>
}

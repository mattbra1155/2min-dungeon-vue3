import { IArmor, IPotion, IWeapon } from '@/interfaces/IItem'
import { IPlayer } from '@/interfaces/IPlayer'
import { IMonster } from '@/interfaces/IMonster'

export interface IInventoryState {
    isOpen: boolean
}
export interface IInventory {
    inventory: Array<IWeapon | IArmor | IPotion>
    owner: IPlayer | IMonster
}

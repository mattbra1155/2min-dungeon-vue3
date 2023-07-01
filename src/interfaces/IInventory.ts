import { IArmor, IPotion, IWeapon } from '@/interfaces/IItem'
import { IPlayer } from '@/interfaces/IPlayer'
import { IMonster } from '@/interfaces/IMonster'
export interface IInventory {
    inventory: Array<IWeapon | IArmor | IPotion>
    owner: IPlayer | IMonster
}

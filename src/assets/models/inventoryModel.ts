import { IInventory } from '@/interfaces/IInventory'
import { IArmor, IPotion, IWeapon } from '@/interfaces/IItem'

class Inventory implements IInventory {
    constructor(public inventory: Array<IWeapon | IArmor | IPotion> = []) {
        this.inventory = inventory
    }

    addToInventory(item: IArmor | IWeapon | IPotion): void {
        if (!item) {
            return
        }
        this.inventory.push(item)
    }
}

export { Inventory }

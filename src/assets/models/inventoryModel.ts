import { IInventory } from '@/interfaces/IInventory'
import { IArmor, IPotion, IWeapon } from '@/interfaces/IItem'

class Inventory implements IInventory {
    constructor(public inventory: Array<IWeapon | IArmor | IPotion> = []) {
        this.inventory = inventory
    }

    addItem(item: IArmor | IWeapon | IPotion): void {
        if (!item) {
            return
        }
        this.inventory.push(item)
    }
    removeItem(itemId: number): void {
        if (!itemId) {
            return
        }
        const indexToRemove = this.inventory.findIndex((element) => element.id === itemId)
        this.inventory.splice(indexToRemove, 1)
    }
    getItem(itemId: number) {
        if (!itemId) {
            return
        }
        return this.inventory.find((element) => element.id === itemId)
    }
}

export { Inventory }

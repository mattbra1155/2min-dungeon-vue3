import { IInventory } from '@/interfaces/IInventory'
import { Armor, Potion, Weapon } from '@/assets/models/itemsModel'

class Inventory implements IInventory {
    constructor(public inventory: Array<Weapon | Armor | Potion> = []) {
        this.inventory = inventory
    }

    addItem(item: Weapon | Armor | Potion): void {
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

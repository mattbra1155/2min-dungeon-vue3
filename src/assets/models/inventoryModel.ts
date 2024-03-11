import { IInventory } from '@/interfaces/IInventory'
import { AllItemTypes } from '@/interfaces/IItem'
import { Gold } from '@/assets/models/itemsModel'

class Inventory implements IInventory {
    constructor(
        public inventory: Array<AllItemTypes> = [],
        public gold = 0,
        public encumbrance: { max: number; current: number } = { max: 0, current: 0 }
    ) {
        this.inventory = inventory
        this.gold = gold
        this.encumbrance = {
            max: 0,
            current: 0,
        }
    }

    _calculateEncubrance(): number {
        return (this.encumbrance.current = this.inventory.reduce((acc, curr) => {
            console.log(curr.isEquipped)

            return acc + (curr.isEquipped ? 0 : curr.encumbrance)
        }, 0))
    }
    addItem(item: AllItemTypes | Gold, ownerId: string | undefined): boolean {
        if (item instanceof Gold) {
            this.gold += item.amount
            console.log(`${item.amount} gold added`)
            return true
        }
        // check if encumbrance is equal or above max
        if (this.encumbrance.current + item.encumbrance > this.encumbrance.max) {
            return false
        }

        this.inventory.push(item)
        this._calculateEncubrance()
        item.ownerId = ownerId
        return true
    }
    removeItem(itemId: string): void {
        if (!itemId) {
            return
        }
        const indexToRemove = this.inventory.findIndex((element) => element.id === itemId)
        this.inventory.splice(indexToRemove, 1)
        this._calculateEncubrance()
    }
    getItem(itemId: string) {
        if (!itemId) {
            return
        }
        return this.inventory.find((element) => element.id === itemId)
    }
}

export { Inventory }

import { IInventory } from '@/interfaces/IInventory'
import { IArmor, IPotion, IWeapon } from '@/interfaces/IItem'
import { IMonster } from '@/interfaces/IMonster'
import { IPlayer } from '@/interfaces/IPlayer'
import { Armor, Weapon } from './itemsModel'
import { EItemCategory } from '@/enums/ItemCategory'
import itemMods from '@/assets/json/itemMods.json'

class Inventory implements IInventory {
    constructor(public inventory: Array<IWeapon | IArmor | IPotion> = [], public owner: IPlayer | IMonster) {
        this.inventory = inventory
        this.owner = owner
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
    wieldItem(itemId: number) {
        if (!itemId) {
            return
        }
        const weapon = this.getItem(itemId)
        if (weapon instanceof Weapon) {
            this.owner.weapon = weapon
        } else {
            console.error(`${weapon?.name} not a weapon!!`)
        }
    }
    equipItem(itemId: number) {
        if (!itemId) {
            return
        }
        const armor = this.getItem(itemId)
        /// TO DO REST
    }
}

export { Inventory }

import { IInventory } from '@/interfaces/IInventory'
import { IArmor, IPotion, IWeapon } from '@/interfaces/IItem'
import { IMonster } from '@/interfaces/IMonster'
import { IPlayer } from '@/interfaces/IPlayer'
import { Armor, Weapon } from '@/assets/models/itemsModel'

class Inventory implements IInventory {
    constructor(public list: Array<IWeapon | IArmor | IPotion> = [], public owner: IPlayer | IMonster) {
        this.list = list
        this.owner = owner
    }

    addItem(item: IArmor | IWeapon | IPotion): void {
        if (!item) {
            return
        }
        this.list.push(item)
    }
    removeItem(itemId: number): void {
        if (!itemId) {
            return
        }
        const indexToRemove = this.list.findIndex((element) => element.id === itemId)
        this.list.splice(indexToRemove, 1)
    }
    getItem(itemId: number) {
        if (!itemId) {
            return
        }
        return this.list.find((element) => element.id === itemId)
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
        const armorItem = this.getItem(itemId)
        /// TO DO REST
        if (armorItem instanceof Armor) {
            const equipSpace = Object.keys(this.owner.bodyParts).find((bodyPart) => bodyPart === armorItem.bodyPart)
            console.log(equipSpace)
        }
    }
}

export { Inventory }

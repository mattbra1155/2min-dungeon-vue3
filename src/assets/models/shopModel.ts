import { AllItemTypes } from '@/interfaces/IItem'
import { ItemGenerator } from '../generators/itemGenerator'
import { diceRollK3 } from '../scripts/diceRoll'
import { EItemCategory } from '@/enums/ItemCategory'
import { Armor, Item, Potion, Weapon } from './itemsModel'
import { usePlayer } from '@/composables/usePlayer'

const { player } = usePlayer()
interface IShop {
    id: string
    name: string
    description: string
    inventory: AllItemTypes[]
}

class Shop implements IShop {
    constructor(
        public id: string,
        public name: string,
        public description: string,
        public inventory: AllItemTypes[] = [],
        public gold: number = 0
    ) {
        this.id = id
        this.name = name
        this.description = description
        this.inventory = inventory
        this.gold = gold
    }

    sellItem(itemId: string) {
        const foundItem = this.inventory.find((inventoryItem) => inventoryItem.id === itemId)
        if (!foundItem) {
            console.error('SHOP: no item found')
            return
        }
        this.inventory.findIndex((inventoryItem) => inventoryItem.id === foundItem.id)
        this.gold = this.gold + foundItem.price
    }

    buyItem(item: AllItemTypes) {
        player.value.inventory.removeItem(item.id)
        this.gold = this.gold - item.price
    }
}

class Merchant extends Shop {
    constructor(
        public id: string = 'merchant',
        public name: string = 'merchant',
        public description: string = 'lorem ipsum',
        public inventory: AllItemTypes[] = []
    ) {
        super(id, name, description, inventory)
    }

    fillInventory(numberOfItems: number) {
        let count = 0

        const itemGenerator = new ItemGenerator()
        while (count < numberOfItems) {
            count++
            const itemCategory = diceRollK3()
            let item: AllItemTypes | undefined = undefined
            if (itemCategory === 1) {
                item = itemGenerator.createItem(EItemCategory.Weapon) as Weapon
            } else if (itemCategory === 2) {
                item = itemGenerator.createItem(EItemCategory.Armor) as Armor
            } else {
                item = itemGenerator.createItem(EItemCategory.Potion) as Potion
            }

            this.inventory.push(item)
        }
    }
}

export { Merchant }

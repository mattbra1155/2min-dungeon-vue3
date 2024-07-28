import { AllItemTypes } from '@/interfaces/IItem'
import { ItemGenerator } from '../generators/itemGenerator'
import { diceRollK2, diceRollK3, diceRollK4 } from '../scripts/diceRoll'
import { EItemCategory } from '@/enums/ItemCategory'
import { Armor, Food, Potion, Weapon } from './itemsModel'
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
        public gold: number = 1000
    ) {
        this.id = id
        this.name = name
        this.description = description
        this.inventory = inventory
        this.gold = gold
    }

    sellItem(itemId: string, multiplier = 1) {
        const foundItem = this.inventory.find((inventoryItem) => inventoryItem.id === itemId)
        if (!foundItem) {
            console.error('SHOP: no item found')
            return
        }
        const itemIndex = this.inventory.findIndex((inventoryItem) => inventoryItem.id === foundItem.id)

        this.inventory.splice(itemIndex, 1)

        player.value.inventory.gold = player.value.inventory.gold - foundItem.price / multiplier
        this.gold = this.gold + foundItem.price

        player.value.inventory.addItem(foundItem, player.value.id)
    }

    buyItem(item: AllItemTypes, multiplier = 1) {
        player.value.inventory.removeItem(item.id)
        this.gold = this.gold - item.price
        player.value.inventory.gold = player.value.inventory.gold + item.price / multiplier
        this.inventory.push(item)
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

class Blacksmith extends Shop {
    constructor(
        public id: string = 'blacksmith',
        public name: string = 'blacksmith',
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
            const itemCategory = diceRollK2()
            let item: AllItemTypes | undefined = undefined
            if (itemCategory === 1) {
                item = itemGenerator.createItem(EItemCategory.Weapon) as Weapon
            } else {
                item = itemGenerator.createItem(EItemCategory.Armor) as Armor
            }
            this.inventory.push(item)
        }
    }
}

class Tavern extends Shop {
    constructor(
        public id: string = 'tavern',
        public name: string = 'Under Three Drops tavern',
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
            let item: AllItemTypes | undefined = undefined
            item = itemGenerator.createItem(EItemCategory.Food) as Food

            this.inventory.push(item)
        }
    }
}

export { Merchant, Blacksmith, Tavern }

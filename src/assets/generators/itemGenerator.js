import { Weapon, Armor, Potion, Utility } from '@/assets/models/itemsModel'
import itemMods from '@/assets/json/itemMods'
import store from '@/store/index'
class ItemGenerator {
    constructor() {}

    createItemBase(category) {
        let itemObject
        switch (category) {
            case 'weapon':
                itemObject = new Weapon()
                break
            case 'armor':
                itemObject = new Armor()
                break
            case 'potion':
                itemObject = new Potion()
                break
            case 'utility':
                itemObject = new Utility()
                break
        }
        const itemCategory = itemMods[category]

        const randomItem =
            itemCategory.item[
                Math.floor(Math.random() * itemCategory.item.length)
            ]

        const randomType = () => {
            if (Array.isArray(randomItem.type)) {
                return randomItem.type[
                    Math.floor(Math.random() * randomItem.type.length)
                ]
            } else {
                return randomItem.type
            }
        }
        const itemType = {
            type: randomType()
        }
        const finalItem = Object.assign(itemObject, randomItem, itemType, {
            category
        })

        return finalItem
    }

    createPrefix(baseItem) {
        const itemCategory = itemMods[baseItem.category]
        const prefix =
            itemCategory.prefix[
                Math.floor(Math.random() * itemCategory.prefix.length)
            ]
        return { prefix }
    }

    createDescription(baseItem, prefix) {
        let description
        if (prefix.name === 'used') {
            description = `This is a ${baseItem.name}. Nothing out of the ordinary`
        } else {
            description = `This is a ${baseItem.name}. It's' ${prefix.name}`
        }
        return { description }
    }

    addId() {
        store.dispatch('itemGenerator/increment_id')
        const id = store.getters['itemGenerator/itemId']
        return { id }
    }

    createItem(category) {
        const itemBase = this.createItemBase(category)
        const prefix = this.createPrefix(itemBase)
        const description = this.createDescription(itemBase, prefix)
        const id = this.addId()
        const item = Object.assign(itemBase, prefix, description, id)
        return item
    }
}

export { ItemGenerator }

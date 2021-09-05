import { Weapon, Armor, Potion } from '@/assets/models/itemsModel'
import itemMods from '@/assets/json/itemMods.json'
import { iWeapon, iArmor, iPotion, iPrefix } from '@/interfaces/Item'
import useItemGenerator from '@/composables/useItemGenerator'
class ItemGenerator {
    createItemBase(category: string) {
        let itemObject
        let itemCat: string = category
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
            type: randomType(),
        }
        const finalItem = Object.assign(itemObject, randomItem, itemType, {
            category,
        })

        return finalItem
    }

    createPrefix(baseItem: iWeapon | iArmor | iPotion): iPrefix {
        // @ts-ignore
        const itemCategory = itemMods[baseItem.category]
        const prefix =
            itemCategory.prefix[
                Math.floor(Math.random() * itemCategory.prefix.length)
            ]
        return prefix
    }

    createDescription(
        baseItem: iWeapon | iArmor | iPotion,
        prefix: iPrefix
    ): string {
        let description: string
        if (prefix.name === 'used') {
            description = `This is a ${baseItem.name}. Nothing out of the ordinary`
        } else {
            description = `This is a ${baseItem.name}. It's' ${prefix.name}`
        }
        return description
    }

    addId(category: string): number {
        const { incrementItemId } = useItemGenerator()

        incrementItemId(category)

        return 123
    }

    createItem(category: string) {
        const itemBase = this.createItemBase(category)
        const prefix = this.createPrefix(itemBase)
        const description = this.createDescription(itemBase, prefix)
        const id = this.addId(category)
        const item = Object.assign(itemBase, prefix, description, id)
        return item
    }
}

export { ItemGenerator }

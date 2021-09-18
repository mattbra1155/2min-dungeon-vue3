import { Weapon, Armor, Potion } from '@/assets/models/itemsModel'
import itemMods from '@/assets/json/itemMods.json'
import { iWeapon, iArmor, iPotion, iItemPrefix } from '@/interfaces/Item'
import useItemGenerator from '@/composables/useItemGenerator'
import { EItemCategory } from '@/enums/ItemCategory'

class ItemGenerator {
    createItemBase(category: EItemCategory) {
        let itemObject
        switch (category) {
            case EItemCategory.Weapon:
                itemObject = new Weapon()
                break
            case EItemCategory.Armor:
                itemObject = new Armor()
                break
            case EItemCategory.Potion:
                itemObject = new Potion()
                break
        }

        interface iRandomItem {
            name: string
            damage?: number
            type?: string | string[]
        }
        const itemCategory = itemMods[category]
        const randomItem: iRandomItem = itemCategory.item[Math.floor(Math.random() * itemCategory.item.length)]
        const itemType = (item: iRandomItem) => {
            if (Array.isArray(item.type)) {
                return item.type[Math.floor(Math.random() * item.type.length)]
            } else {
                return item.type
            }
        }

        const finalItem: iWeapon | iArmor | iPotion = Object.assign(itemObject, randomItem, {
            type: itemType(randomItem),
        })

        console.log(finalItem)

        return finalItem
    }

    createPrefix(category: EItemCategory, baseItem: iWeapon | iArmor | iPotion) {
        const itemCategory = itemMods[category]
        const prefix = itemCategory.prefix[Math.floor(Math.random() * itemCategory.prefix.length)]
        return prefix
    }

    createDescription(baseItem: iWeapon | iArmor | iPotion, prefix: iItemPrefix) {
        if (prefix.name === 'used') {
            return `This is a ${baseItem.name}. Nothing out of the ordinary`
        } else {
            return `This is a ${baseItem.name}. It's ${prefix.name}`
        }
    }

    addId(category: string) {
        const { incrementItemId } = useItemGenerator()
        incrementItemId(category)

        return 123
    }

    createItem(category: EItemCategory) {
        const itemBase = this.createItemBase(category)
        const prefix = this.createPrefix(category, itemBase)
        const description = this.createDescription(itemBase, prefix)
        const id = this.addId(category)
        const item: iWeapon | iArmor | iPotion = Object.assign(itemBase, {
            name: `${prefix.name} ${itemBase.name}`,
            prefix: prefix,
            id: id,
            description: description,
            damage: prefix.modifier + itemBase.modifier,
        })
        return item
    }
}

export { ItemGenerator }

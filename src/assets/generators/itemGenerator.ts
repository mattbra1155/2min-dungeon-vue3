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

        const itemCategory = itemMods[category]
        const randomItem = itemCategory.item[Math.floor(Math.random() * itemCategory.item.length)]
        const randomType = () => {
            if (Array.isArray(itemCategory.type)) {
                return itemCategory.type[Math.floor(Math.random() * itemCategory.type.length)]
            } else {
                return itemCategory.type
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

    createPrefix(category: EItemCategory, baseItem: iWeapon | iArmor | iPotion) {
        const itemCategory = itemMods[category]
        const prefix = itemCategory.prefix[Math.floor(Math.random() * itemCategory.prefix.length)]
        console.log(prefix)
        return prefix
    }

    createDescription(baseItem: iWeapon | iArmor | iPotion, prefix: iItemPrefix): string {
        let description
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

    createItem(category: EItemCategory) {
        const itemBase = this.createItemBase(category)
        const prefix = this.createPrefix(category, itemBase)
        const description = this.createDescription(itemBase, prefix)
        const id = this.addId(category)
        const item: iWeapon | iArmor | iPotion = Object.assign(itemBase, { prefix }, { id }, { description })

        return item
    }
}

export { ItemGenerator }

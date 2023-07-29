import { Weapon, Armor, Potion } from '@/assets/models/itemsModel'
import itemMods from '@/assets/json/itemMods.json'
import { IItemPrefix } from '@/interfaces/IItem'
import { useItemGenerator } from '@/composables/useItemGenerator'
import { EItemCategory } from '@/enums/ItemCategory'
import { ModifierItem } from '../models/modifierItemModel'
import { EModifierTypes } from '@/enums/EModifierTypes'
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

        const itemType = (item: any) => {
            if (Array.isArray(item.type)) {
                return item.type[Math.floor(Math.random() * item.type.length)]
            } else {
                return item.type
            }
        }
        const finalItem: Weapon | Armor | Potion = Object.assign(itemObject, randomItem, {
            category: itemCategory,
            type: itemType(randomItem),
        })
        return finalItem
    }

    createPrefix(category: EItemCategory) {
        const itemCategory = itemMods[category]
        const prefix = itemCategory.prefix[Math.floor(Math.random() * itemCategory.prefix.length)]
        return prefix
    }

    createDescription(baseItem: Weapon | Armor | Potion, prefix: IItemPrefix) {
        if (prefix.name === 'used') {
            return `This is a ${baseItem.name}. Nothing out of the ordinary`
        } else {
            return `This is a ${baseItem.name}. It's ${prefix.name}`
        }
    }

    addId(category: EItemCategory) {
        const id = self.crypto.randomUUID()
        return `${category}-${id}`
    }

    createModifiers(category: EItemCategory) {
        const id = `modifier-${self.crypto.randomUUID()}`
        const modifier = new ModifierItem(
            id,
            this.createPrefix(category).name,
            EModifierTypes.Passive,
            { inteligence: 100 },
            undefined,
            undefined,
            true,
            {
                isActive: false,
                current: 0,
                max: 2,
            }
        )
        return modifier
    }

    createItem(category: EItemCategory) {
        const itemBase = this.createItemBase(category)
        const prefix = this.createPrefix(category)
        const description = this.createDescription(itemBase, prefix)
        const id = this.addId(category)
        const modifier = this.createModifiers(category)
        let item = itemBase
        switch (category) {
            case EItemCategory.Weapon:
                item = Object.assign(itemBase, {
                    name: `${prefix.name} ${itemBase.name}`,
                    prefix,
                    id,
                    description,
                    category,
                    modifiers: [modifier],
                    damage: prefix.modifier + itemBase.modifier,
                })
                break
            case EItemCategory.Armor:
                item = Object.assign(itemBase, {
                    name: `${prefix.name} ${itemBase.name}`,
                    prefix,
                    id,
                    description,
                    category,
                    modifiers: [modifier],
                    armorPoints: prefix.modifier + itemBase.modifier,
                })
                break
            case EItemCategory.Potion:
                item = Object.assign(itemBase, {
                    name: `${prefix.name} ${itemBase.name}`,
                    prefix,
                    id,
                    description,
                    category,
                    modifiers: [modifier],
                    baseValue: prefix.modifier + itemBase.modifier,
                })
                break
        }

        return item
    }
}

export { ItemGenerator }

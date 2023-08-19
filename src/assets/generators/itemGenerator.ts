import { Weapon, Armor, Potion } from '@/assets/models/itemsModel'
import itemMods from '@/assets/json/itemMods.json'
import { IItemPrefix } from '@/interfaces/IItem'
import { EItemCategory } from '@/enums/ItemCategory'
import { ModifierItem } from '../models/modifierItemModel'
import { EModifierTypes } from '@/enums/EModifierTypes'
class ItemGenerator {
    category: EItemCategory | null
    constructor() {
        this.category = null
    }
    createItemBase() {
        if (!this.category) {
            throw Error('no category')
        }
        let itemObject
        switch (this.category) {
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
        const itemCategory = itemMods[this.category]
        const randomItem = itemCategory.item[Math.floor(Math.random() * itemCategory.item.length)]

        const finalItem: Weapon | Armor | Potion = Object.assign(itemObject, randomItem, {
            category: itemCategory,
        })
        console.log(finalItem)

        return finalItem
    }

    createPrefix() {
        if (!this.category) {
            throw Error('no category')
        }
        const itemCategory = itemMods[this.category]
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

    addId() {
        if (!this.category) {
            throw Error('no category')
        }
        const id = self.crypto.randomUUID()
        return `${this.category}-${id}`
    }

    createModifiers() {
        if (!this.category) {
            throw Error('no category')
        }
        const id = `modifier-${self.crypto.randomUUID()}`
        const modifier = new ModifierItem(
            id,
            'test modifier',
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
        this.category = category

        console.log(category)
        if (!this.category) {
            throw Error('no category')
        }

        const itemBase = this.createItemBase()
        const prefix = this.createPrefix()
        const description = this.createDescription(itemBase, prefix)
        const id = this.addId()
        const modifier = this.createModifiers()
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

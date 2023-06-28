import { Weapon, Armor, Potion } from '@/assets/models/itemsModel'
import itemMods from '@/assets/json/itemMods.json'
import { IWeapon, IArmor, IPotion, IItemPrefix } from '@/interfaces/IItem'
import { useItemGenerator } from '@/composables/useItemGenerator'
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
        console.log('here:', itemMods[category])
        const itemCategory = itemMods[category]
        const randomItem = itemCategory.item[Math.floor(Math.random() * itemCategory.item.length)]

        const itemType = (item: any) => {
            if (Array.isArray(item.type)) {
                return item.type[Math.floor(Math.random() * item.type.length)]
            } else {
                return item.type
            }
        }
        const finalItem: IWeapon | IArmor | IPotion = Object.assign(itemObject, randomItem, {
            category: itemCategory,
            type: itemType(randomItem),
        })
        console.log('final', finalItem)
        return finalItem
    }

    createPrefix(category: EItemCategory) {
        const itemCategory = itemMods[category]
        const prefix = itemCategory.prefix[Math.floor(Math.random() * itemCategory.prefix.length)]
        return prefix
    }

    createDescription(baseItem: IWeapon | IArmor | IPotion, prefix: IItemPrefix) {
        if (prefix.name === 'used') {
            return `This is a ${baseItem.name}. Nothing out of the ordinary`
        } else {
            return `This is a ${baseItem.name}. It's ${prefix.name}`
        }
    }

    addId(category: EItemCategory) {
        const { incrementItemId } = useItemGenerator()
        const id = incrementItemId(category)

        return id
    }
    createItem(category: EItemCategory) {
        const itemBase = this.createItemBase(category)
        const prefix = this.createPrefix(category)
        const description = this.createDescription(itemBase, prefix)
        const id = this.addId(category)
        let item = itemBase
        switch (category) {
            case EItemCategory.Weapon:
                item = Object.assign(itemBase, {
                    name: `${prefix.name} ${itemBase.name}`,
                    prefix,
                    id,
                    description,
                    category,
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
                    baseValue: prefix.modifier + itemBase.modifier,
                })
                break
        }

        return item
    }
}

export { ItemGenerator }

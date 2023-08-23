import { Weapon, Armor, Potion, Item, Gold } from '@/assets/models/itemsModel'
import itemMods from '@/assets/json/itemMods.json'
import { AllItemTypes, IGold } from '@/interfaces/IItem'
import { EItemCategory } from '@/enums/ItemCategory'
import { ModifierItem } from '../models/modifierItemModel'
import { EModifierTypes } from '@/enums/EModifierTypes'
import { IModifierItem } from '@/interfaces/IModifiers'
class ItemGenerator {
    private category: EItemCategory | null
    private quality: IModifierItem | null
    constructor() {
        this.category = null
        this.quality = null
    }
    private createItemBase(): AllItemTypes {
        if (!this.category) {
            throw Error('no category')
        }
        let itemObject

        if (this.category !== EItemCategory.Gold) {
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
        } else {
            return new Gold()
        }
    }

    private createDescription(baseItem: AllItemTypes) {
        if (!this.quality) {
            return `This is a ${baseItem.type}. Nothing out of the ordinary`
        } else {
            return `This is a ${baseItem.type}. It's ${this.quality.name}`
        }
    }

    private addId() {
        if (!this.category) {
            throw Error('no category')
        }
        const id = self.crypto.randomUUID()
        return `${this.category}-${id}`
    }

    private createModifiers() {
        if (!this.category) {
            throw Error('no category')
        }
        const id = `modifier-${self.crypto.randomUUID()}`
        const modifierList: IModifierItem[] = []

        // TO DO MODIFIERS AGAIN

        return modifierList
    }

    createItem(category: EItemCategory, tier = 1, amount = 0) {
        this.category = category

        if (!this.category) {
            throw Error('no category')
        }

        const itemBase = this.createItemBase()

        if (this.category === EItemCategory.Gold) {
            const gold: IGold = {
                description: 'gold',
                ownerId: undefined,
                name: EItemCategory.Gold,
                type: EItemCategory.Gold,
                amount,
            }

            return { ...itemBase, ...gold }
        }

        const description = this.createDescription(itemBase)
        const id = this.addId()
        const modifiers = this.createModifiers()
        let item = itemBase

        switch (category) {
            case EItemCategory.Weapon:
                item = Object.assign(itemBase as Weapon, {
                    name: `${itemBase.type}`,
                    id,
                    description,
                    category,
                    modifiers: [modifiers],
                    // damage: TO DO!
                    // Damage comes now from itemMods json?,
                })
                break
            case EItemCategory.Armor:
                item = Object.assign(itemBase, {
                    name: ` ${itemBase.name}`,
                    id,
                    description,
                    category,
                    modifiers: [modifiers],
                    // armorPoints:  TO DO!
                })
                break
            case EItemCategory.Potion:
                item = Object.assign(itemBase, {
                    name: ` ${itemBase.name}`,
                    id,
                    description,
                    category,
                    modifiers: [modifiers],
                    // baseValue: TO DO!
                })
                break
        }

        this.category = null
        this.quality = null

        return item
    }
}

export { ItemGenerator }

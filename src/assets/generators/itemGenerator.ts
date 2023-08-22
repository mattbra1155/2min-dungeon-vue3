import { Weapon, Armor, Potion } from '@/assets/models/itemsModel'
import itemMods from '@/assets/json/itemMods.json'
import { IItemQuality } from '@/interfaces/IItem'
import { EItemCategory } from '@/enums/ItemCategory'
import { ModifierItem } from '../models/modifierItemModel'
import { EModifierTypes } from '@/enums/EModifierTypes'
import { EQuality } from '@/enums/EQuality'
import { IModifierItem } from '@/interfaces/IModifiers'
class ItemGenerator {
    private category: EItemCategory | null
    private quality: IItemQuality | null
    constructor() {
        this.category = null
        this.quality = null
    }
    private createItemBase() {
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

    private createDescription(baseItem: Weapon | Armor | Potion) {
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

        if (this.category === EItemCategory.Weapon) {
            this.quality?.modifier.forEach((mod) => {
                if (!this.quality) {
                    return
                }
                console.log(mod)

                const modifier = new ModifierItem(
                    id,
                    this.quality.name,
                    EModifierTypes.Passive,
                    {
                        inteligence: {
                            name: 'ttt',
                            symbol: 'i',
                            value: 111,
                        },
                    },
                    undefined,
                    undefined,
                    true,
                    {
                        isActive: false,
                        current: 0,
                        max: 2,
                    }
                )
                modifierList.push(modifier)
            })
        }
        return modifierList
    }

    createItem(category: EItemCategory, tier = 1) {
        this.category = category

        console.log(category)
        if (!this.category) {
            throw Error('no category')
        }

        const itemBase = this.createItemBase()
        const description = this.createDescription(itemBase)
        const id = this.addId()
        const modifiers = this.createModifiers()
        let item = itemBase

        switch (category) {
            case EItemCategory.Weapon:
                itemBase as Weapon
                item = Object.assign(itemBase, {
                    name: `${itemBase.type}`,
                    id,
                    description,
                    category,
                    modifiers: [modifiers],
                    // damage: TO DO!,
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

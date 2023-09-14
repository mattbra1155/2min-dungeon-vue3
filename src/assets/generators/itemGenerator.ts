import { Weapon, Armor, Potion, Item, Gold } from '@/assets/models/itemsModel'
import itemMods from '@/assets/json/itemMods.json'
import { AllItemTypes, IArmor, IGold, IWeapon } from '@/interfaces/IItem'
import { EItemCategory } from '@/enums/ItemCategory'
import { IModifierItem } from '@/interfaces/IModifiers'
class ItemGenerator {
    private category: EItemCategory | null
    private quality: IModifierItem | null
    constructor() {
        this.category = null
        this.quality = null
    }
    private createItemBase(category: EItemCategory.Weapon): Weapon
    private createItemBase(category: EItemCategory.Armor): Armor
    private createItemBase(category: EItemCategory.Potion): Potion
    private createItemBase(category: EItemCategory.Gold): Gold
    private createItemBase(category: any): any {
        if (!this.category) {
            throw Error('no category')
        }

        if (this.category === EItemCategory.Gold) {
            return new Gold()
        }

        let itemObject: AllItemTypes = new Weapon()

        if (this.category === EItemCategory.Weapon) {
            itemObject = new Weapon()
        } else if (this.category === EItemCategory.Armor) {
            itemObject = new Armor()
        } else if (this.category === EItemCategory.Potion) {
            itemObject = new Potion()
        }

        const itemCategory = itemMods[this.category]
        const randomItem = itemCategory.item[Math.floor(Math.random() * itemCategory.item.length)]

        if (this.category === EItemCategory.Armor) {
            const armorType =
                itemMods[this.category].material[
                    Math.floor(Math.floor(Math.random() * itemMods[this.category].material.length))
                ]

            const iii: Partial<IArmor> = {
                material: armorType.name,
                armorPoints: (itemObject as Armor).armorPoints + armorType.armorPoints,
            }

            itemObject = Object.assign(itemObject, iii)
        }
        const finalItem: AllItemTypes = Object.assign(itemObject, randomItem, {
            category: itemCategory,
        })
        console.log(finalItem)
        return finalItem
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

    createGold(amount = 0): Gold {
        this.category = EItemCategory.Gold
        const goldBase = this.createItemBase(EItemCategory.Gold)
        console.log(goldBase)
        const gold: IGold = {
            id: 'gold',
            description: 'Gold coins with the face of our King',
            category: EItemCategory.Gold,
            ownerId: undefined,
            name: EItemCategory.Gold,
            amount,
        }
        console.log(gold)

        const result = Object.assign(goldBase, gold)
        console.log(result)

        return result
    }

    createItem(category: EItemCategory, tier = 1): AllItemTypes {
        this.category = category

        if (!this.category) {
            throw Error('no category')
        }

        const itemBase = this.createItemBase(EItemCategory.Weapon)

        const description = this.createDescription(itemBase)
        const id = this.addId()
        const modifiers = this.createModifiers()
        let item = itemBase

        switch (category) {
            case EItemCategory.Weapon:
                item = Object.assign(itemBase as Weapon, {
                    name: `${itemBase.type} ${itemBase.name}`,
                    id,
                    description,
                    category,
                    modifiers: modifiers,
                    // damage: TO DO!
                    // Damage comes now from itemMods json?,
                })
                break
            case EItemCategory.Armor:
                item = Object.assign(itemBase, {
                    name: ` ${itemBase.type}`,
                    id,
                    description,
                    category,
                    modifiers: modifiers,
                    // armorPoints:  TO DO!
                })
                break
            case EItemCategory.Potion:
                item = Object.assign(itemBase, {
                    name: ` ${itemBase.name}`,
                    id,
                    description,
                    category,
                    modifiers: modifiers,
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

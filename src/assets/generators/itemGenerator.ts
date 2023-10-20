import { Weapon, Armor, Potion, Gold } from '@/assets/models/itemsModel'
import itemList from '@/assets/json/items.json'
import { AllItemTypes, IArmor, IGold } from '@/interfaces/IItem'
import { EItemCategory } from '@/enums/ItemCategory'
import { ModifierItem } from '../models/modifierItemModel'
import { modifierList } from '@/assets/json/modifiers.json'
import { EModifierTypes } from '@/enums/EModifierTypes'

class ItemGenerator {
    private category: EItemCategory | null
    private quality: ModifierItem | null
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

        const itemCategory = itemList[this.category]
        const randomItem = itemCategory.item[Math.floor(Math.random() * itemCategory.item.length)]

        if (this.category === EItemCategory.Armor) {
            const armorType =
                itemList[this.category].material[
                    Math.floor(Math.floor(Math.random() * itemList[this.category].material.length))
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

    private createModifiers(baseItem: AllItemTypes) {
        if (!this.category) {
            throw Error('no category')
        }

        const createdModifierList: ModifierItem[] = []
        if (this.category === EItemCategory.Gold) {
            return
        }
        const itemCategory = itemList[this.category]
        const itemModifiersData = itemCategory?.item.find((item) => item.type === baseItem.type)?.modifiers
        itemModifiersData?.forEach((itemModifier) => {
            const modifierData = modifierList.find((mod) => {
                return mod.id === itemModifier
            })
            if (!modifierData) {
                console.error(`modifier not found`)
                return
            }

            const type = Object.values(EModifierTypes).find((cat) => cat === modifierData.type)
            if (!type) {
                console.error(`Modifier type incorrect -> ${modifierData.type}`)
                return
            }

            const modifier = new ModifierItem(
                modifierData.id,
                modifierData.name,
                type,
                undefined,
                modifierData.chanceToApply,
                modifierData.statusId
            )

            createdModifierList.push(modifier)
        })

        return createdModifierList
    }

    createGold(amount = 0): Gold {
        this.category = EItemCategory.Gold
        const goldBase = this.createItemBase(EItemCategory.Gold)
        const gold: IGold = {
            id: 'gold',
            description: 'Gold coins with the face of our King',
            category: EItemCategory.Gold,
            ownerId: undefined,
            name: EItemCategory.Gold,
            amount,
        }

        const result = Object.assign(goldBase, gold)

        return result
    }

    createItem(category: EItemCategory, tier = 1): AllItemTypes {
        this.category = category

        if (!this.category) {
            throw Error('no category')
        }

        const getItemBase = () => {
            let itemBase: AllItemTypes | undefined = undefined
            if (category === EItemCategory.Weapon) {
                itemBase = this.createItemBase(category)
            } else if (category === EItemCategory.Armor) {
                itemBase = this.createItemBase(category)
            } else  (category === EItemCategory.Potion) {
                itemBase = this.createItemBase(Potion)
            }
            if (!itemBase) {
                return
            }
            return itemBase
        }

        const itemBase = getItemBase()

        const description = this.createDescription(itemBase)
        const id = this.addId()
        const modifiers = this.createModifiers(itemBase)
        let item = itemBase

        switch (category) {
            case EItemCategory.Weapon:
                item = Object.assign(itemBase as Weapon, {
                    name: `${itemBase.type} ${itemBase.name}`,
                    id,
                    description,
                    category,
                    modifiers,
                })
                break
            case EItemCategory.Armor:
                item = Object.assign(itemBase as Armor, {
                    name: `${(itemBase as Armor).material}${itemBase.type}`,
                    id,
                    description,
                    category,
                    modifiers,
                })
                break
            case EItemCategory.Potion:
                item = Object.assign(itemBase, {
                    name: `Potion of ${itemBase.type}`,
                    id,
                    description,
                    category,
                    modifiers,
                })
                break
        }

        this.category = null
        this.quality = null

        return item
    }
}

export { ItemGenerator }

import { Weapon, Armor, Potion, Gold, Material, Utility } from '@/assets/models/itemsModel'
import itemList from '@/assets/json/items.json'
import { AllItemTypes, IGold, instanceOfArmor, identity } from '@/interfaces/IItem'
import { EItemCategory } from '@/enums/ItemCategory'
import { ModifierItem } from '../models/modifierItemModel'
import { modifierList } from '@/assets/json/modifiers.json'
import { EModifierTypes } from '@/enums/EModifierTypes'
import { key } from 'localforage'
import { diceRollK10 } from '../scripts/diceRoll'

class ItemGenerator {
    private category:
        | string
        | EItemCategory.Weapon
        | EItemCategory.Armor
        | EItemCategory.Potion
        | EItemCategory.Utility
        | EItemCategory.Material
        | null
    private quality: ModifierItem | null
    constructor() {
        this.category = null
        this.quality = null
    }

    getItemBase = (category: string): AllItemTypes => {
        let itemBase: AllItemTypes = this.createItemBase(EItemCategory.Weapon)
        if (category === EItemCategory.Weapon) {
            itemBase = this.createItemBase(category)
        } else if (category === EItemCategory.Armor) {
            itemBase = this.createItemBase(category)
        } else if (category === EItemCategory.Potion) {
            itemBase = this.createItemBase(category)
        } else if (category === EItemCategory.Utility) {
            itemBase = this.createItemBase(category)
        } else if (category === EItemCategory.Material) {
            itemBase = this.createItemBase(category)
        }

        return itemBase
    }

    getItemCategory = (category: string): EItemCategory => {
        let itemCategory: EItemCategory = EItemCategory.Weapon
        if (category === EItemCategory.Weapon) {
            itemCategory = EItemCategory.Weapon
        } else if (category === EItemCategory.Armor) {
            itemCategory = EItemCategory.Armor
        } else if (category === EItemCategory.Potion) {
            itemCategory = EItemCategory.Potion
        } else if (category === EItemCategory.Utility) {
            itemCategory = EItemCategory.Utility
        } else {
            itemCategory = EItemCategory.Material
        }

        return itemCategory
    }
    private createItemBase(category: EItemCategory.Weapon): Weapon
    private createItemBase(category: EItemCategory.Armor): Armor
    private createItemBase(category: EItemCategory.Potion): Potion
    private createItemBase(category: EItemCategory.Utility): Utility
    private createItemBase(category: EItemCategory.Material): Material
    private createItemBase(category: any): any {
        if (!this.category) {
            throw Error('no category')
        }

        let itemObject: AllItemTypes = new Weapon()

        if (this.category === EItemCategory.Weapon) {
            itemObject = new Weapon()
        } else if (this.category === EItemCategory.Armor) {
            itemObject = new Armor()
        } else if (this.category === EItemCategory.Potion) {
            itemObject = new Potion()
        } else if (this.category === EItemCategory.Utility) {
            itemObject = new Utility()
        } else {
            itemObject = new Material()
        }

        const itemCategory = itemList[this.getItemCategory(this.category)]
        const randomItem = itemCategory.item[Math.floor(Math.random() * itemCategory.item.length)]

        const finalItem: AllItemTypes = Object.assign(itemObject, randomItem, {
            category: this.category,
        })

        return finalItem
    }

    private createDescription(baseItem: AllItemTypes) {
        if (!this.quality) {
            return `This is a ${baseItem.name ? baseItem.name : baseItem.type}. Nothing out of the ordinary`
        } else {
            return `This is a ${baseItem.type}. It's ${this.quality.name}`
        }
    }

    private addId() {
        if (!this.category) {
            throw Error('no category')
        }
        const id = window.crypto.randomUUID()

        return `${this.category}-${id}`
    }

    private createModifiers(baseItem: AllItemTypes) {
        if (!this.category) {
            throw Error('no category')
        }

        const createdModifierList: ModifierItem[] = []
        const itemCategory = itemList[this.getItemCategory(this.category)]
        const itemModifiersData = itemCategory?.item.find((item) => item.type === baseItem.type)?.modifiers
        itemModifiersData?.forEach((itemModifier: string) => {
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

        console.log(createdModifierList)

        return createdModifierList
    }

    createGold(amount = 0): Gold {
        const goldBase = new Gold()
        const gold: IGold = {
            id: 'gold',
            description: 'Gold coins with the face of our King',
            category: 'gold',
            ownerId: undefined,
            name: 'gold',
            price: amount,
            amount,
        }

        const result = Object.assign(goldBase, gold)

        return result
    }

    createItem(category: string, tier = 1): AllItemTypes {
        this.category = category

        if (!this.category) {
            throw Error('no category')
        }

        const itemBase = this.getItemBase(this.category)

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
                    name: `${(itemBase as Armor).material} ${itemBase.type}`,
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
            case EItemCategory.Utility:
                item = Object.assign(itemBase, {
                    name: `${itemBase.name}`,
                    id,
                    description,
                    category,
                    modifiers,
                })
                break
            case EItemCategory.Material:
                item = Object.assign(itemBase, {
                    name: `${itemBase.name}`,
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

    createItemById(type: string, amount = 1) {
        let category
        let item: AllItemTypes
        const getItemData = () => {
            let found
            for (const categoryFromList of Object.entries(itemList)) {
                found = categoryFromList[1].item.find((item) => item.type == type)
                category = categoryFromList[0]
                this.category = category
                if (found) break
            }
            return found
        }
        const itemData = getItemData()

        if (!category || !itemData) {
            return
        }

        if (category === EItemCategory.Weapon) {
            const weapon = new Weapon()
            item = Object.assign(
                weapon,
                {
                    name: `${itemData.type}`,
                    id: `${type}-${crypto.randomUUID()}`,
                    category,
                },
                itemData
            )
            const modifiers = this.createModifiers(item)
            item.modifiers = modifiers
            console.log(item)

            return item
        }
        if (category === EItemCategory.Armor) {
            const armor = new Armor()
            item = Object.assign(
                armor,
                {
                    name: `${instanceOfArmor(itemData) ? itemData.material : ''} ${itemData.type}`,
                    id: `${type}-${crypto.randomUUID()}`,
                    category,
                    type: itemData.type,
                    modifiers: itemData.modifiers,
                },
                itemData
            )

            return item
        }
        if (category === EItemCategory.Potion) {
            const potion = new Potion()
            item = Object.assign(potion, {
                name: `Potion of ${itemData.type}`,
                id: `${type}-${crypto.randomUUID()}`,
                category,
                type: itemData.type,
                modifiers: itemData.modifiers,
            })
            return item
        }
        if (category === EItemCategory.Utility) {
            const utility = new Utility()
            item = Object.assign(utility, {
                name: `${itemData.type}`,
                id: `${type}-${crypto.randomUUID()}`,
                category,
                type: itemData.type,
                modifiers: itemData.modifiers,
            })
            return item
        }
        if (category === EItemCategory.Material) {
            const material = new Material()
            item = Object.assign(material, {
                name: `${itemData.type}`,
                id: `${type}-${window.crypto.randomUUID()}`,
                category,
                type: itemData.type,
                modifiers: itemData.modifiers,
            })
            return item
        }

        if (category === EItemCategory.Valuables) {
            return this.createGold(diceRollK10())
        }
    }
}

export { ItemGenerator }

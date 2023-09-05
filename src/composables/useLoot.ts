import { ItemGenerator } from '@/assets/generators/itemGenerator'
import { Armor, Gold, Potion, Weapon } from '@/assets/models/itemsModel'
import { diceRollK100, diceRollK4 } from '@/assets/scripts/diceRoll'
import { EItemCategory } from '@/enums/ItemCategory'
import { AllItemTypes, lootItem } from '@/interfaces/IItem'
import { reactive, toRefs } from 'vue'

interface ILootState {
    baseLootChance: number
    baseChanceForHigherTierLoot: number
    baseChanceForWeapon: number
    baseChanceForArmor: number
    baseChanceForPotion: number
    baseChanceForGold: number
    isHigherTierLoot: boolean
    baseChanceFor2TierLoot: number
    lootList: lootItem[]
}

const state: ILootState = reactive({
    baseChanceForWeapon: 20,
    baseChanceForArmor: 40,
    baseChanceForPotion: 60,
    baseChanceForGold: 80,
    baseChanceForHigherTierLoot: 5,
    baseLootChance: 50,
    baseChanceFor2TierLoot: 40,
    isHigherTierLoot: false,
    lootList: [],
})

export const useLoot = () => {
    const generateLoot = () => {
        const lootAmount = diceRollK4()
        for (let x = 1; x <= lootAmount; x++) {
            const generatedItem = generateLootItem(1)
            if (generatedItem) {
                const loot: lootItem = generatedItem
            }

            if (loot) {
                state.lootList.push(loot)
            } else {
                throw Error('no loot generated')
            }
        }
    }
    const generateLootItem = (enemyLootTier: number) => {
        const roll = diceRollK100()
        const itemGenerator = new ItemGenerator()
        // TO DO Tier loot

        if (roll > state.baseLootChance) {
            console.log(`${roll} is larger than baseLootChance`)
            return
        }
        const rollForItemType = diceRollK100()

        if (state.baseLootChance <= state.baseChanceForHigherTierLoot) {
            console.log('roll higher chance loot to implement')
            state.isHigherTierLoot = true
        }

        if (rollForItemType <= state.baseChanceForWeapon) {
            console.log('roll Weapon')
            return itemGenerator.createItem(EItemCategory.Weapon)
        } else if (rollForItemType > state.baseChanceForWeapon && rollForItemType <= state.baseChanceForArmor) {
            console.log('roll Armor')
            return itemGenerator.createItem(EItemCategory.Armor)
        } else if (rollForItemType > state.baseChanceForArmor && rollForItemType <= state.baseChanceForPotion) {
            console.log('roll Potion')
            return itemGenerator.createItem(EItemCategory.Potion)
            // } else if (rollForItemType > state.baseChanceForPotion && rollForItemType <= state.baseChanceForGold) {
            //     console.log('roll Gold')
            //     return itemGenerator.createItem(EItemCategory.Gold)
            // }
        } else {
            console.log('roll Gold')
            return itemGenerator.createItem(EItemCategory.Gold)
        }
    }
    return {
        ...toRefs(state),
        generateLoot,
        generateLootItem,
    }
}

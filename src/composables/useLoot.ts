import { lootLists } from '@/assets/data/lootList'
import { ItemGenerator } from '@/assets/generators/itemGenerator'
import { Armor, Gold, Potion, Weapon } from '@/assets/models/itemsModel'
import { diceRollK100, diceRollK4 } from '@/helpers/diceRoll'
import { EItemCategory } from '@/enums/ItemCategory'
import { AllItemTypes } from '@/interfaces/IItem'
import { reactive, toRefs } from 'vue'
import { useWieghtedList } from '@/composables/useWieghtedList'
interface ILootState {
    baseLootChance: number
    baseChanceForHigherTierLoot: number
    baseChanceForWeapon: number
    baseChanceForArmor: number
    baseChanceForPotion: number
    baseChanceForGold: number
    isHigherTierLoot: boolean
    baseChanceFor2TierLoot: number
    lootList: Array<AllItemTypes | Gold>
    isLootSearched: boolean
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
    isLootSearched: false,
})

export const useLoot = () => {
    const weightedRandom = (options: { item: string; probability: number }[]) => {
        const { getWeightedItem } = useWieghtedList()
        const weightedItem = getWeightedItem(options)
        return weightedItem
    }
    const generateItem = (itemId: string) => {
        const itemGenerator = new ItemGenerator()
        const item = itemGenerator.createItemById(itemId)
        if (!item) {
            throw Error('Could not generate item')
        }
        state.lootList.push(item)

        return item
    }
    // const generateLoot = () => {
    //     state.isLootSearched = true
    //     const roll = diceRollK100()
    //     if (roll > state.baseLootChance) {
    //         console.log(`${roll}/${state.baseLootChance} = no loot generated`)
    //         return
    //     }

    //     const lootAmount = diceRollK4()
    //     console.log(lootAmount)

    //     for (let x = 1; x <= lootAmount; x++) {
    //         const generatedItem = generateLootItem(1)
    //         state.lootList.push(generatedItem)
    //     }
    //     console.log(state.isLootSearched)
    // }
    // const generateLootItem = (enemyLootTier: number) => {
    //     const itemGenerator = new ItemGenerator()
    //     // TO DO Tier loot

    //     const rollForItemType = diceRollK100()

    //     if (state.baseLootChance <= state.baseChanceForHigherTierLoot) {
    //         console.log('roll higher chance loot to implement')
    //         state.isHigherTierLoot = true
    //     }
    //     console.log(rollForItemType)
    //     if (rollForItemType <= state.baseChanceForWeapon) {
    //         console.log('roll Weapon')
    //         return itemGenerator.createItem(EItemCategory.Weapon)
    //     } else if (rollForItemType > state.baseChanceForWeapon && rollForItemType <= state.baseChanceForArmor) {
    //         console.log('roll Armor')
    //         return itemGenerator.createItem(EItemCategory.Armor)
    //     } else if (rollForItemType > state.baseChanceForArmor && rollForItemType <= state.baseChanceForPotion) {
    //         console.log('roll Potion')
    //         return itemGenerator.createItem(EItemCategory.Potion)
    //     } else {
    //         console.log('roll Gold')
    //         return itemGenerator.createGold(diceRollK4())
    //     }
    // }
    return {
        ...toRefs(state),
        // generateLoot,
        // generateLootItem,
        generateItem,
        weightedRandom,
    }
}

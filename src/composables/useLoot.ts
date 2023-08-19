import { MonsterModel } from '@/assets/models/monsterModel'
import { diceRollK100 } from '@/assets/scripts/diceRoll'
import { IArmor, IItem, IPotion, IWeapon } from '@/interfaces/IItem'
import { reactive, toRefs } from 'vue'

interface ILootItem {
    rarity: number
    item: IWeapon | IArmor | IPotion
}

interface ILootState {
    baseLootChance: number
    baseChanceForHigherTierLoot: number
    baseChanceForWeapon: number
    baseChanceForArmor: number
    baseChanceForPotion: number
    baseChanceForGold: number
    isHigherTierLoot: boolean
    lootTable: []
}

const state: ILootState = reactive({
    baseChanceForWeapon: 20,
    baseChanceForArmor: 40,
    baseChanceForPotion: 60,
    baseChanceForGold: 80,
    baseChanceForHigherTierLoot: 5,
    baseLootChance: 50,
    isHigherTierLoot: false,

    lootTable: [],
})

export const useLoot = () => {
    const generateLoot = (monster: MonsterModel) => {
        const roll = diceRollK100()

        if (roll <= state.baseLootChance) {
            const rollForItemType = diceRollK100()

            if (state.baseLootChance <= state.baseChanceForHigherTierLoot) {
                console.log('roll higher chance loot to implement')
                state.isHigherTierLoot = true
            }

            if (rollForItemType <= state.baseChanceForWeapon) {
                console.log('roll Weapon')
            } else if (rollForItemType > state.baseChanceForWeapon && rollForItemType <= state.baseChanceForArmor) {
                console.log('roll Armor')
            } else if (rollForItemType > state.baseChanceForArmor && rollForItemType <= state.baseChanceForPotion) {
                console.log('roll Potion')
            } else if (rollForItemType > state.baseChanceForPotion && rollForItemType <= state.baseChanceForGold) {
                console.log('roll Gold')
            }
        }
    }
    return {
        ...toRefs(state),
        generateLoot,
    }
}

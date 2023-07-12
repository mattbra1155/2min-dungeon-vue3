<script setup lang="ts">
import { ref } from 'vue'
import { usePlayer } from '@/composables/usePlayer'
import { useInventory } from '@/composables/useInventory'
import { IArmor, IPotion, IWeapon } from '@/interfaces/IItem'
import { EItemCategory } from '@/enums/ItemCategory'
import { getTotalDamage } from '@/helpers/getTotalDamage'
import { getTotalArmorPoints } from '@/helpers/getTotalArmorPoints'
import { Armor, Potion, Weapon } from '@/assets/models/itemsModel'
import InventoryItem from '@/components/InventoryItem.vue'

const { player } = usePlayer()
const { activeItemId, isOpen, toggleInventory, setactiveItemId } = useInventory()
console.log(player.value)
const getButtonType = (item: Weapon | Armor | Potion) => {
    console.log(item)
    if (item.category === EItemCategory.Weapon) {
        return 'Wield'
    } else if (item.category === EItemCategory.Armor) {
        return 'Equip'
    } else if (item.category === EItemCategory.Potion) {
        return 'Quaf'
    } else {
        return 'Use'
    }
}

const getItemValue = (item: IWeapon | IArmor | IPotion) => {
    const value = ref<string | number>()
    switch (item.category) {
        case EItemCategory.Weapon:
            if (getTotalDamage(item as Weapon) > 0) {
                value.value = `+${getTotalDamage(item as Weapon)}`
            } else if (getTotalDamage(item as Weapon) < 0) {
                value.value = getTotalDamage(item as Weapon)
            } else {
                value.value = ''
            }
            break
        case EItemCategory.Armor:
            if (getTotalArmorPoints(item as Armor) > 0) {
                value.value = `+${getTotalArmorPoints(item as Armor)}`
            } else if (getTotalArmorPoints(item as Armor) < 0) {
                value.value = getTotalArmorPoints(item as Armor)
            } else {
                value.value = ''
            }
            break
        case EItemCategory.Potion:
            // TO DO: add potion func
            console.log('potion switch case not implementd')
            break
    }
    return value.value
}

const submitAction = (item: Weapon | Armor | Potion) => {
    console.log(player.value)
    console.log(item)
    if (item instanceof Weapon) {
        item.wield(player.value)
    } else if (item instanceof Armor) {
        item.equip(player.value)
    }
}
</script>

<template>
    <div v-if="isOpen" id="inventory" class="o-inventory">
        <div class="o-inventory__header">
            <h2 class="o-inventory__title">Inventory</h2>
            <button id="inventoryCloseButton" class="a-button --secondary o-inventory__close" @click="toggleInventory">
                Close Inventory
            </button>
        </div>
        <div class="o-inventory__content">
            <InventoryItem v-if="activeItemId" :item-id="activeItemId" />
            <ul v-else id="inventoryList" class="o-inventory__list">
                <li v-for="item in player?.inventory.inventory" :key="item.id" class="o-inventory__item">
                    <p @click="setactiveItemId(item.id)">
                        {{ item.name }}
                        {{ getItemValue(item) }}
                    </p>
                    <button class="a-button --primary" @click="submitAction(item)">{{ getButtonType(item) }}</button>
                    <div class="o-inventory__details">
                        modifiers:
                        {{ getItemValue(item) }}
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

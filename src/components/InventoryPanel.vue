<script setup lang="ts">
import { usePlayer } from '@/composables/usePlayer'
import { useInventory } from '@/composables/useInventory'
import { useRouter } from 'vue-router'
import { IArmor, IPotion, IWeapon } from '@/interfaces/IItem'
import { EItemCategory } from '@/enums/ItemCategory'
import InventoryItem from './InventoryItem.vue'
const { player } = usePlayer()
const { activeItemId, isOpen, toggleInventory, setactiveItemId } = useInventory()

const getButtonType = (item: IWeapon | IArmor | IPotion) => {
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

const router = useRouter()
router.beforeEach(() => {
    toggleInventory()
})
</script>

<template>
    <div v-if="isOpen" id="inventory" class="o-inventory">
        <div class="o-inventory__header">
            <h2 class="o-inventory__title">Inventory</h2>
            <button id="inventoryCloseButton" class="o-inventory__close" @click="toggleInventory">
                Close Inventory
            </button>
        </div>
        <div class="o-inventory__content">
            <InventoryItem v-if="activeItemId" :item-id="activeItemId" />
            <ul v-else id="inventoryList" class="o-inventory__list">
                <li
                    v-for="item in player?.inventory"
                    :key="item.id"
                    class="o-inventory__item"
                    @click="setactiveItemId(item.id)"
                >
                    {{ item.name }} <button class="a-button">{{ getButtonType(item) }}</button>
                    <div class="o-inventory__details">modifiers: {{ item.modifier }}</div>
                </li>
            </ul>
        </div>
    </div>
</template>
